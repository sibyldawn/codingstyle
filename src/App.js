import React, { Component } from 'react';
import './App.css';
import Header from './Components/Components/Header/Header';
import Routes from './routes';
import './Components/Components/Header/Header.css';


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
