import {signup} from './app/services/signup.js';
import {signin} from './app/services/signin.js';
import {venueSearch} from './app/services/venueSearch.js';
import {venueDetails} from './app/services/venue.js';
import {userDetails} from './app/services/user.js';
import {decode} from './app/services/decodeToken.js';
import {getreview} from './app/services/review.js';


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
      res.send(obj);
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

  app.get('/me',decode,function(req, res){
    userDetails(req.userID).then (function(obj){
      res.send(obj);
    });
  });

  app.get('/users/:id',decode,function(req, res){
    req.userID = req.params.id;
    userDetails(req.userID).then (function(obj){
      res.send(obj);
    });
  });

  app.get('/venues/:id/review', function(req, res){
    req.venueID = req.params.id;
    getreview(req.venueID).then (function(obj){
    res.send(obj);
    });
  });

};
