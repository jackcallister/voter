var express = require('express');
var http    = require('http');
var less    = require('less-middleware');
var routes  = require('./routes');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(less({ src: __dirname + '/public', force: true }));
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
