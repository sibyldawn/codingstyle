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
const cloudinary = require('cloudinary');
const nodemailer = require('nodemailer');
require('dotenv').config();

//CONNECT TO DATABASE
massive(process.env.CONNECTION_STRING).then(db => {
      console.log('Connected to Database');
    app.set('db',db)
}).catch(error =>   console.log('massive error',error));

const app = express();
app.use(express.static(`${__dirname}/../build`));
app.use(bodyParser.json());
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

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
            redirect_uri: `https://${req.headers.host}/auth/callback`
        };
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,payload);
    }

    function exchangeAccessTokenForUserInfo(accessTokenResponse){
        //   console.log('accessTokenResponse', accessTokenResponse);
        const accessToken = accessTokenResponse.data.access_token;
        return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
    }

    function storeUserInfoInDatabase(userInfoResponse){
          console.log('userInfoResponse',userInfoResponse);
        const auth0id = userInfoResponse.data.sub;
        const db = req.app.get('db');
        return db.find_user(auth0id).then( users => {
              console.log('-----users',users);
            if(users.length){
                const user = users[0];
                req.session.user = user;
                  console.log("USER SESSION",req.session.user)
                res.redirect('/Redirect');
            }else{
                const createUserData = [
                    auth0id,
                    userInfoResponse.data.given_name,
                    userInfoResponse.data.family_name,
                    userInfoResponse.data.picture,
                    userInfoResponse.data.email,
                
                    
                 ];
                   console.log('----createUserData',createUserData);
                 return db.add_user(createUserData).then( newUsers => {
                     const user = newUsers[0];
                     req.session.user = user;
                       console.log("USER SESSION",req.session.user)
                     res.redirect('/Redirect');
                 })
                }
            })
        }   
})

 //Session Controller
app.get('/api/user/session', uC.getSession)
app.get('/api/user/shipping',uC.findAddress)
app.post('/api/user/shipping/:user_id',uC.addShipping)
app.post('/api/user/cartSession',uC.cartToSession)
app.get('/api/user/userdetails/:userId',uC.userdetailsbyID)
app.get('/api/user/:authId',uC.findUser)
app.post('/api/user/totalSession',uC.totalToSession)
app.post('/api/user/userinfo/:userId',uC.addName)
app.post('/api/logout', (req,res)=>{
    req.session.destroy();
    localStorage.clear();
    res.send('Logged Out!')
})



//Admin Controller
app.get('/api/admin/orders', aC.readAllOrders)
app.post('/api/email', (req,res) => {
    const { email, first_name, date, total, orderId, address, city, state,zipcode } = req.body;
    const transporter = nodemailer.createTransport({
        service:'yahoo',
        auth:{
            user:'sib_codingstyleshop@yahoo.com',
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const mailOptions =  {
        from: '"CodingStyleShop👕" <sib_codingstyleshop@yahoo.com',
        to: String(email),
        subject: "Order Confirmation",
        html: `<h1>Hi ${first_name}!</h1><p>Thank you for your recent purchase from CodingStyleShop.com!</p><br><h2>Order Details</h2><hr><p>Purchase Date: ${date}</p><p>Order Number: ${orderId}</p><p>Total:$ ${total}</p><br><h2>Shipping Information:</h2><hr><p>${address}<br>${city},${state}<br>${zipcode}</p><br><p>We are now processing your order, please allow 5-7 business days for delivery.</p><br><p>Thank you!</p><br><p>-From us at CodingStyleShop.com</p>`
    }
    transporter.sendMail(mailOptions,(error,info) => {
        if(error){
            return   console.log('NODEMAILER ERROR',error);
        }else{
            return   console.log('EMAIL SENT' + info.response);
        }
    })
})

 //Products Controller
 app.get('/api/products/Men',pC.getmen);
 app.get('/api/products/Women',pC.getwomen);
 app.get('/api/products',pC.getAll);
 app.get('/api/findproduct',pC.findProduct);
 app.post('/api/admin/products',pC.create);
 app.get('/api/products',pC.getProduct);
 app.put('/api/admin/products/:productname',pC.update);
 app.delete('/api/products/:productname',pC.deleteItem);

//Bag_Controller
app.get('/api/bag/:userid',bC.read);
app.post('/api/bag/', bC.add);
app.get('/api/user/orderhistory/:userId',bC.orderHistory)
app.get('/api/orderconfirmation/:orderId',bC.orderConfirmation );



//Cloudinary Endpoint

app.get('/api/upload', (req, res) => {

   
        const timestamp = Math.round((new Date()).getTime() / 1000);
    
    
        const api_secret  = process.env.CLOUDINARY_API_SECRET;
    
   
        const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);
    
   
        const payload = {
            signature: signature,
            timestamp: timestamp
        };
            res.json(payload);
    })

//STRIPE
app.post('/api/payment',stripe_ctrl.paymentAPI)
    

  

const path = require('path')
app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})


const PORT = 4000;
app.listen(PORT, () => {   console.log(`Server listening to port ${PORT}`);});