import React, { Component } from 'react';
import Popup from "reactjs-popup";
import ProductModal from '../Pages/Modal/ProductModal';
import axios from 'axios';

const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "400px",
  border: "none"
};

export default class ProductView extends Component {
 
    constructor(props) {
        super(props);

        this.state = {

          open: false,
          cart: JSON.parse(localStorage.getItem('cart')) || [],
          id: 0,
          size: '',
          price: 0,
          category: '',
          picture: '',
          qty: 0,
          itemTotal: 0,
     
        };
        this.closeModal = this.closeModal.bind(this)
   };



   openModal = () => {
     this.setState({
       open: true
     });
   };

   closeModal(){
     this.setState({
       open: false
     });
   };


   findProduct =(name,size,category) => {
    if( !this.state.size   ){
        alert('Please choose a size.')
        return 
    }
    let product = [
        this.props.name,
        this.state.size,
        this.props.category
    ];
    axios.get(`/api/findproduct/?name=${this.props.name}&size=${this.state.size}&category=${this.props.category}`).then(response => {
        console.log('------sentProduct',product);
        console.log('----findproduct', response);
        let item = response.data[0]
        console.log(item)
        let data;
        this.setState ({
            id: item.id,
            name:item.name,
            size:item.size,
            price:item.price,
            category:item.category,
            picture:item.picture,
        })
        this.addToCart(name,size,category)
    })
   }

   addToCart = (id, name,size,price,category,picture,qty,itemTotal) => {
    //    setTimeout(() => console.log('ADDDDDDD', this.state), 1000)
    console.log('ADDDDDDD', this.state)
    let cart = [
        {
        id: this.state.id,
        name: this.props.name,
        size: this.state.size,
        category: this.props.category,
        picture: this.props.picture,
        qty: this.state.qty,
        itemTotal: this.state.itemTotal}
    ];
    console.log(JSON.parse(localStorage.getItem('cart')));
    if(JSON.parse(localStorage.getItem('cart')) == null){

        localStorage.setItem('cart', JSON.stringify(cart));
    }else {
    let currentCart = JSON.parse(localStorage.getItem('cart'));
    currentCart.push(cart)
    console.log(currentCart)
    let index =  currentCart.findIndex(e => e.id === id);
    if(index !== -1){
        currentCart[index].qty += 1
        currentCart[index].itemTotal = currentCart[index].qty * currentCart[index].price;
        }
    localStorage.setItem('cart', JSON.stringify(currentCart))
    }
   }
   

        minusOneQty = () => {
            let currentCart = JSON.parse(localStorage.getItem('cart'))
            let index = currentCart.findIndex( e => e.id === currentCart.id)
            currentCart.qty -= 1;
            currentCart.itemTotal = currentCart.qty * currentCart.price
        }

        plusOneQty = () => {
            let currentCart = JSON.parse(localStorage.getItem('cart'))
            let index = currentCart.findIndex( e => e.id === currentCart.id)
            currentCart.qty += 1;
            currentCart.total = currentCart.qty * currentCart.price
        }
    
        handleChangeSize = (size) => {
            this.setState({
                size: size
            })
        }

        handleChangeQty = (qty) => {
            this.setState({
                qty: qty
            })
            this.calculateSubtotal(qty);
        }

        calculateSubtotal = (qty) => {
            const {price} = this.props;

            console.log('=======price qty',price, qty)
            let subtotal = (+qty * +price).toFixed(2)
            this.setState({
                itemTotal: subtotal ,
            }) 
        }
    render() {
        
        return (
            <div className="product">
              <button className="product-button" onClick={this.openModal}>QUICK VIEW</button>
              <Popup 
                open = {this.state.open}
                closeOnDocumentClick
                // onClose = {this.closeModal}
                position="top center"
                contentStyle={contentStyle}
                >
                <div className="modal">
                   
                    <div className ="header">
                      <h4>Product View</h4>
                    </div>
                    <div className="content">
                            <div>
                            <div className="show-grid">
                                <img  id="preview" src={this.props ? this.props.picture : ' '}/> 
                            </div>
                            <div className="show-grid">
                                <h4>{this.props ? this.props.name : ''}</h4>
                            </div>
                            <div className="show-grid">
                                <h4>${this.props ? this.props.price : ''}</h4>
                            </div>
                            <div className="show-grid">
                                <h4>{this.props ? this.props.category : ''}</h4>
                            </div>
                                <div className="show-grid">
                                   <select onChange={(e) => this.handleChangeSize(e.target.value)} value={this.state.value}>
                                        <option value='default'>Select Size</option>
                                        <option value='S'>S</option>
                                        <option value='M'>M</option>
                                        <option value='L'>L</option>
                                        <option value='XL'>XL</option>
                                    </select>
                                    
                                </div>
                                <div className="show-grid">
                                    QTY:<input type="integer" width="10" onChange={(e) => this.handleChangeQty(e.target.value)} /></div>
                            </div>
                                <div className="show-grid">
                                  <h4>Subtotal:$ {this.state.itemTotal}</h4>
                                </div>

                        </div>
                <div>
                    <button onClick={() =>this.findProduct(this.props.name,this.state.size,this.props.category )} className="add-cart" >ADD TO CART</button>
                </div>
              </div>
               </Popup> 
            </div>
        )
    }
}