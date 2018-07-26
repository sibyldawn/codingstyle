import React, { Component } from 'react';
import './Pages.css';
import axios from 'axios';

export default class Men extends Component {
    constructor(){
        super();

        this.state={
            women:[]
        }
    }

    componentDidMount(){
        axios.get('/api/products/Women').then( response => {
            console.log('--------getWomen', response.data)
            this.setState({
                women:response.data
            })
        })
    }

    render() {
        const women = this.state.women.map( r => {
            return <div className="product-box" key={r.id}>
                <div className="image"><img src={r.picture}/></div>
                <p>Name: {r.name}</p>
                <p>Price: ${r.price}</p>

            </div>
        })
        return (
            <div className="wrap">
             {women}
            </div>
        )
    }
}