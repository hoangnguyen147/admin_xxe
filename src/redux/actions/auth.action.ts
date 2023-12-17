import { Dispatch } from 'redux';

// types
import { IAuthActionTypes } from 'models/IAuthState';

// services
import authService from 'services/authService';

// configs
import { PATH_NAME } from 'configs';

// auth api
const api = require('apis/auth.api');

export const login = (identity: string, password: string, navigate: any) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: IAuthActionTypes.LOGIN_REQUEST });

  try {
    const res: any = await api.login({ identity, password });
    console.log(res?.user);
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { username, fullname, role, avatar } = res?.user;
    const accessToken = res?.token?.accessToken;

    authService.login({ username, fullname, role, avatar, accessToken });

    dispatch({
      type: IAuthActionTypes.LOGIN_SUCCESS,
      payload: { user: username, role },
    });
    navigate(PATH_NAME.ROOT);
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => (dispatch: Dispatch<any>) => {
  authService.logOut();
  dispatch({ type: IAuthActionTypes.LOGOUT });
};

export const setUserData = (user: string, role: string) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: IAuthActionTypes.SILENT_LOGIN,
    payload: { user, role },
  });
};
