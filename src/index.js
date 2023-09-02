// React
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

// React Router DOM
import { BrowserRouter } from 'react-router-dom';

// Redux Toolkit
import { store } from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
