import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title"><Link to="/">モノオク V2</Link></h1>
      </header>
      <p className="App-intro">
        <i class="material-icons">face</i>
        Coming soon...
      </p>
      <Button raised color="primary">
        Hello World
      </Button>
    </div>
  );
};

export default App;