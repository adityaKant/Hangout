import {signup} from './app/services/signup.js';
import {signin} from './app/services/signin.js';
import {venueSearch} from './app/services/venueSearch.js';
import {venueDetails} from './app/services/venue.js';
import {userDetails} from './app/services/user.js';
import {decode} from './app/services/decodeToken.js';


var bodyParser = require('body-parser');

module.exports = function(app) {

  app.post('/sign-up',function(req, res){
    signup(req.body.user).then (function(obj){
      if(obj.found == 'true')
      res.send({found  : 'true', user : obj.output.rows[0]});
      else {
        res.send('Invalid userID',400);
      }
    });
  });
  
  app.post('/sign-in',function(req, res){
    var body = req.body;
    signin(req.body.user).then (function(obj){
      if(obj.found == 'false')
        res.send('Invalid password or username',400)
      else {
        res.send(obj);
      }
    });
  });

  app.get('/venues',function(req, res){
    venueSearch(req).then (function(obj){
      res.send(obj);
    });
  });

  app.get('/venues/:id',function(req, res){
    var body = req.params;
    venueDetails(body).then (function(obj){
      res.send(obj);
    });
  });

  app.get('/venues/:id/review',function(req, res){
    var body = req.params;
    venueDetails(body).then (function(obj){
      res.send(obj);
    });
  });
  app.get('/users',decode,function(req, res){
    let id = req.userID;
    userDetails(id).then (function(obj){
      res.send(obj);
    });
  });
};
