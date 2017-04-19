var oracledb = require('oracledb');
var bodyParser = require('body-parser');
require('async');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;


export function getreviewsVenue(venueID)
{
  return oracledb.getConnection(
    {
      user          : "askant",
      password      : "dbmsproject",
      connectString : "oracle.cise.ufl.edu:1521/orcl"
    })
    .then(async function(connection)
    {
      const $res = await connection.execute(
        // The statement to execute
        "SELECT r.REVIEW_TEXT, r.RATING, u.USER_ID, u.FNAME, u.LNAME " +
          "FROM USER2 u, REVIEW r " +
          "WHERE u.USER_ID = r.USER_ID AND r.VENUE_ID = :id",

        // The "bind value" 180 for the "bind variable" :id
        [venueID]
      )

      const $res1 = await connection.execute(
        // The statement to execute
        "SELECT  CASE  " +
        " WHEN RATING <= 3 " +
        "    THEN 'NEGATIVE' " +
        "    WHEN RATING > 3 " +
        "    AND RATING <= 6 " +
        "    THEN 'NEUTRAL' " +
        "    ELSE 'POSITIVE' " +
        "  END      AS REVIEW_TYPE, " +
        "  COUNT(*) AS COUNT " +
        " FROM REVIEW " +
        " WHERE VENUE_ID = :id " +
        " GROUP BY " +
        "  CASE " +
        "    WHEN RATING <= 3 " +
        "    THEN 'NEGATIVE' " +
        "    WHEN RATING > 3 " +
        "    AND RATING <= 6 " +
        "    THEN 'NEUTRAL' " +
        "    ELSE 'POSITIVE' " +
        "  END",

        // The "bind value" 180 for the "bind variable" :id
        [venueID]
      )

      doRelease(connection);
      return {reviews : $res.rows, rating : $res1.rows};
  });
}

export function getreviewsUser(userID)
{
  return oracledb.getConnection(
    {
      user          : "askant",
      password      : "dbmsproject",
      connectString : "oracle.cise.ufl.edu:1521/orcl"
    })
    .then(async function(connection)
    {
      const $res = await connection.execute(
        // The statement to execute
        "SELECT r.REVIEW_TEXT, r.RATING, r.VENUE_ID, v.VENUE_NAME  " +
          "FROM USER2 u, REVIEW r, Venue v " +
          "WHERE u.USER_ID = r.USER_ID AND u.USER_ID = :id AND r.VENUE_ID = v.VENUE_ID",

        // The "bind value" 180 for the "bind variable" :id
        [userID]
      )
      doRelease(connection);
      return {reviews : $res.rows};
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
