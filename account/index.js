$(window).ready(function(){
  var height = $(".pic_div").width(),
      pp_height = $("#pp").width();

  $(".pic_div").css("height", height);
  $("#pp").css("height", pp_height);
});

$(window).resize(function(){
  var height = $(".pic_div").width(),
      pp_height = $("#pp").width();

  $("#pp").css("height", pp_height);
  $(".pic_div").css("height", height);
});
