import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Redirect,Link } from 'react-router-dom';
import './OrderConfirm.css';
import axios from 'axios';




class OrderConfirm extends Component {
    constructor(props){
        super();

        this.state = {
            order: [],
        }
    }


    componentDidMount(){
       axios.get(`/api/orderconfirmation/${this.props.match.params.orderId}`).then(order => {
         console.log("DB Response", order)
        this.setState({
                order: order.data
            })
        })
    }

 render() {
    
    const data = this.state.order.map(n => {
      const date = Date.parse(`${n.date}`);
      const orderDate = new Date(date).toLocaleString();
      return (
        <div key={n.id}>
          <h3>Thank you for your Order!</h3>
          <h4>Order Date:{orderDate}</h4>
          <h4>Order ID: {n.id}</h4>
          <hr/>
          <h3>To:</h3>
          <h4>{n.first_name} {n.last_name}</h4>
          <h4>{n.email}</h4>
          <h4>{n.address}</h4>
          <h4>{n.city}, {n.state}</h4>
          <h4>{n.zipcode}</h4>
        </div>
      );
    })

  return (
   <div className="confirm-body">
    <div className="order-details">
    <Paper>
   {data} 
   </Paper>
   </div>
  </div>
  );
 }
}


export default OrderConfirm;