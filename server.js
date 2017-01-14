

// Load libraries
var express = require('express');
var app = express();
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

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;

// Set up Routes
var router = express.Router();
app.use('/api', router);

// Set up DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function() {
  // we're connected!
});


//	API Interface
///////////////////////////////////////////////////////////////////////

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Hypnos Studios Mobile Analytics API 1.0' });   
});

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Server event.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/logevent')
    // Log error (accessed at POST http://localhost:8080/api/searcherror)
    .post(function(req, res) {
        var logEvent = new LogEvent();
        logEvent.app = req.body.app;
        logEvent.type = req.body.type;
        logEvent.params = req.body.params;

        logEvent.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Logged.' });
            console.log("Logging: " + logEvent);
        });
    })

    // get all the logs (accessed at GET http://localhost:8080/api/searcherror)
    .get(function(req, res) {
        LogEvent.find(function(err, logEvents) {
            if (err)
                res.send(err);
            res.json(logEvents);
        });
    });



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Connected on port ' + port);
