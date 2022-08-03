import React from 'react';
import './index.module.css'
import ReactDOM from 'react-dom/client';
import App from './components/routes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);