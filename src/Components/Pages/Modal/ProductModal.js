import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../Modal/ProductModal.css';


 
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
               
            </div>,
            this.el
        )
    }
}