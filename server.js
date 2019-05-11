const express = require('express');
require('dotenv').config();
request = require('request');
var url = require('url');

let web3 = require('web3');
const app = express();

const bodyParser = require('body-parser');
const logger = require('morgan');
let Tx = require('ethereumjs-tx');

 contractABI = [ { "constant": false, "inputs": [ { "name": "cust", "type": "address" }, { "name": "_tokenvalue", "type": "uint256" } ], "name": "addTokens", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "cust", "type": "address" } ], "name": "calcCost", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_end_longitude", "type": "uint256" }, { "name": "_end_latitude", "type": "uint256" }, { "name": "_end_time", "type": "uint256" }, { "name": "cust", "type": "address" } ], "name": "endjourney", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "cust", "type": "address" } ], "name": "saveJourney", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_start_longitude", "type": "uint256" }, { "name": "_start_latitude", "type": "uint256" }, { "name": "_start_time", "type": "uint256" }, { "name": "cust", "type": "address" } ], "name": "startjourney", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "cust_details", "outputs": [ { "name": "account_balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "journeys", "outputs": [ { "name": "start_longitude", "type": "uint256" }, { "name": "start_latitude", "type": "uint256" }, { "name": "end_longitude", "type": "uint256" }, { "name": "end_latitude", "type": "uint256" }, { "name": "start_time", "type": "uint256" }, { "name": "end_time", "type": "uint256" }, { "name": "journey_cost", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "cust", "type": "address" } ], "name": "showCustDetails", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]

   contractAddress="0x15f6767abca4fcfb2d15f6f97a8bc3c9809c2a3f";

  var custaddress = "0x95fDb223FE47B91adCeaF3f69895C8A77a4435B3"; // custid =1 this is the customer account
   var infuraApiKey =process.env.INFURA_API_KEY;
   var web3js = new web3(new web3.providers.HttpProvider("https://kovan.infura.io/v3/"+infuraApiKey));
   web3js.eth.defaultAccount = myAddress;
   var privateKey=new Buffer(process.env.PRIVATE_KEY, 'hex');
   //creating contract object
   var contract =  web3js.eth.contract(contractABI).at(contractAddress);
   var count;
   var nounce;
   var errcode="";
var myAddress = "0x95fDb223FE47B91adCeaF3f69895C8A77a4435B3"; // this is the owner of the contract - able to process payments

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

app.post("/api/processJourney1",function(req,res){

   var custid = req.body.custid; //n//
   var longitude = req.body.longitude;
   var latitude = req.body.latitude;
   var journeytime = req.body.journeytime;

console.log(custid);
	console.log(longitude);
	console.log(latitude);
	console.log(journeytime);

});



app.post("/api/processJourney",function(req,res){


   var custid = req.body.custid; //n//
   var longitude = req.body.longitude;
   var latitude = req.body.latitude;
   var journeytime = req.body.journeytime;

           web3js.eth.getTransactionCount(myAddress, function(err1, result1) {
             nounce=result1;
             var nounceHex = web3js.toHex(nounce);
             var rawTransaction = {
               "from":myAddress,
               "gasPrice":web3js.toHex(2*1e9),
               "gasLimit":web3js.toHex(920000),
               "to":contractAddress,
               "data":contract.startjourney.getData(longitude, latitude, journeytime, custaddress),
               "nonce":nounceHex}
             var transaction = new Tx(rawTransaction);
             transaction.sign(privateKey);

             var serializedTx = transaction.serialize();
             web3js.eth.sendRawTransaction('0x'+serializedTx.toString('hex'),
             function(err2, hash) {
                 if (!err2) {
                   res.json({ message:hash});
                 } else {
                   res.json({ message:err2});
                 }
              })
             })

});






app.use(express.static(__dirname + "/public" ));

app.listen(3000, function(){
  console.log("App starts at port :" +3000);
});
