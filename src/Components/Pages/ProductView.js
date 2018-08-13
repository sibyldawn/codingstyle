import React, { Component } from 'react';
import Popup from "reactjs-popup";
import ProductModal from '../Pages/Modal/ProductModal';
import axios from 'axios';
import { connect } from 'react-redux';
import ShoppingBag from './ShoppingBag/ShoppingBag';


const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "600px",
  border: "none",
  padding: "10px",
};

export default class ProductView extends Component {
 
    constructor(props) {
        super(props);

        this.state = {

          open: false,
          cart: JSON.parse(localStorage.getItem('cart')) || [],
          total: JSON.parse(localStorage.getItem('total')) || [],   
          id: 0,
          name:'',
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


   getUpdatedCart = (updated) => {
       this.setState({
           cart: updated
       })
   }


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
        let item = response.data
        console.log(item)
        let data;
        this.setState ({
            id: item[0].id,
            name:item.name,
            size:item.size,
            price:item.price,
            category:item.category,
            picture:item.picture,
        })
        this.addToCart(this.state.id,name,size,category)
    })
   }

   addToCart = (id,name,size,category) => {
    //    setTimeout(() => console.log('ADDDDDDD', this.state), 1000)
    console.log('ADDDDDDD', id)
    let item = {
        id: id,
        name: name,
        size:size,
        category: category,
        picture: this.props.picture,
        qty: this.state.qty,
        price: this.props.price,
        itemTotal: this.state.itemTotal,
    }
    let cart = []
            
    ;
    console.log('item qty', item.qty)
    console.log(JSON.parse(localStorage.getItem('cart')));
    if(JSON.parse(localStorage.getItem('cart')) == null){
        cart.push(item)
        localStorage.setItem('cart', JSON.stringify(cart));
        
    }else {
    let currentCart = JSON.parse(localStorage.getItem('cart'));
    console.log(currentCart)
    currentCart.push(item)
    let index =  currentCart.findIndex(e => e.id === this.state.id);
    if(index !== -1){
        
        console.log('currentCart[index] item.qty',currentCart[index].qty,item.qty) ;
        // currentCart[index].qty += +item.qty;
        currentCart[index].itemTotal = (+currentCart[index].qty * +currentCart[index].price).toFixed(2);
        }
    localStorage.setItem('cart', JSON.stringify(currentCart))
    window.location.reload();
    }
   
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
            console.log('ite subtotal ==============',subtotal)
            this.setState({
                itemTotal: subtotal
            })
            
            return subtotal
            
        }
    render() {
        console.log(this.state.itemTotal);
        return (
            <div className="product">
              <button className="btn-grad" onClick={this.openModal}>VIEW</button>
              <Popup 
                open = {this.state.open}
                closeOnDocumentClick
                // onClose = {this.closeModal}
                position="top center"
                contentStyle={contentStyle}
                >
                <div className="modal">
                   
                    <div className ="header">
                      <h3>Product View</h3>
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
                                    QTY:<input value={this.state.qty} type="number" width="10" onChange={(e) => this.handleChangeQty(e.target.value)} /></div>
                            </div>
                                <div className="show-grid">
                                  <h4>Subtotal:$ {this.state.itemTotal}</h4>
                                </div>

                        </div>
                <div>
                    <button onClick={() =>this.findProduct(this.props.name,this.state.size,this.props.category )} className="btn-grad" >ADD TO CART</button>
                </div>
              </div>
               </Popup> 
            </div>
        )
    }
}


 