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
      url: 'http://localhost:3030/user/new',
      success: function(data) {
        if (data === "username taken")
        {
          $(".container").prepend("<div class='alert alert-danger alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Error</strong> this username is already taken </div>");
        }
        if (data === "success")
        {
          $(".container").prepend("<div class='alert alert-success alert-dismissable fade in'>\
          <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
          <strong>Success</strong> we are sending you a confirmation mail </div>");
        }
        console.log(data);
      }
    });
});
