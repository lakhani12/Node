const express = require("express");
const {validationResult} = require("express-validator");
const router = exportss.Router();
// register user
// second valication -- use express validator package
router.post('/register',[
    body('username').isLength({min: 4}).withMessage("username must be 4 character long"),
    body('email').isemail({min: 4}).withMessage("enter valid Email"),
    body('password').isLength({min: 6}).withMessage("password must be 6 charactor long"),
]);

module.exports = router;