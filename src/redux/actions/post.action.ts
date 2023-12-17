import { Dispatch } from 'redux';
import { IPostActionTypes } from 'models/IPostState';

export const fetchListPost = () => (dispatch: Dispatch<any>) => {
  dispatch({ type: IPostActionTypes.FETCH_POST });
};
