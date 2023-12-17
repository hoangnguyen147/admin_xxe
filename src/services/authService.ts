import cookie from 'js-cookie';

class AuthService {
  handleAuthentication = () => {
    const accessToken = this.getAccessToken();
    if (!accessToken) return;
    cookie.set('accessToken', accessToken, { expires: 1 });
  };

  login = (payload: any) => {
    cookie.set('accessToken', payload.accessToken);
    const userStringify = JSON.stringify({ username: payload.user, role: payload.role });
    cookie.set('user', userStringify);
  };

  logOut = () => {
    cookie.remove('accessToken');
    cookie.remove('user');
  };

  getUser = () => {
    const user = cookie.get('user') || '';
    return user;
  };

  getAccessToken = () => cookie.get('accessToken');

  isAuthenticated = () => !!this.getAccessToken() && !!this.getUser();
}

const authService = new AuthService();

export default authService;
