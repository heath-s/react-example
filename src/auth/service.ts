import { action, computed, observable } from 'mobx';

import api, { Session } from './api';

class AuthService {
  @observable
  session: Session | null = null;

  @action
  async getMe() {
    const session = await api.getMe();
    this.session = session;
  }

  hasRole(role: string) {
    return !!this.session?.roles?.includes(role) || !!this.session?.roles?.includes('admin');
  }

  @computed
  get isSignedIn(): boolean {
    return !!this.session?.username;
  }

  @computed
  get isUser(): boolean {
    return this.hasRole('user');
  }

  @action
  async signin(username: string, password: string) {
    const { token } = await api.signin(username, password);
    this.token = token;
    await this.getMe();
  }

  @action
  async signout() {
    this.token = null;
    this.session = null;
  }

  @computed
  get token(): string | null {
    return sessionStorage.getItem('jwt');
  }

  set token(token: string | null) {
    if (token) {
      sessionStorage.setItem('jwt', token);
    } else {
      sessionStorage.removeItem('jwt');
    }
  }
}

export default new AuthService();
