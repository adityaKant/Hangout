import {search} from '../model/venueServices';

var bodyParser = require('body-parser');

export function venueSearch(data)
{
  return search(data).then(function(result){
    return result;

  });
}
