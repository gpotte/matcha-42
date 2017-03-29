<?php
  include_once (__DIR__."/../config/connect_db.php");
  session_start();

  $pdo = connect_db();
  $pwd = hash(sha1, $_POST["password"]);
  if (passwd_security($_POST["password"], $_POST["check"]) != "Success")
  {
    echo (passwd_security($_POST["password"], $_POST["check"]));
    return;
  }
  $query = "UPDATE users SET passwd = ? WHERE login LIKE ? AND acc_hash LIKE ?";
  $sth = $pdo->prepare($query);
  $sth->execute(array($pwd, $_POST["login"], $_POST["acc_hash"]));
  $modify = "UPDATE users SET acc_hash = ? WHERE login LIKE ?";
  $new_hash = hash(sha1, $_GET["log"] . (string)random_int(0, 700000));
  $sth = $pdo->prepare($modify);
  $sth->execute(array($new_hash, $_POST["login"]));
  $_SESSION["login"] = $_POST["login"];
  echo "Success";

function passwd_security($pwd, $check){
    if (strlen($pwd) < 8 || !preg_match("#[0-9]+#", $pwd) || !preg_match("#[a-zA-Z]+#", $pwd))
      return "Your password must be at least 8 characters and contain letters and numbers";
    else if ($pwd != $check)
      return ("the two fields must be the same");
    else
      return "Success";
}
 ?>
