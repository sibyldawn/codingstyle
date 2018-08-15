
import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import '../Pages/Admin_Dashboard/Admin_Dashboard.css';
import { updateName, updatePrice, updateSize, updateCategory,updatePicture} from '../../ducks/reducer';
const CLOUDINARY_UPLOAD_PRESET = 'codingstyle_signed';
const CLOUDINARY_UPLOAD_URL='https://api.cloudinary.com/v1_1/djsmw5c9x/image/upload';


class Add_Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      uploadedFileCloudinaryUrl:''
    };
  }

  addProduct = () => {
    let newProduct = {
        name: this.props.name,
        price: this.props.price,
        size: this.props.size,
        category: this.props.category,
        picture: this.state.uploadedFileCloudinaryUrl,
    };
    axios.post('/api/admin/products', newProduct).then( res => {
      alert('Add Product', res.data);
    })
    
  }
  handleImageUpload = (file) => {
            axios.get('/api/upload').then(response => {
                console.log(response.data.signature)
  
    
            let formData = new FormData();
            formData.append("signature", response.data.signature)
            formData.append("api_key", "314668178757937");
            formData.append("timestamp", response.data.timestamp)
            formData.append("file", file[0]);
  
    
   
            axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
                console.log("AXIOS POST RESPONSE",response.data);
    
                    this.setState({
                        uploadedFileCloudinaryUrl: response.data.secure_url
                    })
                }).catch( err => {
                    console.log(err);
                }) 
            })
        }     
  
  
  render() {
    let selectStyle = {
      height: 30,
      width: 300,
      fontSize: 20,
    }
    console.log("cloudinary response",this.state.uploadedFileCloudinaryUrl);
    const { updateName, updatePrice, updateSize, updateCategory,updatePicture} = this.props;
    return (
      <Paper style={{width: 500, margin: '0 auto'}}>
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
          <select style={selectStyle} value={this.props.size} onChange={(e)=> updateSize(e.target.value)}>
          <option value="default">SIZE</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Extra Large</option>
          </select>
        </label>
        <label>
          <br/><br/>
          <select style={selectStyle} value={this.props.category} onChange={(e)=> updateCategory(e.target.value)} > 
            <option value="default">CATEGORY</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </label>
        <br/><br/>
        <label>
        <div className='upload-form'>
            
            <input style={selectStyle} type='file' onChange={(e) => this.handleImageUpload(e.target.files)} />
            
          
            </div>
          </label>
          <input style={selectStyle} type="submit" value="Submit" className='btn-grad' style={{position: 'relative', bottom:-10}}/>
        </form>
        <br/>
      </div>
      </Paper>
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


          
        
      
