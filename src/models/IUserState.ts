export enum IUserActionTypes {
  FETCH_USERS = 'USER/FETCH_USERS',
  FETCH_USERS_SUCCESS = 'USER/FETCH_USERS_SUCCESS',
  FETCH_USERS_FAIL = 'USER/FETCH_USERS_FAIL',
  FETCH_USERS_REQUEST = 'USER/FETCH_USERS_REQUEST',
  UPDATE_USER = 'USER/UPDATE_USER',
  CREATE_USER = 'USER/CREATE_USER',
  DELETE_USER = 'USER/DELETE_USER',
}
export default interface User {
  id?: string | null;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  createdAt?: string;
  updatedAt?: string;
}

export type IUserState = {
  username: string;
  fullname: string;
  role: string;
  email: string;
  avatar: any;
  phone: string;
};

export type IListUserState = {
  isLoading: boolean;
  listUser: any;
};

export type IUserActionCreator = {
  type: string;
  payload: IListUserState;
};
