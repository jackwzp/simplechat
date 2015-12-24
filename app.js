//============================
//    Initialization
//============================       
var express = require('express');
var app = express();



//============================
//    Middleware
//============================       

require('_/middleware').config(app);
require('_/middleware').setLocals(app);

//============================
//    Routes
//============================ 

var index = require('_/routes/index');
var users = require('_/routes/users');
app.use('/', index);
app.use('/users', users);


//============================
//    Error Handlers
//============================   
require('_/middleware').errorHandler(app);


//============================
//    Expose
//============================  
module.exports = app;
