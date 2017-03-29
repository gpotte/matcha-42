$("#form").submit(function(ev){
  ev.preventDefault();
  $.post(
    "new_pwd.php",
    $.param($("#form").serializeArray()),
    function(data){
      if (data == "Success")
        window.location = 'http://localhost:8080/matcha';
      $("#result").html(data);
    }
  )
});
