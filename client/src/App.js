import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import './css/main.css';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/>
          <Home />
        </div>
      </Provider>

    );
  }
}

export default App;
