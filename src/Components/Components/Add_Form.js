
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import '../Pages/Admin_Dashboard/Admin_Dashboard.css';
import { updateName, updatePrice, updateSize, updateCategory,updatePicture} from '../../ducks/reducer';

class Add_Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      
    };
  }

  addProduct = () => {
    let newProduct = {
        name: this.props.name,
        price: this.props.price,
        size: this.props.size,
        category: this.props.category,
        picture: this.props.picture,
    };
    axios.post('/api/admin/products', newProduct).then( res => {
      alert('Add Product', res.data);
    })
    
  }

  render() {
    const { updateName, updatePrice, updateSize, updateCategory,updatePicture} = this.props;
    return (
      <div className="add-form">
        <form onSubmit={this.addProduct}>
         <label>
          Product Name: <br/><br/>
          <input type="text" value={this.props.name} onChange={(e)=> updateName(e.target.value)}/>
          </label>
          <label><br/><br/>
          Price: <br/><br/>
          <input type="number" value={this.props.price} onChange={(e)=> updatePrice(e.target.value)}/>
          </label>
          <label>
          <br/><br/>
          <select value={this.props.size} onChange={(e)=> updateSize(e.target.value)}>
          <option value="null">SIZE</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Extra Large</option>
          </select>
        </label>
        <label>
          <br/><br/>
          <select value={this.props.category} onChange={(e)=> updateCategory(e.target.value)} > 
            <option value="null">CATEGORY</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </label>
        <br/><br/>
        <label>
          Image URL: <br/><br/>
          <input type="text" value={this.props.picture} onChange={(e)=> updatePicture(e.target.value)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    name: state.name,
    price: state.price,
    size: state.size,
    category: state.category,
    picture: state.picture
  }
}


export default connect(mapStateToProps,{ updateName, updatePrice, updateSize, updateCategory,updatePicture})(Add_Form);


          
        
      
