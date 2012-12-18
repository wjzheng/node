var express = require('express');
var routes = require('./routes');
var io = require('socket.io');
var app = express.createServer();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.router(routes));
  app.use(express.static(__dirname + '/public'));
  app.register('html', require('ejs'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('env', 'development');
});

app.configure('development', function() {
  app.use(express.errorHandler({
    dumpExceptions : true,
    showStack : true
  }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

io = io.listen(app);
io.sockets.on('connection', function(socket) {
  socket.emit('conn', {
    msg : 'connected wb server!'
  });
});
app.listen(3000);
console.log('Webchat server listening on port 3000');