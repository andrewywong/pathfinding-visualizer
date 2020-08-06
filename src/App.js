import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ContextProvider } from './ContextProvider';
import Home from './components/Home/Home';

function App() {
  return (
    <ContextProvider>
      <Home />
    </ContextProvider>
  );
}

export default App;
