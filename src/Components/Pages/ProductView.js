import React, { Component } from 'react';
import Popup from "reactjs-popup";
import ProductModal from '../Pages/Modal/ProductModal';

const contentStyle = {
  background: "rgba(255,255,255,0)",
  width: "400px",
  border: "none"
};

export default class ProductView extends Component {
 
    constructor(props) {
        super(props);

        this.state = {open: false};
   };
    
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
    
 
    render() {

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
                    Product Info
                    </div>
                    <div className="content">
                            <div>
                            <div className="show-grid">
                                <img  id="preview" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhaM7wMcPIMCYEbmg2fZCcD5mKpTDYDu8Hj53pN0klqnUM0lZq" /> 
                            </div>
                            <div className="show-grid">
                                <h4>PRODUCT NAME</h4>
                            </div>
                            <div className="show-grid">
                                <h4>$100.00</h4>
                            </div>
                                <div className="show-grid">
                                    <span>
                                        <button>S</button>
                                        <button>M</button>
                                        <button>L</button>
                                        <button>XL</button>
                                    </span>
                                    
                                </div>
                                <div className="show-grid">
                                    QTY:<input type="integer" width="10"/></div>
                            </div>

                            
                        </div>
                <div>
                    <button className="add-cart" >ADD TO CART</button>
                </div>
              </div>
               </Popup> 
            </div>
        )
    }
}