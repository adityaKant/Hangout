import {validate, select} from '../model/userServices';
import {getToken} from './generateToken.js';

var bodyParser = require('body-parser');

  export function signin(user)
  {
    let a;
//    return new Promise(function(resolve, reject)
    return validate(user).then(function(result){

      if(result.rows.length == 0)
      {
        console.log("Wrong Email or Password");
        return ({found : 'false'});
      }
      else {
//          resolve ({success : 'true', found : 'true'});
        a = result.rows[0].USER_ID;
        let obj = {userID : a};
        return select(obj).then(function(result){
          console.log(result.rows);
          var token = getToken(obj);
          return ({found : 'true', output : result.rows[0], accessToken : token});
            //resolve(JSON.parse(result.rows[0][0));})
        });
    }
  });
}
