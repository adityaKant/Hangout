
//  setup
var express  = require('express');
var app      = express();

app.use(express.static('./webApp'));

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile(__dirname + '/webApp/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");