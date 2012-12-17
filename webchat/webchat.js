var express = require('express');
var app = express.createServer();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.static(__dirname + '/public'));
  app.register('html', require('ejs'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('env','development');
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.render('index.html');
});

app.listen(3000);
console.log('Webchat server listening on port 3000');