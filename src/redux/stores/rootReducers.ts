import { combineReducers } from 'redux';

// reducers
import app from 'redux/reducers/app.reducer';
import auth from 'redux/reducers/auth.reducer';
import post from 'redux/reducers/post.reducer';
import user from 'redux/reducers/user.reducer';

const reducers = combineReducers({
  app,
  auth,
  post,
  user,
});

export default reducers;
