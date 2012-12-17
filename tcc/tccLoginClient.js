var http = require("http");
var fs = require('fs');
var querystring = require('querystring');
var settings = require('./tccSettings');
var htmlparser = require('htmlparser');
var sys = require("sys");
index();

function index(){
  var opt = { 
    host :settings.host,
    path:settings.pages.index+settings.campusId,
    method:'get',
    headers:{ 
      protocol :settings.protocol||'http',
      referer : settings.referer||'http://'+settings.host,
      'user-agent':settings.userAgent
    }
  };
  console.log('index url:'+opt.path);
  var idxReq = http.request(opt, function(resp){
    resp.on("data", function(chunk){
    });
    resp.on("end", function(){
      var cookie = resp.headers['set-cookie'][1];
      var idx = cookie.indexOf(";");
      cookie = cookie.substring(0,idx);
      console.log('JSESSIONID:=============>'+cookie);
      login(cookie);
    });
  });
  idxReq.end();
}

function _getLoginPath(){
  var loginPath = settings.pages.login;
  loginPath = loginPath+'&campusId='+settings.campusId;
  var fwParams = '&FW_PARAMS=' + ['login.LoginEntry.campusId='+settings.campusId,'login.LoginEntry.whatPwd=true','login.LoginEntry.userName='+settings.user,'login.LoginEntry.password='+settings.password].join('%26');
  return loginPath + fwParams;
}

function login(cookie){
var opt = {
  host:settings.host,
  method :"post",
  path : _getLoginPath(),
  headers :{
    protocol :settings.protocol||'http',
      referer : settings.referer||'http://'+settings.host,
    "user-agent":settings.userAgent,
    'cookie':cookie
  }
}
console.log('login path:=============>'+opt.path);
var req = http.request(opt, function(resp){
  var respData = "";
  resp.on("data", function(chunk){
    respData += chunk;
  });
  resp.on("end", function(){
    var file = fs.createWriteStream('./tcc.html');
    file.write(respData,"utf-8");
    //if(_isLoginSuccess(respData)){
      getEmailList(cookie);
    //};
  });
});
req.end();
}

function getEmailList(cookie){
  var opt = {
      host:settings.host,
      path:settings.pages.getEmailList,
      method:'get',
      headers:{
        protocol :settings.protocol||'http',
          referer : settings.referer||'http://'+settings.host,
      "user-agent":settings.userAgent,
      'Cookie':cookie
    }
  };
  console.log('start get mail list:============>'+opt.path);
  var req = http.request(opt, function(resp){
    var emailList = fs.createWriteStream('./emailList.html');
     var respData = "";
     resp.on("data", function(chunk){
       //console.log('get email list chunk');
       respData+=chunk;
     });
     resp.on("end", function(){
       _printEmailSubject(respData);
       //emailList.write(respData);
     })
  });
   req.end();
}

function logout(cookie){
  var opt = {
    host:settings.host,
    path:settings.pages.logout+settings.campusId,
    method :'get',
    headers:{
      protocol :settings.protocol||'http',
        referer : settings.referer||'http://'+settings.host,
      cookie : cookie,
      'user-agent':settings.userAgent,
    }
  };
  var req = http.request(opt, function(resp){
    resp.on('data', function(){
      console.log('start logout now!!!!');
    });
    resp.on('end', function(){
      console.log('user has logout!');
    });
  });
  req.end();
}

function _isLoginSuccess(content){
   if(!content){
     return true;
   }
   var handler = new htmlparser.DefaultHandler(function (error, dom) {
    if (error){
      return false;
    }else{
      var msgArea = htmlparser.DomUtils.getElementById('ccMsgArea', dom);
      var errInfo = htmlparser.DomUtils.getElementsByTagName('SPAN',msgArea);
      console.log(errInfo[0]);
     if(errInfo[0]){
        console.log(errInfo[0].children[0].data);
        return false;
     }else{
       return true;
     }
     return true;
    }  
  });
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(content);
}

function _printEmailSubject(content){
  var handler = new htmlparser.DefaultHandler(function (error, dom) {
    if (error){
    }else{
      var emailBody = htmlparser.DomUtils.getElementById('mailList',dom);
      var subjects = htmlparser.DomUtils.getElementsByTagName('A',emailBody);
      //sys.debug(sys.inspect(subjects, false, null));
      subjects.forEach(function(sb){
        console.log("=============================");
        console.log(sb.children[0].data);
      });
    }
});
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(content);
}