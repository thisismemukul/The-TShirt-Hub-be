const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');
exports.makePayment = (req, res) => {
    const { products, token } = req.body;
    console.log("PRODUCT", products);
    let amount = 0;
    products && products.map(product => {
        amount = amount + product.price;
    });
    const idempotencyKey = uuidv4();
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
                amount: amount * 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: `purchase successful`,
                // shipping: {
                // name:token.card.name,
                // }
            }, { idempotencyKey })
            .then(result => res.status(200).json(result))
            .catch(err => console.log(err))
    })

}