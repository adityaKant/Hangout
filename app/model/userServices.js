var oracledb = require('oracledb');
var bodyParser = require('body-parser');
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
    .then(function(connection)
    {  return connection.execute(
        // The statement to execute
        "SELECT * " +
          "FROM USER2 " +
          "WHERE USER_ID = :id",

        // The "bind value" 180 for the "bind variable" :id
        [user.userID]

        // Optional execute options argument, such as the query result format
        // or whether to get extra metadata
        // { outFormat: oracledb.OBJECT, extendedMetaData: true },

        // The callback function handles the SQL execution results
        /*function(err, result)
        {
          console.log("connection made ");
          if (err) {
            console.error(err.message);
            doRelease(connection);
            return {success : 'false'};
          }
          console.log("no error");
          if(result.rows.length == 0)
          {
            doRelease(connection);
            console.log("zero rows");
            return {success : 'true', found : 'false'};
          }
          else
          {
            doRelease(connection);
            return {success : 'true', found : 'true'};
          }

        });*/
    )
  });

  // Note: connections should always be released when not needed
/*  function doRelease(connection)
  {
    connection.close(
      function(err) {
        if (err) {
          console.error(err.message);
        }
      });
  }*/

}

export function update(user)
{
  return oracledb.getConnection(
    {
      user          : "askant",
      password      : "dbmsproject",
      connectString : "oracle.cise.ufl.edu:1521/orcl"
    })
    .then(function(connection)
    {  return connection.execute(
        // The statement to execute
        "Update USER2 " +
          "SET email = :em , passwd = :pass " +
          "WHERE USER_ID = :id",
        {em : user.email,pass : user.password,id : user.userID}
        )
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
    .then(function(connection)
    {  return connection.execute(
        // The statement to execute
        "select * " +
          "from user2 " +
          "WHERE USER_ID = :id",
        [user.userID]
        )
  })
  .catch(function(err) {
  console.error(err);
  return conn.close();
  });
}
