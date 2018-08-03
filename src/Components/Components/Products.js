import React, { Component } from 'react';
import { Grid,Row,Col,Button,Media} from 'react-bootstrap';
import axios from 'axios';
 
export default class Products extends Component {
    constructor(props){
        super(props);

        this.state={
            products: [],
        };
    }

    componentDidMount(){
        axios.get('/api/products').then(res => {
            console.log("products", res.data);
            this.setState({
                products: res.data
            })
        })
    }


    render() {
        const products = this.state.products.map( r => {
            return <div className="productwrap" key={r.id}>
                    <Media>
                        <Media.Left>
                        <img width={100} height={100} src={r.picture}/> 
                        </Media.Left>
                        <Media.Body>
                             <div>{r.name}</div>
                             <div>Category:{r.category}</div>
                             <div>Price:{r.price}</div>
                        </Media.Body>
                    </Media>
                    <hr/>
                 </div>
        })
        return (
            <div>
             {products}         
            </div>
        );
    }
}