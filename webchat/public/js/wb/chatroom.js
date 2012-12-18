var chatroom = TCC.ns("tl.chatroom");

var chatroomlogic = {

  username : null,
  pwd : null,
  chatwith : null,
  server : null,
  lib : null,

  checkUser : function() {
    chatroomlogic.username = TCC.find("#myAccount").val();
    chatroomlogic.pwd = TCC.find("#myPwd").val();
    chatroomlogic.chatwith = TCC.find("#chatWith").val();
    chatroomlogic.server = TCC.find("#server").val();
    chatroomlogic.lib = TCC.find("#lib").val();
    if (this.username == null) {
      alert("please enter your account/email");
      return false;
    }
    if (this.chatwith == null) {
      alert("please enter account/email for your chat member");
      return false;
    }

    return true;

  },

  connectXMPP : function() {
    console.log("connectXMPP");
    wb.registerController(chatroomController);
  },

  initImageSlider : function() {
    console.log("init image slider");
    var imgList = [ {
      id : "1",
      imageSrc : "/img/tool/chatroom/x.jpg",
      tips : "美女1"
    }, {
      id : "2",
      imageSrc : "/img/tool/chatroom/y.jpg",
      tips : "美女2"
    }, {
      id : "3",
      imageSrc : "/img/tool/chatroom/x.jpg",
      tips : "美女3"
    }, {
      id : "4",
      imageSrc : "/img/tool/chatroom/y.jpg",
      tips : "美女4"
    }, {
      id : "5",
      imageSrc : "/img/tool/chatroom/x.jpg",
      tips : "美女5"
    }, {
      id : "6",
      imageSrc : "/img/tool/chatroom/y.jpg"
    }, {
      id : "7",
      imageSrc : "/img/tool/chatroom/x.jpg"
    }, {
      id : "8",
      imageSrc : "/img/tool/chatroom/y.jpg"
    }, {
      id : "9",
      imageSrc : "/img/tool/chatroom/x.jpg"
    }, {
      id : "10",
      imageSrc : "/img/tool/chatroom/y.jpg"
    }, {
      id : "11",
      imageSrc : "/img/tool/chatroom/x.jpg"
    }, {
      id : "12",
      imageSrc : "/img/tool/chatroom/y.jpg"
    }, {
      id : "13",
      imageSrc : "/img/tool/chatroom/x.jpg"
    }, {
      id : "14",
      imageSrc : "/img/tool/chatroom/y.jpg"
    } ];

    TCC.find("#t1").imageSlider({
      dataSource : imgList,
      width : 794,
      showTips : false,
      clickItemFn : function(itemId) {
        wb.loadImage($(".imageItem[id='" + itemId + "']").find("img").attr("src"));
        console.log("itemId:" + itemId);
      },

      clickSubItemFn : function(parentId, subItemId) {
        console.log("parentId:" + parentId + ",subItemId:" + subItemId);
      }
    });
  },

  initMessageList : function() {
    console.log("init msg list");
    messageList.init("#chat");
    messageList.registerController(chatroomController);
  },

  initWhiteboard : function() {
    console.log("init white board");
    wb.init(".whiteboard", {
      width : 800,
      height : 450,
      imagePos : "center",
      toolbarPos : "left",
      moveImage : true
    });
  },

  init : function() {
    var flag = chatroomlogic.checkUser();
    if (flag) {
      chatroomController.init(chatroomlogic.server, chatroomlogic.username, chatroomlogic.pwd, chatroomlogic.lib, chatroomlogic.chatwith);
      chatroomlogic.initWhiteboard();
      chatroomlogic.initMessageList();
      chatroomlogic.initImageSlider();
      if (chatroomlogic.chatwith != "") {
        chatroomlogic.connectXMPP();
      } else {
        chatroomlogic.loadChatWith();
      }
    }
  },

  loadChatWith : function() {
    console.log("loadChatWith");
    var callback = function(data) {
      var userLogin = TCC.find(data).html();
      if (userLogin != null) {
        chatroom.logic.chatwith = userLogin;
        TCC.find("#chatWith").val(userLogin);
        chatroom.logic.connectXMPP();
      } else {
        setTimeout("chatroom.logic.loadChatWith()", 2000);
      }
    }
    TCC.get("/q?pg=LoadChatUser", null, callback);
  }

}

chatroom.logic = chatroomlogic;
TCC.ready("#ccbody", chatroom.logic.init);
