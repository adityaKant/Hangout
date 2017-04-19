import {getDataForUserPage, insertLike, updateFollows} from '../model/userServices';

var bodyParser = require('body-parser');

export function userDetails(userID)
{
  return getDataForUserPage(userID).then(function(result){
    return result;

  }).catch(function(err){
  	console.log("Error in service method" + err);
  });
}

export function likeVenue(req)
{
  return insertLike(req).then(function(result){
    return result;

  }).catch(function(err){
  	console.log("Error in service method" + err);
  });
}

export function addFollower(req)
{
  return updateFollows(req).then(function(result){
    return result;

  }).catch(function(err){
  	console.log("Error in service method" + err);
  });
}
