//============================
//  Require
//============================       

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Configure DB settings in db.js and then uncomment
//var db = require('./db');



//============================
//  Middleware Configurations
//============================       

var publicDir = path.join(__dirname, '../../public');
var viewDir = path.join(__dirname, '../views');

exports.config = function(app) {

    app.set('views', viewDir);
    app.set('view engine', 'jade');
    
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


    // express generated
    app.use(cookieParser());
    app.use(express.static(publicDir));

}


//============================
//  App Locals
//============================       

exports.setLocals = function(app) {
    // set locals variables here
    // app.locals.varTest = "test" // for example
}


//============================
//  Error Handlers
//============================    
exports.errorHandler = function(app) {

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });

}