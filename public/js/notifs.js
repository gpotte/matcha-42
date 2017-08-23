function checkNotifs(){
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: 'http://340ef8cb.ngrok.io/notifications',
    success: function(data) {
      if (data !== "Nothing")
        $('#notif-container').html(data);
    }
  });
}

///ONCLICK REMOVE TOMATO AND GIVE NOTIF === 0
$('#notif-container').on("click", '#notif-active', ()=>{
  $('#notif-active').removeAttr("id");
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: 'http://340ef8cb.ngrok.io/notifications/remove',
    success: function(data){
      console.log(data);
    }
  });
});
/// On load check for notifs ///
checkNotifs();

setInterval(()=>{
  checkNotifs();
}, 8500)
/// On load check for notifs ///
