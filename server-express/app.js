//importing required dependencies
let express = require('express');
let fs = require('fs');
let morgan = require('morgan');
let path = require('path');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');
let index = require('./routes/index');
let jwt = require('jsonwebtoken');
let users = require('./routes/users');
let updates = require('./routes/updates');
let deletes = require('./routes/deletes');
let dbURL = require('./config/config');
let http = require('http');
let cors = require('cors');
require('./config/passport')(passport);

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(passport.initialize());	

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}));

app.use('/', index);																			//Calling index 
app.use('/users', users);  																//Calling users
app.use('/updates',updates);															//Calling Updates	
app.use('/deletes',deletes);															//Calling Delete
mongoose.connect(dbURL.database,{useMongoClient : true});					//Connecting with Database


console.log("Connected");
app.listen(1337);																					//Defining listen method for defining port
module.exports=app;