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

  // Note: connections should always be released when not needed
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
  return conn.close();
  });
}
