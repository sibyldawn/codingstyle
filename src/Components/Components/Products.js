import React, { Component } from 'react';
import axios from 'axios';
import '../Pages/Catalogs/Men.css';



export default class Men extends Component {
    constructor(props){
        super(props);

        this.state={
           products:[],
           price:0,
            
        }
    }

    componentDidMount(){
        axios.get('/api/products').then( response => {
            console.log('--------getAll', response.data)
            this.setState({
                products:response.data
            })
        })
    }
    
    handleChange = (val) => {

        this.setState({
            price: val
        })
    }

    updatePrice = (id) => {
        const {price, products} = this.state;
        console.log("sending", id, price)
        axios.put(`/api/admin/products/${id}`, {price}).then(response =>{
        console.log('responseUpdate', response);
        products.push(response.data)
        console.log('products',products)
        return 
        this.setState({
            products:products
        })
        
        })
    }
   

    render() {
        let styles = {
            height: 400,
            width:400
        }
        const products = this.state.products.map( r => {
            return <div className="product-box" key={r.id}>
                <div><img src={r.picture} height={200} width={200}/>
                </div>
                <div><p>{r.name}</p></div>
                <span><h4>Price:</h4><input defaultValue={r.price} onChange={(e)=> this.handleChange(e.target.value)} width={20}></input>
                    <button onClick={()=> this.updatePrice(r.id)}>UPDATE PRICE</button>
                </span>
                </div>
    
        })
        return (
         <div>
           <div className="grid-body">
            <div className="grid-container">
            
             {products}
             
            </div>
          </div>
        </div>
        )
    }
}
 
