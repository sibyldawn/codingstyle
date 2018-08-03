import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';

export default class Orders extends Component {
    constructor(props){
        super(props)

        this.state = {
            orders: [],
        }
    }

    componentDidMount(){
        axios.get('/api/admin/orders').then( res => {
            console.log("orders", res.data);
            this.setState({
                orders: res.data
            })
        })
    }

    render() {
        const orders = this.state.orders.map( r => {
            return   <tr>
                    <td>{r.id}</td>
                    <td>{r.date}</td>
                    <td>{r.status}</td>
                    <td>{r.first_name}</td>
                    <td>{r.last_name}</td>
                    <td>{r.address}</td>
                    <td>{r.city}</td>
                    <td>{r.state}</td>
                    <td>{r.zipcode}</td>
                    <td>{r.name}</td>
                    <td>{r.price}</td>
                    <td>{r.category}</td>
                    <td>{r.size}</td>
                    </tr> 
                
        })
        return (
            <div>
                <Table striped bordered condensed hover>
                <thead>
                    <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zipcode</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    {orders}
                </tbody>
                </Table>
               
                
            </div>
        );
    }
}