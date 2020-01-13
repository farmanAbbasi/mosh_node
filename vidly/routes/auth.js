const { Register } = require('../models/register');
const mongoose = require('mongoose');
const Joi=require('joi');
const express = require('express');
const router = express.Router();
//const jwt=require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
 
    //if user is not found
    let user = await Register.findOne({ email: req.body.email})
    if(!user) return res.status(400).send('Invalid email or password..');
     
    //note not using hashing for simplicity
    if(user.password!==req.body.password){
        return res.status(400).send('Invalid email or password...');
    }
    else{
       // res.send({name:user.name})
       //since we are authticated we will send jwt
       //const token = jwt.sign({_id:user._id},'mySecretKey')
       const token =user.generateAuthToken();
       res.send(token)
    }
});

function validateLogin(reqObj) {
    const schema = {
        email:Joi.string().min(5).max(255).email().required(),
        password:Joi.string().min(5).max(255).required()
    };
    return Joi.validate(reqObj, schema);

}

module.exports = router;
