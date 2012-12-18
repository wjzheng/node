module.exports = {
  // host : 'my.campuscruiser.com',
  // host : 'ccstage.campuscruiser.com',
  host : '192.168.10.210',
  userAgent : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
  campusId : 1,
  pages : {
    index : '/q?pg=home_welcome&cp=',
    login : '/q?pg=login&tg=LoginEntry&cmd=SignIn',
    getEmailList : '/emPageServlet?cx=u&pg=papp&tg=Email-checkmail&cmd=checkmail',
    logout : '/q?pg=logout&cmd=SignOut&cx=22.'
  },
  //protocol : 'https',
  //referer : 'https://prod.campuscruiser.com/',
  user : 'adminkz',
  password : '111111'
}