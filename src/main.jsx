import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import './style/index.scss';
import { Provider } from 'react-redux';
import firebaseConfig from '../firebaseConfig.js';
import { initializeApp } from "firebase/app";
import { store } from './store/index';
import { getDatabase } from 'firebase/database';
import 'firebase/database';

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
