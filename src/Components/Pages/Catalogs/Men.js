import React, { Component } from 'react';
import './Men.css';
import axios from 'axios';
import menHeader from '../../../Assets/Men.png';
import ProductView from '../../Pages/ProductView';
import ProductModal from '../Modal/ProductModal';


export default class Men extends Component {
    constructor(props){
        super(props);

        this.state={
            men:[],
            
        }
    }

    componentDidMount(){
        axios.get('/api/products/Men').then( response => {
            console.log('--------getMen', response.data)
            this.setState({
                men:response.data
            })
        })
    }
    
   

    render() {
        
        const men = this.state.men.map( r => {
            return <div className="product-box" key={r.id}>
                <div className="image"><img src={r.picture}/></div>
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
            
             {men}
             
            </div>
          </div>
        </div>
        )
    }
}
 
