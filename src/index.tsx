

import App from './App';
import React from 'react';
import Store from '@/store';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import '@/assets/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider {...Store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

