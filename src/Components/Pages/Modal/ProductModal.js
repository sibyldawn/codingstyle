import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../Modal/ProductModal.css';
import Popup from 'reactjs-popup';

 
const root = document.getElementById('root')
const modalRoot = document.getElementById('modal-root')

export default class ProductModal extends Component {

 
    constructor(props, context) {
        super(props, context);
        this.el = document.createElement('div');
    
        this.state = {
          show: false,
         
        };
      }
     
      componentDidMount(){
          modalRoot.appendChild(this.el)
      }

      componentWillUnmount(){
          modalRoot.removeChild(this.el) 
      }
    
    
    render() {

        return ReactDOM.createPortal(
            <div>
       
                  <div className ="modal">
        
                    <div className="header" >
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
    
            </div>,
            this.el
        )
    }
}