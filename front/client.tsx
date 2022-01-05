import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import App from '@layouts/App';

axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? '/' : 'http://localhost:3095';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#app'),
);
