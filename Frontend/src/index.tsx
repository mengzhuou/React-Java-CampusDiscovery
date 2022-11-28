import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LoadScript } from '@react-google-maps/api';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoadScript
      googleMapsApiKey="AIzaSyCqcmw27n2Z66yVih4M47FZGLj2vKcJnkA"
    >
      <App />
    </LoadScript>
  </React.StrictMode>
);


