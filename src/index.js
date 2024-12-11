import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './css/style.css';
import './css/modal.css';
import './css/optimization.css';

const root = createRoot(document.getElementById('wrapper'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
