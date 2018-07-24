const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.get('/auth/callback', (req,res) => {
    exchangeCodeForAccessToken()
    .then(exchangeAccessTokenForUserInfo)
    .then(fetchAuth0AccessToken)
    .then(fetchFBAccessToken)
    .then(setFBTokenToSession)
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

        const payload = {
            grant_type: 'client_credentials',
            client_id: process.env.AUTH0_API_CLIENT_ID,
            client_secret: process.env.AUTH0_API_CLIENT_SECRET,
            audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`
        };
        console.log('payload', payload);
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
    }

    function fetchFBAccessToken(auth0AccessTokenResponse){
        console.log('auth0AccessTokenResponse', auth0AccessTokenResponse);
        const options = {
            headers: {
                authorization: `Bearer ${auth0AccessTokenResponse.data.access_token}`
            }
        };
        return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${req.session.user.sub}`,options);
    }

    function setFBTokenToSession(FBAccessTokenResponse){
        console.log('FBAccessTokenResponse',FBAccessTokenResponse);
        const FBIdentity = FBAccessTokenResponse.data.identities[0];
        req.session.FBAccessToken = FBIdentity.access_token;
        res.redirect('/');
    }
})


const PORT = 4000;
app.listen(PORT, () => { console.log(`Server listening to port ${PORT}`);});