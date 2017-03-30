
//  setup
var express  = require('express');
var app      = express();
var oracledb = require('oracledb');

app.use(express.static('./webApp'));

// application -------------------------------------------------------------
app.get('/:id', function(req, res) {
    res.sendfile(__dirname + '/webApp/start.js'); // load the single view file (angular will handle the page changes on the front-end)
});
app.get('*', function(req, res) {
    res.sendfile(__dirname + '/webApp/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || 3000);
console.log("App listening on port 3000");
