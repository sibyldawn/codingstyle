import React, { Component } from 'react';
import axios from 'axios';

export default class CheckoutForm extends Component {
    constructor(){
        super();

        this.state={
            user: {},
        }
    }

    componentDidMount(){
        axios.get('/api/user/session').then(user => {
            console.log("=====userLogin",user);
        this.setState({
            user: user.data,
            cart: JSON.parse(localStorage.getItem('cart'))
        })
     })
    }

    login(){
     const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);

     window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    }
    
    logout(){
        axios.post('/api/logout').then(response => {
            this.setState({
                user:''
            })
        })
    }


    render() {
        return (
            <div className="wrap">
             <h1>THIS IS THE CHECKOUT PAGE!</h1>
            </div>
        )
    }
}