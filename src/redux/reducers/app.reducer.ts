import { produce } from 'immer';
import { IAppActionTypes, IAppActionCreator, IAppState } from 'models/IAppState';

const initialState: IAppState = {
  isLoading: false,
  dialog: {
    type: 'error',
    isShow: false,
    content: '',
  },
  notifications: {},
  searchContent: '',
};

const reducer = (state = initialState, { type, payload }: IAppActionCreator) => {
  return produce(state, (draft) => {
    switch (type) {
      case IAppActionTypes.SET_LOADING:
        draft.isLoading = payload;
        break;
      case IAppActionTypes.SET_DIALOG:
        draft.dialog = {
          type: payload.dialog.type,
          isShow: payload.dialog.isShow,
          content: payload.dialog.content,
        };
        break;
      case IAppActionTypes.ENQUEUE_SNACKBAR: {
        const { key, message, variant } = payload;
        draft.notifications[key] = {
          key,
          message,
          variant,
        };
        break;
      }
      case IAppActionTypes.REMOVE_SNACKBAR: {
        const newNotfi = { ...state.notifications };
        delete newNotfi[payload];
        draft.notifications = newNotfi;
        break;
      }
      case IAppActionTypes.SET_SEARCH: {
        draft.searchContent = payload;
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;
