export enum IPostActionTypes {
  FETCH_POST = 'POST/FETCH_POST',
  UPDATE_POST = 'POST/UPDATE_POST',
  CREATE_POST = 'POST/CREATE_POST',
  DELETE_POST = 'POST/DELETE_POST',
}

export type Post = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  isPublic: boolean;
  updatedAt: string;
  createdAt: string;
  content: string;
  user: {
    fullname: string;
    id: string;
    username: string;
  };
};

export type IPostState = {
  id?: string;
  title: string;
  content: string;
  description: string;
  thumbnail: any;
};

export type IListPostState = {
  listPost: any;
};

export type IPostActionCreator = {
  type: string;
  payload: IListPostState;
};
