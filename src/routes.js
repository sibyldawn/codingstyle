import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Men from './Components/Pages/Catalogs/Men';
import Women from './Components/Pages/Catalogs/Women';
import CheckoutForm from './Components/Pages/CheckoutForm';
import OrderConfirm from './Components/Pages/OrderConfirm';
import AdminDashboard from './Components/Pages/Admin_Dashboard/Admin_Dashboard';
import Redirect from './Components/Components/Redirect';
import OrderHistory from './Components/Components/OrderHistory';

export default class routes extends Component{
    render(){
    return <Switch>
             <Route exact path ="/" component={Home}/>
             <Route path="/Men" component={Men}/>
             <Route path="/Women" component={Women}/>
             <Route path="/CheckoutForm" component={CheckoutForm}/>
             <Route path="/OrderConfirm/:orderId" component={OrderConfirm}/>
             <Route path="/OrderHistory" component={OrderHistory}/>
             <Route path="/Dashboard" component={AdminDashboard}/>
             <Route path="/Redirect"  component={Redirect}/>
   
          </Switch>
    }
}