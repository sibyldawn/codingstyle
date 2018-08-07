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
          products: [],
          id: '',
          name: '',
          price: 0,
          category: '',
          picture: '',
          itemTotal: 0,
     
        };
   };

   componentDidMount(){
       const { name } = this.props;
       console.log('==============',name)
        axios.get(`/api/products/${name}`).then( response => {
            console.log('-----getProduct',response);
            this.setState ({
                products: response.data[0]
            })
        })
   }


   openModal = () => {
     this.setState({
       open: true
     });
   }

   closeModal = () => {
     this.setState({
       open: false
     });
   }
//    findProduct =(id, name,size,category) => {
//     let product = [
//         this.props.name,
//         this.state.size,
//         this.props.category
//     ];

//     this.addToCart(id, name, size, category)

    //  axios.get('/api/products',product).then(response => {
    //      console.log('----findproduct', response.data);
    //      this.setState = {
    //         id: response.data.id,
    //         name: response.data.name,
    //         size:response.data.size,
    //         price: response.data.price,
    //         category: response.data.category,
    //         picture: response.data.picture,
    //      }
    //      this.addToCart(...{
    //         id: response.data.id,
    //         name: response.data.name,
    //         size:response.data.size,
    //      })
    //  })
//    }

   addToCart = (id, name,size,price,category,picture,qty,itemTotal) => {
    let cart = {
        id: this.state.products.id,
        name: this.state.products.name,
        price: this.state.products.price,
        size: this.state.size,
        category: this.state.products.category,
        picture: this.state.products.picture,
        qty: this.state.qty,
        itemTotal: this.state.itemTotal
    };
    console.log(JSON.parse(localStorage.getItem('cart')));
    if(JSON.parse(localStorage.getItem('cart')) == null){

        localStorage.setItem('cart', JSON.stringify(cart));
    }else {
    let currentCart = JSON.parse(localStorage.getItem('cart'));
    let index =  currentCart.findIndex(e => e.id === id);
    if(index !== -1){
        currentCart[index].qty += 1
        currentCart[index].itemTotal = currentCart[index].qty * currentCart[index].price;
        }
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
            const {price} = this.state.products.price;
            this.setState({
                itemTotal: qty *= price,
            }) 
        }
    render() {

        console.log(this.state)

        
        return (
            <div className="product">
              <button className="product-button" onClick={this.openModal}>QUICK VIEW</button>
              <Popup 
                open = {this.state.open}
                closeOnDocumentClick
                onClose = {this.closeModal}
                position="top center"
                contentStyle={contentStyle}
                >
                <div className="modal">
                   
                    <div className ="header">
                      
                    </div>
                    <div className="content">
                            <div>
                            <div className="show-grid">
                                <img  id="preview" src={this.state.products ? this.state.products.picture : ''}/> 
                            </div>
                            <div className="show-grid">
                                <h4>{this.state.products ? this.state.products.name : ''}</h4>
                            </div>
                            <div className="show-grid">
                                <h4>${this.state.products ? this.state.products.price : ''}</h4>
                            </div>
                                <div className="show-grid">
                                   <select onChange={(e) => this.handleChangeSize(e.target.value)} value={this.state.size}>
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
                                  <h4>Subtotal: {this.state.itemTotal}</h4>
                                </div>

                        </div>
                <div>
                    <button onClick={() =>this.addToCart()} className="add-cart" >ADD TO CART</button>
                </div>
              </div>
               </Popup> 
            </div>
        )
    }
}