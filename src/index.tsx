
import App from './App';
import React from 'react';
import Store from '@/store';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import 'antd/dist/antd.css';
import '@/assets/index.scss';
ReactDOM.render(
  <Provider {...Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

