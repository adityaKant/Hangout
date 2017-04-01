import {signup} from './app/services/signup.js';
var bodyParser = require('body-parser');


module.exports = function(app) {

app.post('/sign-up', function(req, res){
  console.log(req.body);
  var body = req.body;
  signup(req.body.user).then (function(obj){
    console.log(obj);
    res.send(JSON.stringify(obj.rows[0]));
  });
});
};
