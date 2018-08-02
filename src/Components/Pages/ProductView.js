import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ProductModal from '../Pages/ProductModal';

export default class ProductView extends Component {
 
    constructor(props, context) {
        super(props, context);
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
         
        };
    }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }
    
    
    render() {

        return (
            <div className="product">
            <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
            ADD TO BAG
            </Button>
             <ProductModal show={this.state.show} onHide={this.handleClose}
               {...this.props}
               />
            </div>
        )
    }
}