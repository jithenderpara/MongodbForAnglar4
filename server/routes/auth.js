
var utils = require('../utils/util');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config');

exports.login_new = function(req, res, next) {
    // find the user
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }
        if (!user) {
            res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
        } else if (user) {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign({ data: user }, config.secret, {
                        expiresIn: config.tokenexp
                    });
                    var last_login = user.lastlogin;
                    // login success update last login
                    user.lastlogin = new Date();
                    user.save(function(err) {
                        if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }
                        
                        res.status(201).json({
                            success: true,
                            message: {
                                'userid': user._id,
                                'username': user.username,
                                'firstname': user.firstname,
                                'lastlogin': last_login,
                                'screen_name': user.group_name
                            },
                            token: token
                        });
                    });
                } else {
                    res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
                }
            });
        }
    });
}

exports.signup = function(req, res, next) {
    // Check for registration errors
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const group_name = req.body.group_name;

    if (!firstname || !lastname || !email || !username || !password || !group_name) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incomplete.' });
    }

    User.findOne({ username: username }, function(err, existingUser) {
        if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(201).json({
                success: false,
                message: 'Username already exists.'
            });
        }

        // If no error, create account
        var oUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password,
            group_name: group_name
        });

        oUser.save(function(err, oUser) {
            if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }

            res.status(201).json({
                success: true,
                message: 'User created successfully, please login to access your account.'
            });
        });
    });
}


exports.login = function(req, res, next) {
     var user ={
    firstName: "jithender",
    lastName:  "jithender",
    email:      "jithender",
    data:      "jithender" || {}
};
    utils.createUserSession(req, res, user);
        res.send("register..")
}
exports.checksession = function(req, res, next) { 
    if(req.session.user) 
        res.send(req.session.user)
    else{
         res.send({msg:"session expired!"})
    }
}
exports.logout = function(req, res, next) { 
       // utils.createUserSession(req, res, req.session.user); 
        res.send("user sucessfully logout")
}