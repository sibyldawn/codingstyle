import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Men from './Components/Pages/Men';
import Women from './Components/Pages/Women';
import ProductView from './Components/Pages/ProductView';
import ShoppingBag from './Components/Pages/ShoppingBag';
import CheckoutForm from './Components/Pages/CheckoutForm';
import OrderConfirm from './Components/Pages/OrderConfirm';

export default function routes(){
    return <Switch>
             <Route exact path ="/" Component = {Home}/>
             <Route path="/Men" Component={Men}/>
             <Route path="/Women" Component={Women}/>
             <Route path="/ProductView" Component={ProductView}/>
             <Route path="/ShoppingBag" Component={ShoppingBag}/>
             <Route path="/CheckoutForm" Component={CheckoutForm}/>
             <Route path="/OrderConfirm" Component={OrderConfirm}/>
          </Switch>
}