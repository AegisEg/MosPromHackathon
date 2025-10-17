import React from 'react';
import './App.scss';
import WebRouter from './components/default/WebRouter';
import Toastify from './components/default/Toastify';

function App() {
  return (
    <div className="App">
      <WebRouter />
      <Toastify />
    </div>
  );
}

export default App;
