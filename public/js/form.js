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
  console.log(data);
  //$.ajax({
  //  type: 'POST',
  //});
});
