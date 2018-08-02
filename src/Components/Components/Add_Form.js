
import React, { Component } from 'react';
import { FormGroup,FormControl,ControlLabel,Checkbox,Button,HelpBlock,Forms} from 'react-bootstrap';


export default class Add_Form extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div>
      <form>
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Product"
          placeholder="Enter text"
        />
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Price"
          placeholder="Enter text"
        />
        <FormGroup>
            <Checkbox inline>S</Checkbox> <Checkbox inline>M</Checkbox>
            <Checkbox inline>L</Checkbox> <Checkbox inline>XL</Checkbox>
          </FormGroup>
        <FieldGroup
        id="formControlsFile"
        type="file"
        label="Choose File"
        help="Upload Product Picture"
      />
        
    
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select</ControlLabel>
          <FormControl componentClass="select" placeholder="select">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </FormControl>
        </FormGroup>
    
        <Button bsStyle="Warning" type="submit">Add Product</Button>
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
          
        
      
