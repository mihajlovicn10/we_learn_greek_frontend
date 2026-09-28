import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n';
import { initAnalytics } from './lib/analytics';

initAnalytics();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found');
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to mount app:', error);
  rootElement.innerHTML = `
    <div style="padding: 2rem; font-family: system-ui, sans-serif; color: #1e3a5f;">
      <h1>We Learn Greek</h1>
      <p>Failed to load the app. Please refresh or try another browser.</p>
      <p lang="el">Η εφαρμογή δεν φόρτωσε. Ανανέωσε τη σελίδα ή δοκίμασε άλλο πρόγραμμα περιήγησης.</p>
    </div>
  `;
}
