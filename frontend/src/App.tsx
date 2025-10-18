import './App.scss';
import WebRouter from './components/default/WebRouter';
import Toastify from './components/default/Toastify';
import { useTypedDispatch } from './redux/store';
import { getTokenFromStorage } from './redux/user/actions';
import { useEffect } from 'react';

function App() {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getTokenFromStorage());
  }, [dispatch]);
  
  return (
    <div className="App">
      <WebRouter />
      <Toastify />
    </div>
  );
}

export default App;
