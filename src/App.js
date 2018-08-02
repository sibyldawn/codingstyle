import React, { Component } from 'react';
import './App.css';
import Header from './Components/Components/Header';
import Routes from './routes';
import ShoppingBag from './Components/Pages/ShoppingBag/ShoppingBag';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Routes/>
      </div>   
     );
  }
}

export default App;
