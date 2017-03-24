/*  TRANSITION POUR LES FORMULAIRES DE SIGNUP/LOGIN   */
$("#get_log").click(function(){
  $("#get_log").css("background-color", "#E5E5E5");
  $("#get_sign").css("background-color", "white");
  $("#logform").removeClass("invisible_tab")
  $("#signform").addClass("invisible_tab");
});

$("#get_sign").click(function(){
  $("#get_sign").css("background-color", "#E5E5E5");
  $("#get_log").css("background-color", "white");
  $("#signform").removeClass("invisible_tab");
  $("#logform").addClass("invisible_tab");
});

/*  TRANSITION POUR LES FORMULAIRES DE SIGNUP/LOGIN   */


$("#logform").submit(function(ev){
  ev.preventDefault();
  location.reload();
});

$("#signform").submit(function(ev){
  ev.preventDefault();
});
