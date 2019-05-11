const express = require('express');
require('dotenv').config();
request = require('request');
var url = require('url');


const app = express();

const bodyParser = require('body-parser');
const logger = require('morgan');


app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-access-token');
  next();
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/ping", function(req, res){
  res.json({ messaage: "pong" });
});

app.use(express.static(__dirname + "/public" ));

app.listen(3000, function(){
  console.log("App starts at port :" +3000);
});
