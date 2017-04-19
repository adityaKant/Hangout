import {getreviewsVenue} from '../model/reviewServices';

var bodyParser = require('body-parser');

export function getreview(userID)
{
  return getDataForUserPage(userID).then(function(result){
    return result;

  }).catch(function(){
  	console.log("Error in service method");
  });
}
