
import App from './App';
import React from 'react';
import Store from '@/store';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import 'antd/dist/antd.css';
import '@/assets/index.scss';
//考试管理
import '@/assets/s-exam.scss';
ReactDOM.render(
  <Provider {...Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

