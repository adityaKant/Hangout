
//  setup
require('babel-core/register');
require("babel-polyfill");
var express  = require('express');
var app      = express();
var bodyParser = require('body-parser');
var router = require('./routes');
var oracledb = require('oracledb');
var jwt = require('jwt-simple');

app.use(bodyParser.json());
app.use(express.static('./webApp'));
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');


// application -------------------------------------------------------------

require('./routes.js')(app);

app.get('/:id', function(req, res) {
    res.sendfile(__dirname + '/webApp/start.js'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('*', function(req, res) {
    res.sendfile(__dirname + '/webApp/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || 3000);
console.log("App listening on port 3000");
