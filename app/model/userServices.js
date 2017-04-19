var oracledb = require('oracledb');
var bodyParser = require('body-parser');
require('async');
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

export function check(user)
{
  return oracledb.getConnection(
    {
      user          : "askant",
      password      : "dbmsproject",
      connectString : "oracle.cise.ufl.edu:1521/orcl"
    })
    .then(async function(connection)
    {  const $res = await connection.execute(
        // The statement to execute
        "SELECT * " +
          "FROM USER2 " +
          "WHERE USER_ID = :id",

        // The "bind value" 180 for the "bind variable" :id
        [user.userID]
      )
      doRelease(connection);
      return $res;
  });
}

export function validate(user)
{
  return oracledb.getConnection(
    {
      user          : "askant",
      password      : "dbmsproject",
      connectString : "oracle.cise.ufl.edu:1521/orcl"
    })
    .then(async function(connection)
    {  const $res = await connection.execute(
        // The statement to execute
        "SELECT USER_ID " +
          "FROM USER2 " +
          "WHERE EMAIL= :em AND PASSWD = :ps",

        // The "bind value" 180 for the "bind variable" :id
        {em : user.email, ps : user.password}
      )
      doRelease(connection);
      return $res;
  });
}


export function update(user)
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
        "Update USER2 " +
          "SET email = :em , passwd = :pass " +
          "WHERE USER_ID = :id",
        {em : user.email,pass : user.password,id : user.userID}
        )
        doRelease(connection);
        return $res;
  })
  .catch(function(err) {
  console.error(err);
  return conn.close();
  });
}

export function select(user)
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
          "from user2 " +
          "WHERE USER_ID = :id",
        [user.userID]
        )
        doRelease(connection);
        return $res;
  })
  .catch(function(err) {
  console.error(err);
  return connection.close();
  });
}

export function getDataForUserPage(userID)
{
  return oracledb.getConnection(
    {
      user          : "askant",
      password      : "dbmsproject",
      connectString : "oracle.cise.ufl.edu:1521/orcl"
    })
    .then(async function(connection)
    {  let $res1 = await connection.execute(
        //Suggested Venues
        ' SELECT DISTINCT V.VENUE_NAME,   '+
        '   V.VENUE_ID   '+
        ' FROM VENUE V   '+
        ' INNER JOIN VENUE_BELONGS_TO VBT   '+
        ' ON V.VENUE_ID     = VBT.VENUE_ID   '+
        ' WHERE VBT.CAT_ID IN   '+
        '   ( SELECT DISTINCT VBT.CAT_ID   '+
        '   FROM USER2 U   '+
        '   INNER JOIN CHECK_IN CH   '+
        '   ON U.USER_ID = CH.USER_ID   '+
        '   INNER JOIN VENUE_BELONGS_TO VBT   '+
        '   ON CH.VENUE_ID  = VBT.VENUE_ID   '+
        '   WHERE U.USER_ID = :id   '+
        '   )   '+
        ' AND ROWNUM <= 5   ',
        [userID]
        );
      let $res2 = await connection.execute(
        //Followers
       ' SELECT USER_ID, FNAME, LNAME   '+
       ' FROM USER2   '+
       ' WHERE USER_ID IN   '+
       '   ( SELECT FOLLOWER_ID FROM USERGRAPH WHERE USER_ID = :id   '+
       '   )   ',
       [userID]
        );
      let $res3 = await connection.execute(
        // Following
        ' SELECT USER_ID, FNAME, LNAME   '+
        ' FROM USER2   '+
        ' WHERE USER_ID IN   '+
        '   ( SELECT USER_ID FROM USERGRAPH WHERE FOLLOWER_ID = :id   '+
        '   )   ',
        [userID]
        );
      let $res4 = await connection.execute(
        // Places visited by friends.
        ' SELECT CH.VENUE_ID,   '+
        '   CH.USER_ID   '+
        ' FROM USER2 U   '+
        ' INNER JOIN USERGRAPH UG   '+
        ' ON U.USER_ID = UG.FOLLOWER_ID   '+
        ' INNER JOIN CHECK_IN CH   '+
        ' ON UG.USER_ID   = CH.USER_ID   '+
        ' WHERE U.USER_ID = :id   ',
        [userID]
        );
      let $res5 = await connection.execute(
        // Suggested people to follow
        ' SELECT UG2.USER_ID, U.FNAME, U.LNAME   '+
        ' FROM USERGRAPH UG1,   '+
        '   USERGRAPH UG2, USER2  U '+
        ' WHERE UG1.USER_ID   = UG2.FOLLOWER_ID   '+
        ' AND UG1.FOLLOWER_ID = :id AND U.USER_ID = UG2.FOLLOWER_ID  ',
        [userID]
        );
      let $res = await connection.execute(
          // The statement to execute
          "select USER_ID, FNAME, LNAME " +
          "from user2 " +
          "WHERE USER_ID = :id",
          [userID]
      )
        doRelease(connection);
        return {user : $res.rows, suggestedVenues : $res1.rows, followers : $res2.rows, following : $res3.rows, newsFeed : $res4.rows, suggestedPeople : $res5.rows};
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
