import React, { Component } from 'react';
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
                    <div>
                        <div>
                        <img width={100} height={100} src={r.picture}/> 
                        </div>
                        <div>
                             <div>{r.name}</div>
                             <div>Category:{r.category}</div>
                             <div>Price:{r.price}</div>
                        </div>
                    </div>
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