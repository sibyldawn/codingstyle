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
            console.log('------get ALL Error');
        })
    },
    findProduct: (req,res) =>{
        const db=req.app.get('db');
        // const { name,size,category} = req.body;
        const { name, size, category} = req.query
        db.find_product([name, size, category])
        .then(product => {
            console.log('product found', product);
            res.status(200).send(product);
        }).catch(error => {
            console.log('----getProduct', error );
            res.status(500).send('Product not found');
        })
    },
    getProduct: (req,res) =>{
        const db=req.app.get('db')
        const { name,category } = req.query;
        console.log(name,category)
        db.get_product([name,category])
        .then(product => {
            console.log('product found', product);
            res.status(200).send(product);
        }).catch(error => {
            console.log('----getProduct', error );
            res.status(500).send('Product not found');
        })
    },


    create:(req,res) => {
        const { name,price,size,category,picture } = req.body;
        const db=req.app.get('db');
        db.add_product({name,price,size,category,picture})
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
        const { price } = req.body;
        console.log(req.params);
        const{ productname }=req.params;
        db.update_product([price,productname])
        .then( response => {
            console.log('----updatedItem',response);
            res.status(200).send(response);
        }).catch( error => {
            console.log('------updateError',error);
            res.status(500).send('Unable to Update Price');
        })

    },
    deleteItem: (req,res) => {
        const{ productname }=req.params;
        const db=req.app.get('db');
        db.delete_product([productname])
        .then( response => {
            res.status(200).send(response)
        }).catch( error => {
            res.status(500).send('Unable to Delete');
            console.log('------deleteError', error);
        });
    }
}