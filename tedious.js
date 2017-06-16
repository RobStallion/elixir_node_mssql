var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = {
  userName: 'ServerAdmin', // update me
  password: '4j5Q9Kzl43t8', // update me
  server: 'hl-test-server.database.windows.net', // update me
  options: {
      database: 'hl-database', //update me
      encrypt: true
  }
}

var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
    if (err) {
        console.log(err)
    }
    else{
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
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    request.on('doneInProc', function(rowCount, more, rows) {
      if (rowCount == 0) {
      }
        return JSON.stringify(rows)
    })

    connection.execSql(request);
}
