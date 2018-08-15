import React, { Component } from 'react';
import axios from 'axios';
import '../Pages/Catalogs/Men.css';


export default class Men extends Component {
    constructor(props){
        super(props);

        this.state={
           products:[],
            
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
    
   

    render() {
        let styles = {
            height: 400,
            width:400
        }
        const men = this.state.products.map( r => {
            return <div className="product-box" key={r.id}>
                <div><p>{r.name}</p></div>
                <div><p>Price: ${r.price}</p></div>
                <div><ProductView
                            name={r.name}
                            category={r.category}
                            price={r.price}
                            picture={r.picture}
                /></div>

                </div>
        })
        return (
         <div>
             <div className="top">
                <img className="large" src={ menHeader }/>
            </div>
           <div className="grid-body">
            <div className="grid-container">
            
             {products}
             
            </div>
          </div>
        </div>
        )
    }
}
 
