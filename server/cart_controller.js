module.exports={
shop: (req,res)=>{
    const {date,product_id,qty,user_id} = req.body;
    const db=req.app.get('db')

    db.add_to_bag([date,product_id,qty,user_id]).then( item => {
        console.log('--------item',item);
    }).catch(error => {
        console.log('-----shop error',error);
        res.status(500).send('Failed to Add Item');
    })
 }
}