var oracledb = require('oracledb');
var bodyParser = require('body-parser');
require('async');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

export function search(object)
{

  let name, condCity = '', condState = '', condRating = '', condRadius = '', condPage, condSort='';

  if(object.keyword){
    name =  '%' + object.keyword +  '%';
  }
  else {
    name = '%'
  }


  if(object.filter)
  {
    let filters = JSON.parse(object.filter);

    if(filters.city){
      condCity = ' AND CITY = \'' + filters.city + '\'';
    }

    if(filters.state){
      condState = ' AND STATE = \'' + filters.state + '\'';
    }

    if(filters.rating){
      condRating = ' AND rating >= ' + filters.rating;
    }

    if(filters.latitude && filters.longitude && filters.radius){
      condRadius = ' AND POWER( ( 69.1 * ( Longitude -  ' + filters.longitude + ' ) * cos( ' + filters.latitude + ' / 57.3 ) ) , 2 ) + POWER( ( 69.1 * ( Latitude - ' + filters.latitude + ' ) ) , 2 ) < ( ' + filters.radius + ' * ' + filters.radius + ' ) ';
    }

    if(filters.sort)
    {
      condSort = ' ORDER BY RATING DESC '
    }

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
  condPage = " r > " + start + " and r <= " +  end;

  let preparedQuery = 'select VENUE_ID, VENUE_NAME, PHONE, CITY, STATE, RATING, CHECK_IN_COUNT, REVIEW_COUNT from (select ROWNUM r, Venue.* ' +
                      'from venue where venue_name like \''+ name + '\'' +
                      condCity + condRating + condState + condRadius + condSort + ') where ' + condPage;

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

      let categories = await connection.execute(
            // The statement to execute
          "select cat.CAT_NAME " +
          "from CATEGORY cat, VENUE_BELONGS_TO vb " +
          "WHERE vb.CAT_ID = cat.CAT_ID AND vb.VENUE_ID = :id ",
          [object.id]
          )

        doRelease(connection);
        return {venue : $res.rows[0], category : categories.rows};
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
