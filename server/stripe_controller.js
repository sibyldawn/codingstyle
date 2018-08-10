require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRETKEY)

module.exports = {
    paymentAPI(req,res){
    const { source,currency,amount,acct,email } = req.body

    stripe.charges.create({source, currency, amount}, {stripe_account:acct}, (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).send({error: stripeErr})
        } else {
            const {id} = req.session.user;
            const amount = (req.session.user.total/100)
            console.log("AMOUNT", amount)
            const cart = JSON.parse(localStorage.getItem('cart'));
            console.log("NEW ORDER", req.session.user)
            console.log("cart", cart);

            cart.map((e) => {
                req.app.get('db').add_to_bag([e.id,e.qty,id]).then(orders => {
                    res.status(200).send(orders)
                    console.log("STRIPE PURCHASE", orders)
                }).catch(error => {
                    console.log("STRIPE CONTROLLER ERROR", error);
                })
            })
            
        }
    
    })
 }
}