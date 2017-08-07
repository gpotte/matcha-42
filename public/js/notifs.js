function checkNotifs(){
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: 'http://localhost:3030/notifications',
    success: function(data) {
      if (data !== "Error")
        $('#notif-container').html(data);
      console.log(data);
    }
  });
}

///ONCLICK REMOVE TOMATO AND GIVE NOTIF === 0

/// On load check for notifs ///
checkNotifs();

setInterval(()=>{
  checkNotifs();
}, 8500)
/// On load check for notifs ///
