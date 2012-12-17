var http    = require('http'),
    io      = require('socket.io'),
    fs      = require('fs');
 
//配置
var config = {
    port : 8888
}
 //创建服务器，监听端口。
http = http.createServer(handler);
http.listen(config.port);
//创建webscoket监听服务器
io = io.listen(http);

 //
io.configure(function (){
  io.set('authorization', function (handshakeData, callback) {
    callback(null, true); // error first callback style 
  });
});

function handler(req, res) {
    fs.readFile(__dirname+'/client.html',
      function(err, data){
        req.setEncoding(encoding="utf8");
        res.writeHead(200);
        res.end(data);
    });
}
//'connection' 是socket.io 保留的，
io.sockets.on('connection',function(socket){ 
     //'msg'是我们自定义的，客户端听取的时候要指定同样的事件名
    socket.emit('user message',{msg:'connected server.'});
     //'msg'需要和客户端发送时定义的事件名相同
    socket.on('msg',function(data){
        console.log('Get a msg from client ...');
        socket.broadcast.emit('user message',data);
    });
});

