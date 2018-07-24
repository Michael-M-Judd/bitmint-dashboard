import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar/>
        <Home />
      </div>
    );
  }
}

export default App;
