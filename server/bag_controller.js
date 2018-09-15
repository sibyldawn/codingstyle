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
        res.status(500).send('No Order History Found');
   })
 },
 orderConfirmation: (req,res) => {
     const { orderId } = req.params;
       console.log(orderId)
     const db=req.app.get('db');
     db.order_confirmation(orderId).then( order => {
           console.log("order confirmation", order);
         res.status(200).send(order);
     }).catch( error => {
         res.status(500).send('Order Confirmation Error')
     })

 },
 orderHistory: (req,res)=> {
    const db = req.app.get('db');
    const {userId} = req.params;
    db.view_order_history(userId)
    .then(products => {res.status(200).send(products)
    }).catch( error => {
       res.status(500).send("ERROR");
         console.log('-------readProducts ERROR',error);
   })
}
}