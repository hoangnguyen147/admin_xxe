import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// rootReducers;
import rootReducers from './rootReducers';

const persistConfig = {
  key: 'client',
  storage,
  whitelist: ['auth'],
};

const store = createStore(persistReducer(persistConfig, rootReducers), composeWithDevTools(applyMiddleware(thunk)));

export default store;

export const persistor = persistStore(store);
