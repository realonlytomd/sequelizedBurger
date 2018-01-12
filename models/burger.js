// import `orm.js` into this file

var orm = require("../config/orm.js");

// create the code that will call the ORM functions using the burger specific input for the ORM

var burger = {
  selectAll: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  // The variables columns and values are arrays.
  insertOne: function(columns, values, cb) {
    orm.insertOne("burgers", columns, values, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColumnValue, condition, cb) {
    orm.updateOne("burgers", objColumnValue, condition, function(res) {
      cb(res);
    });
  }
};

 //  then export the new object, burger
module.exports = burger;