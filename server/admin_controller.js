module.exports={

    read: (req,res)=>{
    const db = req.app.get('db');

       db.get_all_products()
       .then(products => res.status(200).send(products))
       .catch( error => {
           res.status(500).send("ERROR");
           console.log('-------readProducts ERROR',error);
       })
    }
}