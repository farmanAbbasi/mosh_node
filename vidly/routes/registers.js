const { Register, validate } = require('../models/register');
const mongoose = require('mongoose');
const express = require('express');
 const router = express.Router();
// const jwt = require('jsonwebtoken');

const _ = require('lodash')

router.get('/', async (req, res) => {
    const users = await Register.find();
    res.send(users);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //now checking is user is already registered
    let newRegistration = await Register.findOne({ email: req.body.email})
    if(newRegistration) return res.status(400).send('User already Registered..');

    newRegistration = new Register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const result = await newRegistration.save()

    //res.send(result)
    //note: it sends the password as well to avoid that
    //use
    // res.send({
    //     name:result.name,
    //     email:result.email
    // })
    //or use lodash to pick what you want
    //res.send(_.pick(newRegistration,['_id','name','email'])) 
    //or if on signup u want to redirect to the page after login is successful
    //use this
    const token = newRegistration.generateAuthToken()
    res.header('x-auth-token-me',token).send(_.pick(newRegistration,['_id','name','email']))
});

module.exports = router;
