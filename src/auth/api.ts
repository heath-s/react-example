import BaseAPI from 'src/common/BaseAPI';

type SigninRequestBody = { username: string; password: string; }
type SigninResponseBody = { token: string; }

export type Session = {
  username: string;
  nickname: string;
  roles: string[];
};

class AuthAPI extends BaseAPI {
  async getMe() {
    return this.get<Session>({ url: '/auth/me' });
  }

  async signin(username: string, password: string) {
    return this.post<SigninRequestBody, SigninResponseBody>
      ({ url: '/auth/signin' }, { username, password });
  }
}

export default new AuthAPI();
