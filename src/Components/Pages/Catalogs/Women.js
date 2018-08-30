import React, { Component } from 'react';
import './Men.css';
import axios from 'axios';
import loading from '../../../Assets/load.gif';
import WomenHeader from '../../../Assets/Women.png';
import ProductView from '../../Pages/ProductView';


export default class Women extends Component {
    constructor(props){
        super(props);

        this.state={
            women:[],
            isLoading: true,
        }
    }

    componentDidMount(){
        axios.get('/api/products/Women').then( response => {
            console.log('--------getWomen', response.data)
            setTimeout(()=>this.setState({
                women:response.data,
                isLoading: false,
            }),2000)
        })
    }

    
    render() {
        let styles = {
            height: '100%',
            marginLeft: -8,
        }
        let loaderStyle = {
            marginTop: 200,
            marginLeft:'45%',
        }
        const women = this.state.women.map( r => {
            return <div className="product-box" key={r.id}>
                <div className="gallerypic">
                <figure style={{height:'100%'}}>
                <img src={r.picture} style={styles}/>
                </figure></div>
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
                <img className="large" src={ WomenHeader }/>
            </div>
           <div className="grid-body">
           <div>
           {this.state.isLoading === true ? 
                        <img src={loading} alt="loading" style={loaderStyle}/> : 
                 <div className="grid-container">
                     {women}
                </div> }
            </div>
          </div>
        </div>
        )
    }
}
 
