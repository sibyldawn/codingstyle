import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Men from './Components/Pages/Catalogs/Men';
import Women from './Components/Pages/Catalogs/Women';
import ProductView from './Components/Pages/ProductView';
import CheckoutForm from './Components/Pages/CheckoutForm';
import OrderConfirm from './Components/Pages/OrderConfirm';
import ShoppingBag from './Components/Pages/ShoppingBag/ShoppingBag';
import AdminDashboard from './Components/Pages/Admin_Dashboard/Admin_Dashboard';
import Add_Form from './Components/Components/Add_Form';
import Products from './Components/Components/Products';
import Orders from './Components/Components/Orders';
import Redirect from './Components/Components/Redirect';

export default class routes extends Component{
    render(){
    return <Switch>
             <Route exact path ="/" component={Home}/>
             <Route path="/Men" component={Men}/>
             <Route path="/Women" component={Women}/>
             <Route path="/CheckoutForm" component={CheckoutForm}/>
             <Route path="/OrderConfirm/:orderId" component={OrderConfirm}/>
             {/* <Route path="/ShoppingBag" component={ShoppingBag}/> */}
             <Route path="/Dashboard" component={AdminDashboard}/>
             <Route path="/Redirect"  component={Redirect}/>
   
          </Switch>
    }
}