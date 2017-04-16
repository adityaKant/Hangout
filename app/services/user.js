import {getDataForUserPage} from '../model/userServices';

var bodyParser = require('body-parser');

export function userDetails(userID)
{
  return getDataForUserPage(userID).then(function(result){
    return result;

  }).catch(function(){
  	console.log("Error in service method");
  });
}