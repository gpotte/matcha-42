var preload    = 0,
    getSegment = function (url, index) {
  return url.replace(/^https?:\/\//, '').split('/')[index];
}
$(function () {
  var socket = io();
  $(document).ready(function(){
    socket.emit('subscribe', {user: user, room: getSegment(window.location.href, 2)});
  });

  $('#tchatForm').submit(function(){
    socket.emit('chat message', {msg: $('#tchatInput').val(), room: getSegment(window.location.href, 2)});
    $('#tchatInput').val('');
    return false;
  });

  socket.on('chat message', (msg)=>{
    var now = new Date(Date.now());
    if (msg.pseudo === user)
      $('#message').append("<li class='list-group-item'><strong>"+
                            msg.pseudo + " </strong>"+ msg.msg +
                            "<span class='badge'>" + now.getHours() + ":" + now.getMinutes() + "</span></li>");
    else
      $('#message').append("<li class='list-group-item disabled'><strong>"+
                            msg.pseudo + " </strong>"+ msg.msg +
                            "<span class='badge'>" + now.getHours() + ":" + now.getMinutes() + "</span></li>");
      $('#message').scrollTop(1000);
  });

  socket.on('preload', (msg)=>{
    if (preload < 10){
      preload++;
    if (msg.pseudo === user)
      $('#message').append("<li class='list-group-item'><strong>"+
                            msg.pseudo + " </strong>"+ msg.msg +
                            "<span class='badge'>" + msg.time + "</span></li>");
    else
      $('#message').append("<li class='list-group-item disabled'><strong>"+
                            msg.pseudo + " </strong>"+ msg.msg +
                            "<span class='badge'>" + msg.time + "</span></li>");
        $('#message').scrollTop(1000);
      }
  });

});
