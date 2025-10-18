import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import ErrorBoundary from './components/default/ErrorBoundary';
import Error from './pages/Error';
import './i18n';
import store from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <ErrorBoundary fallback={<Error />}>
        <App />
    </ErrorBoundary>
  </Provider>
);
