import React, { Component } from 'react';
import './Men.css';
import axios from 'axios';
import menHeader from '../../../Assets/Men.png';
import ProductView from '../../Pages/ProductView';
import ProductModal from '../Modal/ProductModal';


export default class Men extends Component {
    constructor(props){
        super(props);

        this.state={
            men:[],
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
        axios.get('/api/products/Men').then( response => {
            console.log('--------getMen', response.data)
            this.setState({
                men:response.data
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
        
        const men = this.state.men.map( r => {
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
                <img className="large" src={ menHeader }/>
            </div>
           <div className="grid-body">
            <div className="grid-container">
            
             {men}
             
            </div>
          </div>
        </div>
        )
    }
}
 
