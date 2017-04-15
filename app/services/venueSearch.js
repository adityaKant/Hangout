import {search} from '../model/venueServices';

export function venueSearch(data)
{
  return search(data.query).then(function(result){
    let list = {venues : result.rows}
    return list;

  });
}
