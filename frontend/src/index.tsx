import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './components/default/ErrorBoundary';
import Error from './pages/Error';
import './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ErrorBoundary fallback={<Error />}>
    <App />
  </ErrorBoundary>
);
