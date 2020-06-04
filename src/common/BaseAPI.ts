import { stringify } from 'qs';

import authService from 'src/auth/service';
import componentService from 'src/components/service';

type RequestUrl = { url: string; query?: StringKeyValue<any>; };
type StringKeyValue<T> = { [key: string]: T };

export default class BaseAPI {
  private static readonly BASE_URL = process.env.REACT_APP_API_ENDPOINT_PREFIX;

  async get<T>({ url = '', query = {} }: RequestUrl, options: any = {}, abortController?: AbortController) {
    const { headers, q } = this.getRequestParameters(query);
    try {
      const response = await fetch(
        new Request(
          `${BaseAPI.BASE_URL}${url}${q ? `?${q}` : ''}`,
          { method: 'GET', headers, ...options }
        ),
        { signal: abortController?.signal }
      );
      if (response.ok) {
      return (await response.json())?.data as T;
      } else {
        throw response;
      }
    } catch (e) {
      this.handleError(e);
      throw e;
    }
  }

  async getFile({ url = '', query = {} }: RequestUrl, options: any = {}, abortController?: AbortController) {
    const { headers, q } = this.getRequestParameters(query);
    try {
      const response = await fetch(
        new Request(
          `${BaseAPI.BASE_URL}${url}${q ? `?${q}` : ''}`,
          { method: 'GET', headers, ...options }
        ),
        { signal: abortController?.signal }
      );
      if (response.ok) {
        return await response.blob();
      } else {
        throw response;
      }
    } catch (e) {
      this.handleError(e);
      throw e;
    }
  }

  async post<S, T>({ url = '', query = {} }: RequestUrl, bodyObject: S, options: any = {}, abortController?: AbortController) {
    const { headers, q } = this.getRequestParameters(query);
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(bodyObject);
    try {
      const response = await fetch(
        new Request(
          `${BaseAPI.BASE_URL}${url}${q ? `?${q}` : ''}`,
          { method: 'POST', headers, body, ...options }
        ),
        { signal: abortController?.signal }
      );
      if (response.ok) {
        return (await response.json())?.data as T;
      } else {
        this.handleError(response);
        throw response;
      }
    } catch (e) {
      this.handleError(e);
      throw e;
    }
  }

  private getRequestParameters(query: StringKeyValue<any>, headersMap: StringKeyValue<string> = {}) {
    const q = stringify(query, { arrayFormat: 'brackets' });

    const headers = new Headers(headersMap);
    if (authService.token) {
      headers.append('Authorization', `Bearer ${authService.token}`);
    }

    return { headers, q };
  }

  private handleError(error: Response | Error) {
    if (error instanceof Error) {
      if (error.name !== 'AbortError') {
        componentService.showSnackbar('요청에 오류가 발생하였습니다.');
      }
      return;
    }

    if (error.status <= 0) {
      componentService.showSnackbar('요청이 취소되었습니다.');
      return;
    }

    switch (error.status) {
      case 400:
        componentService.showSnackbar('요청이 잘못되었습니다.');
        break;

      case 401:
      case 403:
        if (authService.isSignedIn) {
          componentService.showSnackbar('세션이 만료되었습니다. 다시 로그인하십시오.');
          authService.session = null;
        }
        break;

      case 404:
        componentService.showSnackbar('항목이 없습니다.');
        break;

      case 500:
        componentService.showSnackbar('오류가 발생하였습니다.');
        break;

      case 502:
      case 503:
      case 504:
        componentService.showSnackbar('서버가 유지보수중입니다. 잠시 후 다시 시도하십시오.');
        break;

      default:
        componentService.showSnackbar('알 수 없는 오류가 발생하였습니다.');
    }
  }
}
