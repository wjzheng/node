var http    = require('http'),
    io      = require('socket.io'),
    fs      = require('fs');
 
//����
var config = {
    port : 8888
}
 //�����������������˿ڡ�
http = http.createServer(handler);
http.listen(config.port);
//����webscoket����������
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
//'connection' ��socket.io �����ģ�
io.sockets.on('connection',function(socket){ 
     //'msg'�������Զ���ģ��ͻ�����ȡ��ʱ��Ҫָ��ͬ�����¼���
    socket.emit('user message',{msg:'connected server.'});
     //'msg'��Ҫ�Ϳͻ��˷���ʱ������¼�����ͬ
    socket.on('msg',function(data){
        console.log('Get a msg from client ...');
        socket.broadcast.emit('user message',data);
    });
});

