export enum IImageActionTypes {
  UPLOAD_IMAGE_REQUEST = 'IMAGE/UPLOAD_IMAGE_REQUEST',
  UPLOAD_IMAGE_SUCCESS = 'IMAGE/UPLOAD_IMAGE_SUCCESS',
  UPLOAD_IMAGE_FAIL = 'IMAGE/UPLOAD_IMAGE_FAIL',
  CLEAR_IMAGE = 'IMAGE/CLEAR_IMAGE',
}

export type IImageState = {
  isLoading: boolean;
  filename: string;
};

export type IImageActionCreator = {
  type: string;
  payload: IImageState;
};
