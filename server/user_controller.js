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
        
    }
}

