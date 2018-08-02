import React, { Component } from 'react';
import './Men.css';
import axios from 'axios';
import WomenHeader from '../../Assets/Women.png';
import ProductView from '../Pages/ProductView';


export default class Men extends Component {
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
            qty: 1
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
    
    addToCart = (id,name,price,size,category,picture,qty,itemTotal) => {
        let cart = {
            id: this.state.id,
            name: this.state.name,
            price: this.state.price,
            size: this.state.size,
            category: this.state.category,
            picture: this.state.picture,
            qty: this.state.qty,
            itemTotal: this.state.itemTotal
        }
        // let currentCart = JSON.parse(localStorage.getItem('cart'));
        // let index =  currentCart.findIndex(e => e.id === id);
        // if(index !== -1){
        //     let pulledCart = JSON.parse(localStorage.getItem('cart'))
        //     pulledCart.qty += 1
        //     pulledCart.itemTotal = pulledCart.qty * pulledCart.price;
        // }else{
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    

    minusOneQty = () => {
        let pulledCart = JSON.parse(localStorage.getItem('cart'))
        let index = pulledCart.findIndex( e => e.id === pulledCart.id)
          pulledCart.qty -= 1;
          pulledCart.itemTotal = pulledCart.qty * pulledCart.price
    }

    plusOneQty = () => {
        let pulledCart = JSON.parse(localStorage.getItem('cart'))
        let index = pulledCart.findIndex( e => e.id === pulledCart.id)
          pulledCart.qty += 1;
          pulledCart.total = pulledCart.qty * pulledCart.price
    }

    render() {
        
        const women = this.state.women.map( r => {
            return <div className="product-box" key={r.id}>
                <div className="image"><img src={r.picture}/></div>
                <div><p>{r.name}</p></div>
                <div><p>Price: ${r.price}</p></div>
                <div className="addbutton"><ProductView/></div>

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
 
