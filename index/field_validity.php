<?php
  if ($_POST["op"] == "login")
    checkLogin($_POST["data"]);
  if ($_POST["op"] == "mail")
    checkMail($_POST["data"]);
  if ($_POST["op"] == "pwd")
    checkPwd($_POST["data"]);
    if ($_POST["op"] == "check")
      checkCheck($_POST["check"], $_POST["pwd"]);

  function checkLogin($login)
  {
    if (strlen($login) < 6)
      echo "Login Too Short";
    /* CHECK IF LOGIN IS TAKEN */
  }

  function checkMail($mail)
  {
    /* CHECK IF MAIL IS TAKEN */
  }

  function checkPwd($pwd)
  {
    if (strlen($pwd) < 8)
      echo "Password Too Short";
    else if (!preg_match("#[0-9]+#", $pwd) || !preg_match("#[a-zA-Z]+#", $pwd))
      echo "Your Password must contains letters and numbers";
  }

  function checkCheck($check, $pwd)
  {
    if ($check != $pwd)
      echo "Password and Password confirmation must be the same";
  }
?>
