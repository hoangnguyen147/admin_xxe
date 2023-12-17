import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// context
import { GlobalProvider } from 'context/GlobalContext';

// stores
import store, { persistor } from 'redux/stores';

// services
import initRequest from 'services/initRequest';

// components
import App from './App';

// styles
import './index.css';

// redux persist
import { PersistGate } from 'redux-persist/lib/integration/react';

import reportWebVitals from './reportWebVitals';

initRequest(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
