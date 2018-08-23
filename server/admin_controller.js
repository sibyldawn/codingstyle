require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports={

    readProducts: (req,res)=>{
    const db = req.app.get('db');

       db.get_all_products()
       .then(products => {res.status(200).send(products)
        }).catch( error => {
           res.status(500).send("ERROR");
           console.log('-------readProducts ERROR',error);
       })
    },
    readAllOrders: (req,res)=> {
        const db = req.app.get('db');
        db.get_orders()
        .then(products => {res.status(200).send(products)
        }).catch( error => {
           res.status(500).send("ERROR");
           console.log('-------readProducts ERROR',error);
       })
    },
    // sendConfirmation:(req,res) => {
    //     const { email, first_name, date, total, orderId, address, city, state,zipcode } = req.body;
    //     const transporter = nodemailer.createTransport({
    //         service:'gmail',
    //         secure:false,
    //         port:25,
    //         auth:{
    //             user:'sibylcodingstyleshop@gmail.com',
    //             pass: `${process.env.EMAIL_PASSWORD}`
    //         },
    //         tls:{
    //             rejectUnauthorized:false
    //         }
    //     })
    //     const mailOptions =  {
    //         from: '"CodingStyleShop👕" <sibylcodingstyleshop@gmail.com>',
    //         to: String(email),
    //         subject: "Order Confirmation",
    //         html: `<h1>Hi ${first_name}, thank you for your recent purchase from CodingStyleShop.com!</h1><br><h2>Order Details</h2><hr><p>Purchase Date: ${date}</p><p>Order Number: ${orderId}</p><p>Total: ${total}</p><br><h2>Shipping Information:</h2><hr><p>${address}<br>${city},${state}<br>${zipcode}</p><br><p>We are now processing your order, please allow 5-7 business days for delivery.</p><br><p>Thank you!</p><br><p>-From us at CodingStyleShop.com</p>`
    //     }
    //     transporter.sendMail(mailOptions,(error,info) => {
    //         if(error){
    //             return console.log('NODEMAILER ERROR',error);
    //         }else{
    //             return console.log('EMAIL SENT' + info.response);
    //         }
    //     })
    // }
}