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
      res.send({found  : 'true', user : obj.output.rows[0]});
      else {
        res.send('Invalid userID',400);
      }
    });
  });
  app.post('/sign-in',function(req, res){
    console.log(req.body);
    var body = req.body;
    signin(req.body.user).then (function(obj){
      console.log(obj);
      if(obj.found == 'false')
        res.send('Invalid password or username',400)
      res.send(obj);
    });
  });

};
