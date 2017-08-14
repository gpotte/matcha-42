$('#username').focus(()=> {
  $('#usernameCond').removeClass("inactive");
  $('#usernameCond').addClass('active');
});

$('#username').blur(()=>{
  $('#usernameCond').removeClass("active");
  $('#usernameCond').addClass('inactive');
});

$('#password').focus(()=> {
  $('#passwordCond').removeClass("inactive");
  $('#passwordCond').addClass('active');
});

$('#password').blur(()=>{
  $('#passwordCond').removeClass("active");
  $('#passwordCond').addClass('inactive');
});

$('#signInForm').submit((ev)=>{
  var formdata = $('#signInForm').serializeArray();
  var data = {};
  $(formdata).each(function(index, obj){
    data[obj.name] = obj.value;
  });
  ev.preventDefault();
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://9660d9a5.ngrok.io/user/new',
      success: function(data) {
        if (data === "username taken")
        {
          $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Error</strong> this username is already taken </div>");
        }
        if (data === "mail taken")
        {
          $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Error</strong> this mail is already taken </div>");
        }
        if (data === "Error")
        {
          $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Error</strong> An error Occured please contact us </div>");
        }
        if (data === "Success")
          $(location).attr('href', "http://9660d9a5.ngrok.io/");
        console.log(data);
      }
    });
});

$('#logInForm').submit((ev)=>{
  var formdata = $('#logInForm').serializeArray();
  var data = {};
  $(formdata).each(function(index, obj){
    data[obj.name] = obj.value;
  });
  ev.preventDefault();
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://9660d9a5.ngrok.io/login',
      success: function(data) {
        if (data === "Error")
        {
          $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Error</strong> Wrong Login or Password</div>");
        }
        if (data === "Success"){
          $(location).attr('href', "http://9660d9a5.ngrok.io/");
        }
        console.log(data);
      }
    });
});

$('#lostForm').submit((ev)=>{
  var formdata = $('#lostForm').serializeArray();
  var data = {};
  $(formdata).each(function(index, obj){
    data[obj.name] = obj.value;
  });
  ev.preventDefault();
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://9660d9a5.ngrok.io/login/lost',
      success: function(data) {
        if (data === "Error")
        {
          $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Error</strong> Wrong Username or Email</div>");
        }
        if (data === "Success")
          $(".container").prepend("<div class='alert alert-success alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Success </strong>we've just sent you an email to reset your password</div>");
        console.log(data);
      }
    });
});

$('#resetForm').submit((ev)=>{
  var formdata = $('#resetForm').serializeArray();
  var data = {};
  $(formdata).each(function(index, obj){
    data[obj.name] = obj.value;
  });
  ev.preventDefault();
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://9660d9a5.ngrok.io/login/newPassword',
      success: function(data) {
        if (data === "Error")
        {
          $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Error</strong></div>");
        }
        if (data === "Wrong Password")
        {
          $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Error</strong> The two fields must be the same</div>");
        }
        if (data === "Success")
          $(location).attr('href', "http://9660d9a5.ngrok.io/");
        console.log(data);
      }
    });
});
