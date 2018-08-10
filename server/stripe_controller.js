require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRETKEY)

module.exports = {
    paymentAPI(req,res){
    const { source,currency,amount,email } = req.body

    stripe.charges.create({source, currency, amount}, (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).send({error: stripeErr})
        } else {
            // const {id} = req.session.user;
            // console.log("AMOUNT", amount)
            // const cart = req.session.user.cart;
            // const total = req.session.user.total;
            // console.log("NEW ORDER", req.session.user)
            // console.log("cart", cart)

            // //SEND NEW ORDER TO DATABASE
            // req.app.get('db').add_to_bag([cart,total,id]).then(order => {
            //     res.status(200).send(order)
            //     console.log(order);
            // }).catch(error => {
            //     console.log("PAYMENT API ERROR",error);
            //     res.status(500).send("Unable to Save Order!")
            // })
        }
    
    })
 }
}