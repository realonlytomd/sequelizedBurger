

// * In the `orm.js` file, create the methods that will execute the necessary MySQL commands
// in the controllers. These are the methods to use in order to retrieve
// and store data in the database.

//      * `selectAll()` 
//      * `insertOne()` 
//      * `updateOne()` 

//    * Export the ORM object in `module.exports`.

// Import MySQL connection.
var connection = require("../config/connection.js");

// This function is help for SQL syntax. Inspired from the cats app in the activities folder.

function makeQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// This function helps to convert object key/value pairs to SQL syntax. Also 
// inspired from the cats app.
function objectTomySql(ob) {
  var arr = [];

  // first loop through the keys and push the key/value as a string into the arr array
  for (var key in ob) {
    var value = ob[key];

    // check to skip any hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {

      // if the string has spaces, add quotations
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      
      arr.push(key + "=" + value);
    }
  }

  // then translate the array of strings to a single comma-separated string
  return arr.toString();
}

// Now, the object for all of the  mySQL statement functions
// cb is the callback to deal with the asynchronous problem
var orm = {
  selectAll: function(table, cb) {
    var queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function(table, columns, values, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += columns.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += makeQuestionMarks(values.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, values, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColumnValue would be only {name: chicken}, 
  // since the column devoured is defaulted to false
  updateOne: function(table, objColumnValue, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objectTomySql(objColumnValue);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;