var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = {
  userName: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  options: {
    database: process.env.DB,
    encrypt: true
  }
};

var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
    if (err) {
        console.log(err)
    }
    else {
        args = process.argv;
        var queryString = args[2]
        var qwerty = "SELECT pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid"
        console.log("==========>", args);
        queryDatabase(queryString)
    }
});

function queryDatabase(queryString){
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
        queryString,
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            connection.close()
            if (err) {
              process.exit(1)
            } else {
              process.stdout.write(JSON.stringify(rows))
            }
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    connection.execSql(request);
}
