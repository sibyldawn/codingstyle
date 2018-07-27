module.exports={
    getmen: (req,res)=>{
        const db=req.app.get('db')
        db.get_men_products()
        .then(products => {
            // console.log('Men Product', products);
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
            // console.log('Women Product', products);
            res.status(200).send(products);
        }).catch( error => {
            res.status(500).send("Error on the server");
            console.log('-----------GET WOMEN ERROR', error);
        })
    },
    getAll: (req,res) => {
        const db=req.app.get('db')
        db.get_all_products()
        .then( products => {
            // console.log('-------ALL PRODUCTS',products);
            res.status(200).send(products);
        }).catch( error => {
            res.status(500).send("Error on the server");
            console.log('------get ALL Error', error);
        })
    },
    create:(req,res) => {
        const { name,price,size,category,picture } = req.body;
        const db=req.app.get('db');
        db.add_product([name,price,size,category,picture])
        .then(newItem => {
            console.log('------add item: ',newItem);
            res.status(200).send(newItem);
        }).catch(error => {
            console.log('----create Error', error);
            res.status(500).send('Unable to Add Item');
        })
        

    },
    update: (req,res) => {
        const db=req.app.get('db');
        const{ id }=req.params;
        const { price } = req.body;
        db.update_product([price,id])
        .then( updatedItem => {
            console.log('----updatedItem',updatedItem);
            res.status(200).send(updatedItem);
        }).catch( error => {
            console.log('------updateError',error);
            res.status(500).send('Unable to Update Price');
        })

    },
    deleteItem: (req,res) => {
        const{ id }=req.params;
        const db=req.app.get('db');
        db.delete_product([id])
        .then( () => {
            res.status(200).send('Deleted Item!')
        }).catch( error => {
            res.status(500).send('Unable to Delete');
            console.log('------deleteError', error);
        });
    }
}