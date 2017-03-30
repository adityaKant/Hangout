var oracledb = require('oracledb');

// Get a non-pooled connection
oracledb.getConnection(
  {
    user          : "askant",
    password      : "dbmsproject",
    connectString : "oracle.cise.ufl.edu:1521/orcl"
  },
  function(err, connection)
  {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      // The statement to execute
      "SELECT * " +
        "FROM Category " +
        "WHERE CAT_ID = :id",

      // The "bind value" 180 for the "bind variable" :id
      ['4bf58dd8d48988d16c941735'],

      // Optional execute options argument, such as the query result format
      // or whether to get extra metadata
      // { outFormat: oracledb.OBJECT, extendedMetaData: true },

      // The callback function handles the SQL execution results
      function(err, result)
      {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
        console.log(result.rows);     // [ [ 180, 'Construction' ] ]
        doRelease(connection);
      });
  });

// Note: connections should always be released when not needed
function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}
