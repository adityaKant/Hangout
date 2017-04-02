import {signup} from './app/services/signup.js';
import {signin} from './app/services/signin.js';

var bodyParser = require('body-parser');

module.exports = function(app) {

  app.post('/sign-up',function(req, res){
    console.log(req.body);
    var body = req.body;
    signup(req.body.user).then (function(obj){
      console.log(obj);
      if(obj.found == 'true')
      res.send(JSON.stringify({found  : 'true', user : obj.output.rows[0]}));
      else {
        res.send(obj);
      }
    });
  });
  app.post('/sign-in',function(req, res){
    console.log(req.body);
    var body = req.body;
    signin(req.body.user).then (function(obj){
      console.log(obj);
      res.send(obj);
    });
  });

};
