$(function() {
  // init whiteboard
  wb.init(".whiteboard", {
    width : 1000,
    height : 450,
    imagePos : "center",
    toolbarPos : "left",
    moveImage : true
  });
  // connect to server side
  var socket = io.connect();
  socket.on('conn', function(data) {
    $("#sysMsg").html(data.msg).fadeTo(2000, 0);
  });
});