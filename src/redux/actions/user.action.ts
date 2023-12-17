import { Dispatch } from 'redux';

// types
import { IUserActionTypes } from 'models/IUserState';

// api user
const api = require('apis/user.api');

export const fetchListUser = () => async (dispatch: Dispatch<any>) => {
  dispatch(getListUserRequest());
  try {
    const res: any = await api.getAllUser();
    const listUser = [
      {
        id: '1',
        username: 'NguyenVanA',
        fullname: 'Nguyen Van A',
        role: 'admin',
        email: 'admin@gmail.com',
        avatar: null,
        phone: '0788992301',
      },
      {
        id: '2',
        username: 'NguyenVanB',
        fullname: 'Nguyen Van B',
        role: 'master',
        email: 'admin@gmail.com',
        avatar: null,
        phone: '0788992301',
      },
      {
        id: '3',
        username: 'NguyenVanC',
        fullname: 'Nguyen Van C',
        role: 'editor',
        email: 'admin@gmail.com',
        avatar: null,
        phone: '0788992301',
      },
      {
        id: '3',
        username: 'NguyenVanD',
        fullname: 'Nguyen Van D',
        role: 'user',
        email: 'admin@gmail.com',
        avatar: null,
        phone: '0788992301',
      },
    ];
    setTimeout(() => {
      dispatch(getListUserSuccess(listUser));
    }, 1000);
  } catch (error: any) {
    console.log(error);
    dispatch(getListUserFail());
  }
};
const getListUserRequest = () => {
  return { type: IUserActionTypes.FETCH_USERS_REQUEST };
};
const getListUserSuccess = (listUser: any) => {
  return { type: IUserActionTypes.FETCH_USERS_SUCCESS, payload: { isLoading: false, listUser } };
};
const getListUserFail = () => {
  return {
    type: IUserActionTypes.FETCH_USERS_FAIL,
  };
};
