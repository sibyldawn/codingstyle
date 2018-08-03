
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import '../Pages/Admin_Dashboard/Admin_Dashboard.css';
import { FormGroup,FormControl,ControlLabel,Radio,Button,HelpBlock,Forms} from 'react-bootstrap';
import { updateName, updatePrice, updateSize, updateCategory,updatePicture} from '../../ducks/reducer';

class Add_Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      
    };
  }

  addProduct = () => {
    let newProduct = [
        this.props.name,
        this.props.price,
        this.props.size,
        this.props.category,
        this.props.picture
    ];
    axios.post('/api/admin/products', newProduct).then( res => {
      console.log('Add Product', res.data);
    })
    alert(`ADDED PRODUCT:${this.props.name}, ${this.props.price},${this.props.size},${this.props.category},${this.props.picture}`);
  }

  render() {
    const { updateName, updatePrice, updateSize, updateCategory,updatePicture} = this.props;
    return (
      <div>
      <form>
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Product"
          placeholder="Enter Product Name"
          onChange = {(e) => updateName(e.target.value)}
        />
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Price"
          placeholder="Enter Price"
          onChange = {(e) => updatePrice(e.target.value)}
        />
        <FormGroup onChange = {(e) => updateSize(e.target.value)}>
              <Radio name="radioGroup" value="S" inline>
              S
              </Radio>{' '}
              <Radio name="radioGroup" value="M" inline>
              M
              </Radio>{' '}
            <Radio name="radioGroup" value="L" inline>
              L
            </Radio>{' '}
            <Radio name="radioGroup" value="XL" inline>
              XL
            </Radio>
          </FormGroup>

        <FormGroup controlId="formControlsSelect" >
          <ControlLabel>Select</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={(e) => updateCategory(e.target.value)}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </FormControl>
        </FormGroup>

        
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Image URL"
          placeholder="Enter Image Url"
          onChange = {(e) => updatePicture(e.target.value)}
        />
    
        
    
        <Button bsStyle="warning" type="submit" onClick={(e)=> this.addProduct(e.target.value)}>Add Product</Button>
      </form>
    </div>
    );
  }
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

function mapStateToProps(state){
  return {
    name: state.name,
    price: state.name,
    size: state.size,
    category: state.category,
    picture: state.picture
  }
}


export default connect(mapStateToProps,{ updateName, updatePrice, updateSize, updateCategory,updatePicture})(Add_Form);


          
        
      
