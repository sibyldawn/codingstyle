
import React, { Component } from 'react';
import axios from 'axios';
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

    //axios call to server to request hashed signature
    
            axios.get('/api/upload').then(response => {
                console.log(response.data.signature)
            
    //form data for signed uploads
    
            let formData = new FormData();
            formData.append("signature", response.data.signature)
            formData.append("api_key", "314668178757937");
            formData.append("timestamp", response.data.timestamp)
            formData.append("file", file[0]);
    
    //form data for unsigned uploads
    
            // let formData = new FormData();
            // formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            // formData.append("file", file[0]);
            
    
    // uncomment to see what the form looks like in console
    
            // for(var pair of formData.entries()) {
            //     console.log(pair); 
            //  }
    
    //axios call to cloudinary using the URL set at top of page
            axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
                console.log("AXIOS POST RESPONSE",response.data);
    
    // Setting state with the secure_url
                    this.setState({
                        uploadedFileCloudinaryUrl: response.data.secure_url
                    })
                }).catch( err => {
                    console.log(err);
                }) 
            })
        }     
  
  
  render() {
    console.log("cloudinary response",this.state.uploadedFileCloudinaryUrl);
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
          <option value="default">SIZE</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Extra Large</option>
          </select>
        </label>
        <label>
          <br/><br/>
          <select value={this.props.category} onChange={(e)=> updateCategory(e.target.value)} > 
            <option value="default">CATEGORY</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </label>
        <br/><br/>
        <label>
        <div className='upload-form'>
            
            <input type='file' onChange={(e) => this.handleImageUpload(e.target.files)} />
            
          
            </div>
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


          
        
      
