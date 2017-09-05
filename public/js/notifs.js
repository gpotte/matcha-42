var getSegment = function (url, index) {
      return url.replace(/^https?:\/\//, '').split('/')[index];
    }

function checkNotifs(){
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: 'http://localhost:3030/notifications',
    success: function(data) {
      if (data !== "Nothing")
        $('#notif-container').html(data);
    }
  });
}

function checkUnread(){
  $.ajax({
    type: 'POST',
    data: JSON.stringify({loc: getSegment(window.location.href, 2)}),
    contentType: 'application/json',
    url: 'http://localhost:3030/checkUnread',
    success: function(data) {
      if (data !== "Nothing")
      {
        $(".container").prepend("<div class='alert alert-success alert-dismissable fade in'>\
        <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
        You have some unread messages</div>");
        setTimeout(function() {
                $(".alert").alert('close');
            }, 2000);
      }
    }
  });
}

///ONCLICK REMOVE TOMATO AND GIVE NOTIF === 0
$('#notif-container').on("click", '#notif-active', ()=>{
  $('#notif-active').removeAttr("id");
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: 'http://localhost:3030/notifications/remove',
    success: function(data){
      console.log(data);
    }
  });
});

/// On load check for notifs and unread messages///
checkNotifs();
checkUnread();

setInterval(()=>{
  checkNotifs();
  checkUnread();

}, 8500)
/// On load check for notifs and unread messages///
