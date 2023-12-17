import { IAppState } from './IAppState';
import { IAuthState } from './IAuthState';
import { IListPostState } from './IPostState';
import { IListUserState } from './IUserState';
import { IImageState } from './IImageState';

type IRootState = {
  app: IAppState;
  auth: IAuthState;
  post: IListPostState;
  user: IListUserState;
  image: IImageState;
};

export default IRootState;
