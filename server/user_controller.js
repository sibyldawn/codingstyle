module.exports = {
    getSession: (req,res) => {
          console.log('-------req.session.user', req.session.user);

        res.status(200).json(req.session.user);
    },

    addShipping:(req,res) => {
        const { user_id} = req.params;
        const {address,city,state,zipcode } = req.body;
        const db=req.app.get('db');
        db.add_shippingInfo([user_id,address,city,state,zipcode])
        .then(addedInfo => {
              console.log('------add address: ',addedInfo);
            res.status(200).send(addedInfo);
        }).catch(error => {
              console.log('----create Error', error);
            res.status(500).send('Unable to Add Shipping Info');})
        
    },
    findAddress:(req,res) => {
        const {user_id} = req.query;
          console.log(req.query)
        const db=req.app.get('db');
        db.find_address([user_id]).then(address => {
              console.log('SAVED ADDRESS', address);
            res.status(200).send(address);
        }).catch(error => {
              console.log('--------find address error',error);
            res.status(500).send('No address found')
        })
    },
    cartToSession: (req,res) => {
          console.log("REQ.BODY",req.body)
        const {id} = req.session.user;
        const cart = JSON.stringify(req.body.cart);
        let total = req.body.total;
        total = parseFloat(total)
          console.log("======>SESSION.USER", req.session.user);
          console.log("cart", cart, total)
        req.app.get('db').add_to_bag([cart,total,id]).then(order => {
            res.status(200).send(order)
              console.log(order);
        }).catch(error => {
              console.log("PAYMENT API ERROR",error);
            res.status(500).send("Unable to Save Order!")
        })
        // res.end()
    },
    totalToSession: (req,res) => {
          console.log("REQ.BODY",req.body)
        req.session.user.total = req.body.total
          console.log("======>SESSION.USER", req.session.user);

        const {id} = req.session.user;
            //   console.log("localStorage", localStorage)
            const cart = req.session.user.cart;
            const total = req.session.user.total;

              console.log("NEW ORDER", req.session.user)
              console.log("cart", cart, total)

            //SEND NEW ORDER TO DATABASE
            req.app.get('db').add_to_bag([cart,total,id]).then(order => {
                res.status(200).send(order)
                  console.log(order);
            }).catch(error => {
                  console.log("PAYMENT API ERROR",error);
                res.status(500).send("Unable to Save Order!")
            })
        // res.end()
    },
    userdetailsbyID:(req,res) => {
        const {userId} = req.params;
        const db=req.app.get('db');
        db.find_user_shippingInfo(userId).then(user => res.status(200).send(user))
        .catch(error =>   console.log(error));
    },
    findUser:(req,res)=> {
        const {authId} = req.params;
        const db=req.app.get('db');
        db.find_user(authId).then(user =>
        res.status(200).send(user))
        .catch(error =>   console.log("Unable to find user", error));
    },
    addName:(req,res) => {
        const {userId} = req.params;
        const { first_name,last_name } =req.body;
        const db=req.app.get('db');
        db.add_name([first_name,last_name,userId]).then(user =>
        res.status(200).send(user))
        .catch(error =>   console.log(error));
    }
}

