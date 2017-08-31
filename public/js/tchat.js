var preload    = 0,
    getSegment = function (url, index) {
  return url.replace(/^https?:\/\//, '').split('/')[index];
}

$("#loadMore").click(()=>{
    var lastTime = $("#message").children().eq(0).find('span').text(),
        room   = getSegment(window.location.href, 2);
    $.ajax({
      type: 'POST',
      data: JSON.stringify({lastTime: lastTime, room: room}),
      contentType: 'application/json',
      url: 'http://localhost:3030/messages/loadMore',
      success: function(data) {
        if (data === "Error")
        {
          $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Error</strong> Something went Wrong</div>");
        }
        else {
          $('#message').prepend(data);
          $('#message').scrollTop();
        }
      }
    });
});

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
