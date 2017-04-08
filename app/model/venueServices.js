var oracledb = require('oracledb');
var bodyParser = require('body-parser');
require('async');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;



export function search(object)
{
  let name =  '%' + object.input +  '%';
  console.log(name);
/*  if(object.location)
  {
    let lat  = object .lat;
    let long = object.long;
    let radius = object.radius;
  }
  */
  let city;
  if(object.city){
    city = object.city;
  }
  else {

  }

  return oracledb.getConnection(
    {
      user          : "askant",
      password      : "dbmsproject",
      connectString : "oracle.cise.ufl.edu:1521/orcl"
    })
    .then(async function(connection)
    {  let $res = await connection.execute(
        // The statement to execute
        "select * " +
          "from venue " +
          "WHERE VENUE_NAME LIKE :cond",
        [name]
        )
        doRelease(connection);
        return $res;
  })
  .catch(function(err) {
  console.error(err);
  return connection.close();
  });
}

export function getDetails(object)
{
  return oracledb.getConnection(
    {
      user          : "askant",
      password      : "dbmsproject",
      connectString : "oracle.cise.ufl.edu:1521/orcl"
    })
    .then(async function(connection)
    {  let $res = await connection.execute(
        // The statement to execute
        "select * " +
          "from venue " +
          "WHERE VENUE_ID = :id ",
        [object.id]
        )
        doRelease(connection);
        return $res;
  })
  .catch(function(err) {
  console.error(err);
  return connection.close();
  });
}


function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}
