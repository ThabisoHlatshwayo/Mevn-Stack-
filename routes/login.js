router.post('/login', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'The user is not found'});
        } else {
            //check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    //if the is found and password is right create a token 
                    var token = jwt.sign(user.toJSON(), settings.secret);
                    //return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Wrong password.'});
                }
            });
        }
    });
});

module.exports = router;