// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// Get our API routes
const app = express();
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
// Set our api routes
app.use('/api', api);
//for session
var restApi = require('./server/sessionApi');
console.log(restApi)
var session = require('client-sessions');
    app.use(session({
        cookieName: 'session',
        secret: 'ytdabtasokjmnnesukeoamcewlikdsnajsyhsgjls',
        duration: 24 * 60 * 1000,// how long the session will stay valid in ms
        activeDuration: 1000 * 60 * 30, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
        cookie: {
        path: '/', 
        maxAge: 1000 * 60 * 5,// duration of the cookie in milliseconds, defaults to duration above
        ephemeral: false,
        httpOnly: true, 
        secure: false
    }
    }));

var router = express.Router();
var bob = new restApi(router, session, bodyParser);

app.get('*', function (req, res) {
    req.session.user = "jithender";
    res.sendfile(path.resolve('dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));


