/*  COULEURS DES INPUTS SELON LA VALIDITE */

$("#signform > #login").change(function(){
  var $log = $("#signform > #login").val();
  validLogin($log, function(output){
  if (output)
  {
    $("#signform > #login").css("border-color", "red");
    $("#result").html(output);
  }
  else
  {
    $("#signform > #login").css("border-color", "green");
    $("#result").html(null);
  }
  });
});

$("#mail").change(function(){
  var $mail = $("#mail").val();
  validMail($mail, function(output){
  if (output)
  {
    $("#mail").css("border-color", "red");
    $("#result").html(output);
  }
  else
  {
    $("#mail").css("border-color", "green");
    $("#result").html(null);
  }
  });
});

$("#signform > #password").change(pwdSecurity);

function pwdSecurity(){
  var $pwd = $("#signform > #password").val();
  validPwd($pwd, function(output){
  if (output)
  {
    $("#signform > #password").css("border-color", "red");
    $("#result").html(output);
  }
  else
  {
    $("#signform > #password").css("border-color", "green");
    $("#result").html(null);
  }
  });
}

$("#check").change(function(){
  var $check = $("#check").val();
  var $pwd = $("#signform > #password").val();
  validCheck($check, $pwd, function(output){
  if (output)
  {
    $("#check").css("border-color", "red");
    $("#signform > #password").css("border-color", "red");
    $("#result").html(output);
  }
  else
  {
    $("#check").css("border-color", "green");
    pwdSecurity();
    $("#result").html(null);
  }
  });
});
/*  COULEURS DES INPUTS SELON LA VALIDITE */

/* AJAX POUR VERIFIER LES INPUTS */
function validPwd($pwd, handleData)
{
  $.post(
    "index/field_validity.php",
    {
      data: $pwd,
      op: "pwd",
    },
    function (data){
      handleData(data);
    }
  );
}

function validMail($mail, handleData)
{
  $.post(
    "index/field_validity.php",
    {
      data: $mail,
      op: "mail",
    },
    function (data){
      handleData(data);
    }
  );
}

function validLogin($login, handleData)
{
  $.post(
    "index/field_validity.php",
    {
      data: $login,
      op: "login",
    },
    function (data){
      handleData(data);
    }
  );
}

function validCheck($check, $pwd, handleData)
{
  $.post(
    "index/field_validity.php",
    {
      check: $check,
      pwd: $pwd,
      op: "check",
    },
    function (data){
      handleData(data);
    }
  );
}
/* AJAX POUR VERIFIER LES INPUTS */
