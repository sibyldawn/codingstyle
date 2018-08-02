import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Popovers, Row, Col, Grid, Button, DropdownButton, Image, MenuItem,ButtonGroup,ButtonToolbar } from 'react-bootstrap';

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
             <Modal show={this.props.show} onHide={this.props.handleClose}
               {...this.props}
               bsSize="large"
               className="modal"
               >
                <Modal.Header closeButton className="modal-header" >
                  <Modal.Title id="contained-modal-title-lg">Product Info</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                <Grid className="grid">
                    <Row className="show-grid">
                        <Col xs={12} md={12}>
                        <img  id="preview" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhaM7wMcPIMCYEbmg2fZCcD5mKpTDYDu8Hj53pN0klqnUM0lZq" /> 
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} md={12}>
                        <h4>PRODUCT NAME</h4>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} md={12}>
                        <h4>$100.00</h4>
                        </Col>
                    </Row>
                    
                        <Row className="show-grid">
                            <Col xs={12} md={12}>
                            <ButtonGroup>
                                <Button>S</Button>
                                <Button>M</Button>
                                <Button>L</Button>
                                <Button>XL</Button>
                            </ButtonGroup>
                            </Col>
                            
                        </Row>
                        <Row className="show-grid"><Col xs={12} md={12}>
                            QTY:<input type="integer" width="10"/></Col></Row>
                    </Grid>

                    
                </Modal.Body>
                <Modal.Footer>
                    <Button className="add-cart" onClick={this.props.onHide}>ADD TO CART</Button>
                </Modal.Footer>
            </Modal>
            </div>,
            this.el
        )
    }
}