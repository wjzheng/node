var http = require('http');  
  
//���������  
http.createServer(function (request, response) {  
    //����һ��HTTP״̬200��HTTPͷ���������ͣ�content-type����  
    response.writeHead(200, {'Content-Type': 'text/plain'});  
    //��HTTP��Ӧ�����з����ı��������Ӧ  
    response.end('Hello World\n');  
    //�����־��Ϣ  
    console.log('Server running function');  
}).listen(8888);  
//�����־��Ϣ  
console.log('Server running at http://127.0.0.1:8888/');  