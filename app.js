var express = require('express');
var path = require('path');
var http = require('http');
var config = require('config');
var log = require('libs/log')(module);

var app = express();
app.set("port", config.get('port'));


http.createServer(app).listen(app.get("port"), function () {
    log.info("Express port listening on port " + config.get('port'));
});

app.use(function (req, res, next) {
    if (req.url === "/") {
        res.end("Initial page");
    } else {
        next();
    }
});

app.use(function (req, res, next) {
    if (req.url === "/test") {
        res.end("Test page");
    } else {
        next();
    }
});

app.use(function (req, res, next) {
    if (req.url === "/error") {
        next(new Error("Access denied"));
    } else {
        next();
    }
});

app.use(function (err, req, res, next) {
    if (app.get("env") === "development") {
        app.errorHandler(err, req, res, next);
    } else {
        res.send("500");
    }
});

app.errorHandler = function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
};

app.use(function (req, res, next) {
    res.send("No such page found");
});


//
//
//
//
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
//
// var index = require('./routes/index');
// var users = require('./routes/users');
//
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', index);
// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
//module.exports = app;
