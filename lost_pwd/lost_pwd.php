<?php
  include_once (__DIR__."/../config/connect_db.php");
  include_once (__DIR__."/../mail/send_mail.php");

  $pdo = connect_db();
  $query = "SELECT acc_hash FROM users where login LIKE ? AND mail LIKE ?";
  $sth = $pdo->prepare($query);
  $sth->execute(array($_POST["login"], $_POST["mail"]));
  $acc_hash = $sth->fetch();
  if (!$acc_hash)
    echo("sorry we can't recognize you");
  else
  {
    pwd_lost_mail($_POST["login"], $_POST["mail"], $acc_hash["0"]);
    echo "A mail have been sent to you to reset your password";
  }
  ?>
