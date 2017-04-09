import {signup} from './app/controllers/signup.js';
import {signin} from './app/controllers/signin.js';
import {venueSearch} from './app/controllers/venueSearch.js';
import {venueDetails} from './app/controllers/venue.js';


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
  app.get('/venueSearch',function(req, res){
    var body = { keyword : req.query.keyword};
    venueSearch(body).then (function(obj){
      res.send(obj);
    });
  });
  app.get('/venue',function(req, res){
    var body = req.body;
    venueDetails(body).then (function(obj){
      res.send(obj);
    });
  });
};
