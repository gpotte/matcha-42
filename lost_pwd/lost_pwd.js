$("#form").submit(function(ev){
  ev.preventDefault();
  $.post(
    "lost_pwd.php",
    $.param($("#form").serializeArray()),
    function (data){
      $("#result").html(data);
    }
  )
});
