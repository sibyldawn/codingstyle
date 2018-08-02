import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Men from './Components/Pages/Men';
import Women from './Components/Pages/Women';
import ProductView from './Components/Pages/ProductView';
import CheckoutForm from './Components/Pages/CheckoutForm';
import OrderConfirm from './Components/Pages/OrderConfirm';
import ShoppingBag from './Components/Pages/ShoppingBag/ShoppingBag';

export default class routes extends Component{
    render(){
    return <Switch>
             <Route exact path ="/" component={Home}/>
             <Route path="/Men" component={Men}/>
             <Route path="/Women" component={Women}/>
             <Route path="/CheckoutForm" component={CheckoutForm}/>
             <Route path="/OrderConfirm" component={OrderConfirm}/>
             <Route path="/ShoppingBag" component={ShoppingBag}/>
             
          </Switch>
    }
}