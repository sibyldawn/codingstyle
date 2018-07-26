module.exports={

readSessionCart: (req, res) => {
    res.status(200).send(req.session.user.cart)
},

add: (req,res)=>{
    const {date,product_id,qty,user_id} = req.body;
    const db=req.app.get('db')

    db.add_to_bag([date,product_id,qty,user_id]).then( item => {
        console.log('--------item',item);
    }).catch(error => {
        console.log('-----shop error',error);
        res.status(500).send('Failed to Add Item');
    })
 },
 read: (req,res)=>{
     const {userd} = req.query
    const db=req.app.get('db')
    db.get_user_bag([userId])
    .then( bagItems => {
        console.log('------bagItems', bagItems);
    })
 }
}