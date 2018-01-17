

// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");

var router = express.Router();
// Requiring our burger model
var burger = require("../models");

// Routes
// =============================================================
module.exports = function(router) {

  // GET route for getting all of the burgers
  router.get("/", function(req, res) {
    burger.findAll({})
    .then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  // POST route for saving a new burger
  router.post("/api/burgers", function(req, res) {
    console.log(req.body);
    burger.create({
      burger_name: req.body.burger_name
    })
    .then(function(result) {
      res.json(result);
    });
  });

  // PUT route for updating devoured
  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    burger.update({
      devoured: req.body.devoured
    })
    .then(condition, function(result) {
      res.json(result);
    });
  });