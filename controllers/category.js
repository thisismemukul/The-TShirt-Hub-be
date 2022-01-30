const Category = require("../models/category");
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found in DB"
            })
        }
        req.category = cate;
        next();
    });
};
exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save Category in DB"
            })
        }
        res.json({ category });
    });
};
exports.getCategory = (req, res) => {
    return res.json(req.category);
};
exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err || !categories) {
            return res.status(400).json({
                error: "No categories were found in DB"
            });
        }
        res.json(categories);
    })
};
// exports.updateCategory = (req, res) => {
//     console.log(req);
//     let category = req.category;
//     category.name = req.category.name;
//     console.log(category);
//     category.save((err, updatedCategory) => {
//         if (err) {
//             return res.status(400).json({
//                 error: 'Failed to update category',
//             });
//         }
//         res.json(updatedCategory);
//     });
// };

// exports.updateCategory = (req, res) => {
//     console.log(req);
//     const category = req.category;
//     const body = req.body;
//     category.name = req.body.name;
//     // console.log("bosy-", body)
//     // console.log("category", category)
//     category.save((err, updatedCategory) => {
//         if (err) {
//             return res.status(400).json({
//                 error: "Failed to update category"
//             });
//         }
//         res.json(updatedCategory)
//     });
// };

exports.updateCategory = (req, res) => {
    const category = req.category;
    if (!category) return res.send("No category found...");
    category.name = req.body.name;
    console.log(category.name);
    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to update category",
            });
        }
        res.json(updatedCategory);
    });
};

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete this category"
            });
        }
        res.json({
            message: `Successfull Deleted ${category}`
        });
    });
};