import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // Tailwind or global styles
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Create root and render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker for PWA offline mode
serviceWorkerRegistration.register();
