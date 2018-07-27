module.exports={

add: (req,res)=>{
   
    const {date,product_id,qty,user_id} = req.body;
    const db=req.app.get('db')
    
    db.add_to_bag([date,product_id,qty,user_id]).then( item => {
        console.log('--------item',item);
        res.status(200).send(item);
    }).catch(error => {
        console.log('-----shop error',error);
        res.status(500).send('Failed to Add Item');
    })
 },
 read: (req,res)=>{
    const {userid} = req.params;
    const db=req.app.get('db');
    db.get_user_bag([userid])
    .then( bagItems => {
        console.log('------bagItems', bagItems);
        res.status(200).send(bagItems);
    }).catch(error => {
        res.status(500).send('Error Fetching Bag',error);
   })
 }
}