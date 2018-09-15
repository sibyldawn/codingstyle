import React, { Component } from 'react';
import './Men.css';
import loading from '../../../Assets/load.gif';
import axios from 'axios';
import menHeader from '../../../Assets/Men.png';
import ProductView from '../../Pages/ProductView';


export default class Men extends Component {
    constructor(props){
        super(props);

        this.state={
            men:[],
            isLoading: true,
        }
    }

    componentDidMount(){
        axios.get('/api/products/Men').then( response => {
              console.log('--------getMen', response)
            setTimeout(()=>this.setState({
                men:response.data,
                isLoading: false,
            }),2000)
        })
    }
    
   

    render() {
        let styles = {
            maxWidth: '100%',
            height: '350px',
            margin:'auto',
        }

        let loaderStyle = {
            marginTop: 200,
            marginLeft:'45%',
        }
        const menShirts = this.state.men.map( r => {
            return <div className="product-box" key={r.id}>
                <div className="gallerypic">
                <img src={r.picture} style={styles} alt="T-shirt Model"/>
                </div>
                <div className="info">
                <div><p>{r.name}</p></div>
                <div><p>Price: ${r.price}</p></div>
                <div><ProductView
                            name={r.name}
                            category={r.category}
                            price={r.price}
                            picture={r.picture}
                />
                </div>
                </div>
                </div>
        })
        return (
         <div>
             <div className="top">
                <img className="large" src={ menHeader } alt="Men T-shirt Model"/>
            </div>
           <div className="grid-body">
            <div>
            {this.state.isLoading === true ? 
                        <img src={loading} style={loaderStyle} alt="loading"/> : 
                 <div className="grid-container">
                     {menShirts}
                </div> }
            </div>
          </div>
        </div>
        )
    }
}
 
