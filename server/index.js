const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const massive = require('massive');
const uC = require('./user_controller');
const aC = require('./admin_controller');
const pC = require('./product_controller');
const bC = require('./bag_controller');
const stripe_ctrl = require('./stripe_controller');
const sessionVerify = require('./sessionVerify');
require('dotenv').config();

//CONNECT TO DATABASE
massive(process.env.CONNECTION_STRING).then(db => {
    console.log('Connected to Database');
    app.set('db',db)
}).catch(error => console.log('massive error',error));

const app = express();
app.use(express.static(`${__dirname}/../build`));
app.use(bodyParser.json());
// app.use(sessionVerify);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
//AUTH SETUP
app.get('/auth/callback', (req,res) => {
    exchangeCodeForAccessToken()
    .then(exchangeAccessTokenForUserInfo)
    .then(storeUserInfoInDatabase)
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
        // console.log('accessTokenResponse', accessTokenResponse);
        const accessToken = accessTokenResponse.data.access_token;
        return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
    }

    function storeUserInfoInDatabase(userInfoResponse){
        // console.log('userInfoResponse',userInfoResponse.data);
        const auth0id = userInfoResponse.data.sub;
        const db = req.app.get('db');
        return db.find_user(auth0id).then( users => {
            console.log('-----users',users);
            if(users.length){
                const user = users[0];
                req.session.user = user;
                res.redirect('/');
            }else{
                const createUserData = [
                    auth0id,
                    userInfoResponse.data.given_name,
                    userInfoResponse.data.family_name,
                    userInfoResponse.data.picture,
                    userInfoResponse.data.email
                 ];
                //  console.log('----createUserData',createUserData);
                 return db.add_user(createUserData).then( newUsers => {
                     const user = newUsers[0];
                     req.session.user = user;
                     res.redirect('/');
                 })
                }
            })
        }   
})

 //Session Controller
app.get('/api/user/session', uC.getSession)
app.post('/api/logout', (req,res)=>{
    req.session.destroy();
    res.send('Logged Out!')
})

//Admin Controller
app.get('/api/admin/orders', aC.readAllOrders)

 //Products Controller
 app.get('/api/products/Men',pC.getmen);
 app.get('/api/products/Women',pC.getwomen);
 app.get('/api/products',pC.getAll);
 app.post('/api/admin/products',pC.create);
 app.put('/api/admin/products/:productid',pC.update);
 app.delete('/api/products/:productid',pC.deleteItem);

//Bag_Controller
app.get('/api/bag/:userid',bC.read);
app.post('/api/bag/', bC.add);

//Stripe Controller

const path = require('path')
app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})


const PORT = 4000;
app.listen(PORT, () => { console.log(`Server listening to port ${PORT}`);});