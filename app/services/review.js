import {getreviewsVenue, getreviewsUser} from '../model/reviewServices';

var bodyParser = require('body-parser');

export function getVenueReview(venueID)
{
  return getreviewsVenue(venueID).then(function(result){
    return result;

  }).catch(function(err){
  	console.log(err);
  });
}

export function getUserReview(userID)
{
  return getreviewsUser(userID).then(function(result){
    return result;

  }).catch(function(err){
  	console.log(err);
  });
}
