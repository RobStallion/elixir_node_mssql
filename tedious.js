var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = {
  userName: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  options: {
    database: process.env.DB,
    encrypt: true,
    rowCollectionOnRequestCompletion: true
  }
};

var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
    if (err) {
        process.exit(1)
    }
    else {
        args = process.argv;
        var queryString = args[2]
        var qwerty = "SELECT pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid"
        queryDatabase(queryString)
    }
});

function queryDatabase(queryString){
    // Read all rows from table
    request = new Request(
        queryString,
        function(err, rowCount, rows) {
            connection.close()
            if (err) {
              process.exit(1)
            } else {
              process.stdout.write(JSON.stringify(rows))
            }
        }
    );
    connection.execSql(request);
}
