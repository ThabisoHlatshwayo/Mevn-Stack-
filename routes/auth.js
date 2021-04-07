var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/setting');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/User');

router.post('/register', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        //save the users credentials
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'The user already exists.'});
            }
            res.json({success: true, msg: 'Successfully added a new user.'})
        });
    }
});