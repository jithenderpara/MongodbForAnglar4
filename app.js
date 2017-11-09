var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./server/config');
var cookieParser = require('cookie-parser');
var path=require("path");
var session = require('express-session')

const logger = require("./server/log");


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('body-parser').json({ type: '*/*' }));
app.use(cookieParser());

//var  port = process.env.PORT || config.serverport;
var port = config.serverport || 5000;

mongoose.connect(config.database, function(err) {
    if (err) {
        logger.debug('Error connecting database, please check if MongoDB is running.');
    } else {
        logger.debug('Connected to database...');
    }
});
const MongoStore = require('connect-mongo')(session);
//app.use('/static', express.static(path.join(__dirname, 'src')))
app.use(express.static(path.join(__dirname, 'dist')))
app.use("node_modules", express.static('node_modules'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
// 404 catch 

app.use(express.session({
    secret: 'a4f8071f-c873-4447-8ee2',
    cookie: { maxAge: 60 * 1000  },//1 minute
    store: new (require('express-sessions'))({
        storage: 'mongodb',
        instance: mongoose, // optional
        host: 'localhost', // optional
        port: 27017, // optional
        db: 'orchestrator', // optional
        collection: 'sessions', // optional
        expire: new Date(Date.now() + 60 * 1000), // optional
        resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
    })
}));
app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use(express.static(__dirname + '/dist'));

 app.get('/contactus',function(req, res) {
        res.sendFile('dist/index.html', { root: __dirname });
     // res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

  app.get('/*',function(req, res) {
        res.sendFile('dist/index.html', { root: __dirname });
     // res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
    
    
// kick off the server
app.listen(port);
console.log('app is listening at http://localhost:' + port);
