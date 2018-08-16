var express = require('express');
var app = express();
var server = require('http').Server(app);
//parse post data
var bodyParser = require('body-parser');
var duck = require('./script/duck.js');
const mysql = require('mysql');
var http = require('http');

//use ejs view engine for table page
app.set('view engine', 'ejs');

var HOST = 'localhost';
var USER = 'root';
var PASSWORD = 'lizheng808';
var DB = 'duck'
var DUCKTABLE = 'feeding_record';
var FODDTABLE = 'food';
var FEEDERTABLE = 'feeder';

//add all directroies;
app.use('/style',  express.static(__dirname + '/style'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/script',  express.static(__dirname + '/script'));
app.use('/assets',  express.static(__dirname + '/assets'));


server.listen(8000,function(){
    console.log('Node server running @ http://localhost:8000');
});


var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//route to index
app.get('/',function(req,res){
	res.sendFile('index.html',{'root': __dirname + '/views'});
})

app.get('/record',function(req,res){
	res.sendFile('record_success.html',{'root': __dirname + '/views'});
})

app.get('/report',function(req,res){
	res.sendFile('report.html',{'root': __dirname + '/views'});
    //res.render('report');
})

//send back feedTable res
app.post('/feedTable', urlencodedParser, function(req, res, ) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  if(req.body.request == "feeding"){
    //get all rows for feed record table 
    var sql = "SELECT * from " + DUCKTABLE;
    connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    });  
  }
})

//send back foodTable res
app.post('/foodTable', urlencodedParser, function(req, res, ) {
  if (!req.body) return res.sendStatus(400);
  //console.log(req.body);
  if(req.body.request == "food"){
    //get all rows for feed record table 
    var sql = "SELECT * from " + FODDTABLE;
    connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    });  
  }
})

//send back fullResults res
app.post('/fullResults', urlencodedParser, function(req, res, ) {
  if (!req.body) return res.sendStatus(400);
  //console.log(req.body);
  if(req.body.request == "results"){
    //get all rows for feed record table 
    var sql = "SELECT id_record, time, location, count, name, kind, quantity FROM feeding_record JOIN food ON feeding_record.id_record= food.idfood;";
    connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    });  
  }
})

app.post('/feederName', urlencodedParser, function(req, res, ) {
  if (!req.body) return res.sendStatus(400);
  //console.log(req.body);
    var name = req.body.request;
    //get all rows for feed record table 
    var sql = "SELECT * from " + DUCKTABLE + " where name ="+ '"'+name+'"'+";";
    connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    });  

})


//get post data
app.post('/record', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);

 
  var food = new Food(req.body.foodkind, req.body.quantity);

  if(req.body.feederName!=null){
      var duck = new Duck(req.body.time, req.body.location, req.body.duckcount, req.body.feederName);
      //var feeder = new Feeder(req.body.feederName);
  }else{
      var duck = new Duck(req.body.time, req.body.location, req.body.duckcount);
  }
  console.log(duck);
 
  executeInsert(duck, food);
  
  //redirect to success page
  res.sendFile('record_success.html',{'root': __dirname + '/views'});
})

//setup database
const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  multipleStatements: true,
  database: DB
});

function connectDB(){
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });
}

//connect db
connectDB();

//insert data
function executeInsert(duck, food){ 
        //query for feeding record table
        var sql = "Insert into "+DUCKTABLE+"(time,location,count,name) VALUES ('"+duck.time+"','"+duck.location+"','"+duck.duckcount+"','"+duck.name+"');" +
        //var sql2 = "SELECT id_record FROM " + DUCKTABLE + "where time="+duck.time
        "SELECT MAX(id_record) INTO @maxid FROM feeding_record;" +
        "Insert into "+FODDTABLE+"(kind,quantity) VALUES ('"+food.kind+"','"+food.quantity+"');" +
        "UPDATE food SET record_id = @maxid where idfood = @maxid;";
        //"Insert into "+FEEDERTABLE+"(feederName) VALUES ('"+feeder.name+"');";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
           
        });
        console.log('Connect to database successfully');
}

//get record table
function getrecord(){
    //console.log(res);
    var sql = "SELECT * from " + DUCKTABLE;
    connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
    });   
}



//constructor for duck
function Duck(time, location, duckcount, name){
    this.time = time;
    this.location = location;
    this.duckcount = duckcount;
    this.name = name;
}

//constructor for food
function Food(kind, quantity){
    this.kind = kind;
    this.quantity = quantity;
}

function Feeder(name){
    this.name = name;
}
