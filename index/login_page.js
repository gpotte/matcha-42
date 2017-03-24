/*  TRANSITION POUR LES FORMULAIRES DE SIGNUP/LOGIN   */
$("#get_log").click(function(){
  $("#get_log").css("background-color", "white");
  $("#get_sign").css("background-color", "#E5E5E5");
  $("#logform").removeClass("invisible_tab")
  $("#signform").addClass("invisible_tab");
});

$("#get_sign").click(function(){
  $("#get_sign").css("background-color", "white");
  $("#get_log").css("background-color", "#E5E5E5");
  $("#signform").removeClass("invisible_tab");
  $("#logform").addClass("invisible_tab");
});

/*  TRANSITION POUR LES FORMULAIRES DE SIGNUP/LOGIN   */


$("#logform").submit(function(ev){
  ev.preventDefault();
  ajaxLogIn(function(output){
    if (output == "Success")
    {
      $("#result").html("A confirmation Mail have been sent to your account");
        location.reload();
    }
    else
      $("#result").html(output);
      // LogInError(output);
  });
});

$("#signform").submit(function(ev){
  ev.preventDefault();
  ajaxSignUp(function(output){
    if (output == "Success")
      $("#result").html("A confirmation Mail have been sent to your account");
    else
      $("#result").html(output);
      //signUpError(output);
  });
});

/*          AJAX SENDER         */

function ajaxSignUp(handleData){
$.post(
  "login/signup.php",
  $.param($("#signform").serializeArray()),
  function (data){
    handleData(data);
  }
);}

function ajaxLogIn(handleData){
$.post(
  "login/login.php",
  $.param($("#logform").serializeArray()),
  function (data){
    handleData(data);
  }
);}

/*          AJAX SENDER         */
