var express = require('express');
var path = require('path');
var http = require('http');
var config = require('config');
var log = require('libs/log')(module);
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var app = express();
app.set("port", config.get('port'));

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
if (app.get('env') === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('default'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(config.get('port'), function () {
    log.info("Express port listening on port " + config.get('port'));
});


app.get('/', function(req, res, next) {
   res.render("index", {
       body: '<b>Hello</b>'
   });
});

module.exports = app;
