var http = require('http');  
  
//创建服务端  
http.createServer(function (request, response) {  
    //发送一个HTTP状态200和HTTP头的内容类型（content-type），  
    response.writeHead(200, {'Content-Type': 'text/plain'});  
    //向HTTP相应主体中发送文本，完成响应  
    response.end('Hello World\n');  
    //输出日志信息  
    console.log('Server running function');  
}).listen(8888);  
//输出日志信息  
console.log('Server running at http://127.0.0.1:8888/');  