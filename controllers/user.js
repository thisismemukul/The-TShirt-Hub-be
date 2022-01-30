const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    //get back here for password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};
exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true, useFindAndModify: false },
        (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "You are not authorized to update info."
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
    )
};
exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err || !users) {
            return res.status(400).json({
                error: "No users were found in DB"
            });
        }
        res.json(users);
    })
};
exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No orders in this account"
                })
            }
            return res.json(order)
        })
};
exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.ammount,
            transaction_id: req.body.order.transaction_id
        });
    });
    //store this in db
    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { purchases: purchases } }, { new: true },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save purchase List"
                })
            }
            next();
        }
    )
};