import {getDetails} from '../model/venueServices';

var bodyParser = require('body-parser');

export function venueDetails(data)
{
  return getDetails(data).then(function(result){
    return result;

  });
}
