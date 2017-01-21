/********************************************************************
* FILE NAME: Server.js                                              *
*                                                                   *
* PURPOSE: Server                                                   *
* FILE REFERENCES:                                                  *
*                                                                   *
* NOTES: Creates the node js server and handles requests.           *
*                                                                   *
* DEVELOPMENT HISTORY:                                              *
*                                                                   *
* Date          Author  Release Description Of Change               *
* ----          ------  ------- ---------------------               *
* 07/07/2016    Tom     0.0.1   File Created                        *
********************************************************************/

/**********************************
    Load Modules
**********************************/
var express = require('restify');
var bodyParser = require('body-parser');
var fs = require("fs");
var mongoose = require('mongoose');
var auth = JSON.parse(fs.readFileSync("auth.json"));

var options = {
  user: auth.username,
  pass: auth.password
}
mongoose.connect('mongodb://localhost/analytics', options);
// Load Schema
var LogEvent = require('./models/LogEvent');

var port = 8080;

// Set up Server 
var server = restify.createServer();
server.use(restify.bodyParser());

// Set up DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function() {
  // we're connected!
});

// Load encryption
var encryption = require('encryption');
var encryptor = new encryption();
encryptor.setKeys('key.pub', 'key');


/**********************************
    Set up Routes
**********************************/

server.get('/messages', getMessages);
server.post('/messages', postMessage);

/**********************************
    API Functions
**********************************/

function getEvents(req, res, next) {
    LogEvent.find(function(err, logEvents) {
            if (err)
                res.send(err);
            res.json(logEvents);
        });
}

function postEvent(req, res, next) {
    var decrypted = JSON.parse(encryptor.decrypt(req.body)); //TODO: test
    var logEvent = new LogEvent();
        logEvent.app = req.body.app;
        logEvent.type = req.body.type;
        logEvent.date = new Date();
        logEvent.userId = req.body.userId;
	logEvent.sessionId = req.body.sessionId;
        logEvent.params = req.body.params;
        logEvent.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Logged.' });
            console.log("Logging: " + logEvent);
        });
}


/**********************************
    Start Server
**********************************/
console.log('Connected on port ' + port);
