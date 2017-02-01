var http = require('http');
var logger = require('morgan');
var path =require("path");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine","ejs");

var entries =[];

app.locals.entries = entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({extended : false}));
app.get('/', function(req,res) {
  res.render("index");
});
app.get('/new-entry', function(req, res) {
  res.render('new-entry');
});

app.post("/new-entry", function(req, res) {
  if(!req.body.title || req.body.body) {
    res.status(400).send("Entries must have title and body");
    return;
  }
  entries.push({
title: req.body.title,
content: req.body.body,
published: new Date()
  });

  res.redirect("/");

});

app.use(function(req, res) {
response.status(400).render(400);
});

http.createServer(app).listen(8080, function(req, res) {
  console.log("getting request from client");
});
