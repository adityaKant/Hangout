var oracledb = require('oracledb');
var bodyParser = require('body-parser');
require('async');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

export function search(object)
{

  let name
  if(object.keyword){
    name =  '%' + object.keyword +  '%';
  }
  else {
    name = '%'
  }

  let condCity;
  if(object.city){
    condCity = ' AND CITY = \'' + object.city + '\'';
  }
  else {
    condCity = '';
  }

  let condRating;
  if(object.rating){
    condRating = ' AND rating >= ' + object.rating;
  }
  else {
    condRating = '';
  }

  let start, end;
  if(object.page && object.per)
  {
    start = (object.page - 1)  * object.per;
    end = (object.page)  * object.per;
  }
  else {
    start = 0;
    end = 10
  }
  let condPage = " r > " + start + " and r <= " +  end;

  let preparedQuery = 'select VENUE_ID, VENUE_NAME, PHONE, CITY, STATE, RATING from (select ROWNUM r, Venue.* ' +
                      'from venue where venue_name like \''+ name + '\'' +
                      condCity + condRating + ') where ' + condPage;

  console.log(preparedQuery);
  return oracledb.getConnection(
    {
      user          : "askant",
      password      : "dbmsproject",
      connectString : "oracle.cise.ufl.edu:1521/orcl"
    })
    .then(async (connection) =>
    {  let $res = await connection.execute(
        // The statement to execute
        preparedQuery,
        []
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
