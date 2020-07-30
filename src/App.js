import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContextProvider from './ContextProvider';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Home />
      </ContextProvider>
    </div>
  );
}

export default App;
