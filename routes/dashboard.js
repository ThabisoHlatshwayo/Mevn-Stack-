var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
require('../config/passport')(passport);
var Dashboard = require('../models/Dashboard');

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

//get all the books
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Dashboard.find(function (err, dashboards) {
            if (err) return next(err);
            res.json(dashboards);
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized'});
    }
});

//get a single book by id
router.get('/:id', function(req, res, next) {
    Dashboard.findById(req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

//save a book
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res){
    var token = getToken(req.headers);
    if (token) {
        Dashboard.create(req.body, function (err, post) {
            res.json(post);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'});
    }
});

//update a book
router.put('/:id', function(req, res, next) {
    Dashboard.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

//delete a book
router.delete('/:id', function(req, res, next) {
    Dashboard.findByIdAndRemove(req.params.id, req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;