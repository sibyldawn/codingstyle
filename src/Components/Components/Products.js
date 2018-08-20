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
   
    deleteProduct = (id) => {
        console.log("sending delete", id);
        axios.delete(`/api/products/${id}`).then(response => {
            axios.get('/api/products').then(response=>{
                this.setState({
                    products: response.data
                   })
            }).catch(error => {
                console.log("DELETE ERROR", error);
        })
     })
   }

    render() {
        let styles = {
            height: 500,
            width:400
        }

        let inputStyle = {
            marginTop:10,
            marginLeft: 20,
            marginBottom: 20,
            fontSize: 20,
            width: 100,
            display:'inline',
        }
        const products = this.state.products.map( r => {
            return <div className="product-box" key={r.id}>
                <div><img src={r.picture} height={250} width={300}/>
                </div>
                <div><p>{r.name}</p></div>
                <span>Price: $<input defaultValue={r.price} onChange={(e)=> this.handleChange(e.target.value)} style={inputStyle}></input></span>
                    <button className="btn-grad" onClick={()=> this.updatePrice(r.id)}>UPDATE PRICE</button>
                    <button className="btn-grad" onClick={()=> this.deleteProduct(r.id)}>DELETE</button>
                
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
 
