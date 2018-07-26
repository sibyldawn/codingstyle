module.exports={
    getmen: (req,res)=>{
        const db=req.app.get('db')
        db.get_men_products()
        .then(products => {
            console.log('Men Product', products);
            res.status(200).send(products);
        }).catch( error => {
            res.status(500).send("Error on the server");
            console.log('-----------GET MEN ERROR', error);
        })
    },
    getwomen: (req,res)=>{
        const db=req.app.get('db')
        db.get_women_products()
        .then(products => {
            console.log('Women Product', products);
            res.status(200).send(products);
        }).catch( error => {
            res.status(500).send("Error on the server");
            console.log('-----------GET WOMEN ERROR', error);
        })
    },
}