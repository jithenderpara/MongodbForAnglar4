var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var session = require('client-sessions');
//var mail = require("./services//sendmail");
// var middleware = require('./middleware');
var config = require('../config');
var port = config.serverport || 5000;
var mongoose = require('mongoose');

mongoose.connect(config.database, function(err) {
    if (err) {
        console.log('Error connecting database, please check if MongoDB is running.');
    } else {
        console.log('Connected to database...');
    }
});
var user = require('../routes/auth');

module.exports.createApp = function () {
    var app = express();
    //Middlewares
   var utils = require('./util');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(session({
        cookieName: 'session', // cookie name dictates the key name added to the request object
        secret: 'ytdabtasokjmnnesukeoamcewlikdsnajsyhsgjls', // should be a large unguessable string
        duration: 24 * 60 * 1000,
        activeDuration: 1000 * 60 * 1, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
        cookie: {
        path: '/', // cookie will only be sent to requests under '/api' 
        maxAge: 1000 * 60 * 1, // duration of the cookie in milliseconds, defaults to duration above 
        ephemeral: false, // when true, cookie expires when the browser closes 
        httpOnly: true, // when true, cookie is not accessible from javascript 
        secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process 
    }
    }));

    app.use(express.static(path.join(__dirname, '../../dist')));
    app.get('/login', user.login);
    app.post('/login', user.login_new);
    app.post('/register', user.signup);
    app.get('/checksession', user.checksession);
    app.get('/logout', user.logout);
    
    // app.use(require("./services/auth"))
    // app.use(sendViewMiddleware)
    // app.use(middleware.simpleAuth)

    // app.use(require("./services/main"))
      app.get('*', utils.requireLogin, function (req, res) {
        console.log(req.session.user)
          res.sendfile(path.resolve('../dist/index.html'));
      });
    return app;
}
//sending a path to Get methods
function sendViewMiddleware(req, res, next) {
    res.sendView = function (view) {
        return res.sendFile(__dirname + "/views/" + view)
    }
    return next();
}

module.exports.createUserSession = function (req, res, user) {
  console.log(user)
  if(user){
    var cleanUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        data: user.data || {},
    };
    req.session.user = cleanUser;
    req.user = cleanUser;
    res.locals.user = cleanUser;
   }
};

module.exports.requireLogin = function (req, res, next) {
  console.log(req.session.user)  
    if (!req.session.user) {
        res.redirect('/logout');
    } else {
        next();
    }
};