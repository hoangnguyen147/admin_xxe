import { produce } from 'immer';
import { IListUserState, IUserActionCreator, IUserActionTypes } from 'models/IUserState';

const initialState: IListUserState = {
  isLoading: false,
  listUser: [],
};

const reducer = (state = initialState, { type, payload }: IUserActionCreator) => {
  return produce(state, (draft) => {
    switch (type) {
      case IUserActionTypes.FETCH_USERS_REQUEST:
        draft.isLoading = true;
        break;
      case IUserActionTypes.FETCH_USERS_SUCCESS:
        draft.isLoading = false;
        draft.listUser = payload.listUser;
        break;
      case IUserActionTypes.FETCH_USERS_FAIL:
        draft = initialState;
        break;
      default:
        break;
    }
  });
};

export default reducer;
