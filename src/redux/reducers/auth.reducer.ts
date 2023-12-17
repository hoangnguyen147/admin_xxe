import { produce } from 'immer';
import { IAuthActionTypes, IAuthActionCreator, IAuthState } from 'models/IAuthState';

const initialState: IAuthState = {
  user: null,
  role: null,
};

const reducer = (state = initialState, { type, payload }: IAuthActionCreator) => {
  return produce(state, (draft) => {
    switch (type) {
      case IAuthActionTypes.LOGIN_SUCCESS:
        draft.user = payload.user;
        draft.role = payload.role;
        break;
      case IAuthActionTypes.LOGIN_FAILURE:
        draft.user = null;
        break;
      case IAuthActionTypes.LOGOUT:
        draft = initialState;
        break;
      case IAuthActionTypes.SILENT_LOGIN:
        draft.user = payload.user;
        draft.role = payload.role;
        break;
      default:
        break;
    }
  });
};

export default reducer;
