const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const massive = require('massive');
const uC = require('./user_controller');
const aC = require('./admin_controller');
const pC = require('./product_controller');
const cC = require('./cart_controller');
const oC = require('./orders_controller');
const stripe_ctrl = require('./stripe_controller');
require('dotenv').config();

//CONNECT TO DATABASE
massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db',db)
}).catch(error => console.log('massive error',error));

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
//AUTH SETUP
app.get('/auth/callback', (req,res) => {
    exchangeCodeForAccessToken()
    .then(exchangeAccessTokenForUserInfo)
    .then(fetchAuth0AccessToken)
    .catch( error => {
        console.log('Auth Error', error);
        res.status(500).send('An error occurred on the server.');
    });

    function exchangeCodeForAccessToken(){
        const payload = {
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `http://${req.headers.host}/auth/callback`
        };
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,payload);
    }

    function exchangeAccessTokenForUserInfo(accessTokenResponse){
        console.log('accessTokenResponse', accessTokenResponse);
        const accessToken = accessTokenResponse.data.access_token;
        return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
    }

    function fetchAuth0AccessToken(userInfoResponse){
        console.log('userInfoResponse',userInfoResponse);
        req.session.user = userInfoResponse.data;
        res.redirect('/');
        
    }
    })
 //FULL CRUD USER
 app.get('/api/products/Men',uC.getmen);
 app.get('/api/products/Women',uC.getwomen);
 app.post('/api/shop',cC.shop);
 app.post('/api/sendTo/:userId',uC.sendTo);
 app.put('/api/shop/:product',cC.update)



 //FULL CRUD ADMIN
 app.get('/api/admin/products',aC.read);

 //SESSIONS
 app.post('/api/logout', (req,res)=>{
     req.session.destroy();
     res.send('Logged Out!')
 })


const PORT = 4000;
app.listen(PORT, () => { console.log(`Server listening to port ${PORT}`);});