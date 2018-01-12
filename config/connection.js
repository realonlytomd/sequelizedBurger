// Set up connection to the mysql database
var mysql = require("mysql");

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
  var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "root",
    database: "burgers_db"
  })}


// then make the connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// then export this connection for the ORM to use.
module.exports = connection;