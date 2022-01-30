const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { signup, signout, signin, isSignedIn } = require("../controllers/auth");

router.post("/signup", [
    check('name', 'First Name must be at least 3 characters long and Must contain alphabatic characters.').isLength({ min: 3 }).matches(/[A-Z a-z]{1,32}/, ),
    check('username', 'Username Must contain at least 3 or more alphabatic or numeric characters,Capital letters not acceptable.').isLength({ min: 3 }).matches(/^[a-z\d._]{3,}$/, ),
    check('email', 'Email must contain @ and at least 2 or more characters like .co, .in, .com, etc.').isEmail().matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/, ),
    check('phone', 'Phone should be of 10 digits').isMobilePhone().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, ),
    check('password', 'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character.').isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/, ),
], signup);
router.post("/signin", [
    check('email', 'Email must contain @ and at least 2 or more characters like .co, .in, .com, etc.').isEmail().matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/, ),
    check('password', 'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character.').isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/, ),
], signin);
router.get("/signout", signout);
router.get("/testroute", isSignedIn, (req, res) => {
    res.send("A protected");
});

module.exports = router;