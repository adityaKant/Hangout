import {check, update, select} from '../model/userServices';
var bodyParser = require('body-parser');

  export function signup(user)
  {
//    return new Promise(function(resolve, reject)
    return check(user).then(function(result){
      if(result.rows.length == 0)
      {
        console.log("zero rows");
        return ({success : 'true', found : 'false'});
      }
      else {
        console.log("More than zero rows");
        return update(user).then(function(result){
//          resolve ({success : 'true', found : 'true'});
          return select(user).then(function(result){
            return result;
            //resolve(JSON.parse(result.rows[0][0));})

        });

      });
    }
  });
}
