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
  return connection.close();
  });
}

export function insertLike(req)
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
        "Insert into likes " +
        " Values(:user1, :venue1)",
        {user1 : req.userID, venue1 : req.venueID}
        )
        doRelease(connection);
        return {status : "accepted"};
  })
  .catch(function(err) {
  console.error(err);
  return connection.close;

  });
}

export function updateFollows(req)
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
        "Insert into USERGRAPH " +
        " Values(:user1, :user2)",
        {user1 : req.userID, user2 : req.toFollow}
        )
        doRelease(connection);
        return {status : "accepted"};
  })
  .catch(function(err) {
  console.error(err);
  return connection.close;

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
    {
      let $res1 = await connection.execute(
        //Suggested Venues
        ' SELECT DISTINCT V.VENUE_NAME,   '+
        '   V.VENUE_ID, V.RATING   '+
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
        ' AND ROWNUM <= 5   AND V.VENUE_ID NOT IN ( SELECT VENUE_ID FROM LIKES WHERE USER_ID = :id1)',
        {id : userID, id1 : userID}
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
        ' SELECT CH.VENUE_ID, V.VENUE_NAME,  '+
        '   CH.USER_ID, U2.FNAME, U2.LNAME, CH.TIME   '+
        ' FROM USER2 U   '+
        ' INNER JOIN USERGRAPH UG   '+
        ' ON U.USER_ID = UG.FOLLOWER_ID   '+
        ' INNER JOIN CHECK_IN CH   '+
        ' ON UG.USER_ID   = CH.USER_ID   '+
        ' INNER JOIN VENUE V  '+
        ' ON CH.VENUE_ID = V.VENUE_ID '+
        ' INNER JOIN USER2 U2  '+
        ' ON CH.USER_ID   = U2.USER_ID '+
        ' WHERE U.USER_ID = :id  ORDER BY CH.TIME DESC ',
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

        let $res6 = await connection.execute(
          // Suggested people to follow
          ' SELECT V.VENUE_ID, V.VENUE_NAME   '+
          ' FROM USER2 U,   '+
          '   LIKES L, VENUE V '+
          ' WHERE U.USER_ID   = L.USER_ID   '+
          ' AND U.USER_ID = :id AND L.VENUE_ID = V.VENUE_ID  ',
          [userID]
          );

      let $res = await connection.execute(
          // The statement to execute
          "select USER_ID, FNAME, LNAME " +
          "from user2 " +
          "WHERE USER_ID = :id",
          [userID]
      )

      let  reviewCount= await connection.execute(
          // The statement to execute
          "select count(*) a " +
          "from user2 u INNER JOIN REVIEW r ON u.USER_ID = r.USER_ID " +
          "WHERE u.USER_ID = :id",
          [userID]
      );

      let  checkinCount= await connection.execute(
          // The statement to execute
          "select count(*) a " +
          "from user2 u INNER JOIN CHECK_IN ch ON u.USER_ID = ch.USER_ID " +
          "WHERE u.USER_ID = :id",
          [userID]
      );
        doRelease(connection);
        return {user : $res.rows, userStats:{reviews : reviewCount.rows[0].A, check_ins : checkinCount.rows[0].A}, suggestedVenues : $res1.rows, followers : $res2.rows, following : $res3.rows, newsFeed : $res4.rows, suggestedPeople : $res5.rows, likes : $res6.rows};
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
