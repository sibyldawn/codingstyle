import React, { Component } from 'react';
import './Pages.css';
import axios from 'axios';

export default class Men extends Component {
    constructor(){
        super();

        this.state={
            men:[]
        }
    }

    componentDidMount(){
        axios.get('/api/products/Men').then( response => {
            console.log('--------getMen', response.data)
            this.setState({
                men:response.data
            })
        })
    }

    render() {
        const men = this.state.men.map( r => {
            return <div className="product-box" key={r.id}>
                <div className="image"><img src={r.picture}/></div>
                <p>Name: {r.name}</p>
                <p>Price: ${r.price}</p>

            </div>
        })
        return (
            <div className="wrap">
             {men}
            </div>
        )
    }
}