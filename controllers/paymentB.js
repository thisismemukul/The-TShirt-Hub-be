const braintree = require("braintree");

// const gateway = new braintree.BraintreeGateway({
//     environment: braintree.Environment.Sandbox,
//     merchantId: "y4mkpbbg4mzqndqx",
//     publicKey: "hfz8gnm6krfvp2wm",
//     privateKey: "0452adab9e8c162e2c28d5ece82da820"
// });


let gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: 'y4mkpbbg4mzqndqx',
    publicKey: 'hfz8gnm6krfvp2wm',
    privateKey: '0452adab9e8c162e2c28d5ece82da820'
});


exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send(response);
        }
    });
};
exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;

    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,

            options: {
                submitForSettlement: true
            }
        },
        function(err, result) {
            if (err) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
};