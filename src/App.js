import React, { Component } from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import './App.css';
import Header from './Components/Components/Header/Header';
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
