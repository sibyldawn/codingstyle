import React, { Component } from 'react';
import './Men.css';
import axios from 'axios';
import WomenHeader from '../../../Assets/Women.png';
import ProductView from '../../Pages/ProductView';


export default class Women extends Component {
    constructor(props){
        super(props);

        this.state={
            women:[],
            id: '',
            name: '',
            price: 0,
            size: '',
            category: '',
            picture: '',
            itemTotal: 0,
            qty: 0,
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
        let styles = {
            height: 400,
            width:400
        }
        const women = this.state.women.map( r => {
            return <div className="product-box" key={r.id}>
                <div className="image"><img src={r.picture} style={styles}/></div>
                <div><p>{r.name}</p></div>
                <div><p>Price: ${r.price}</p></div>
                <div><ProductView
                    name={r.name}
                    category={r.category}
                    price={r.price}
                    picture={r.picture}
                /></div>

                </div>
        })
        return (
         <div>
             <div className="top">
                <img className="large" src={ WomenHeader }/>
            </div>
           <div className="grid-body">
            <div className="grid-container">
            
             {women}
             
            </div>
          </div>
        </div>
        )
    }
}
 
