<?php
include_once (__DIR__."/../config/connect_db.php");
session_start();

$pdo = connect_db();
  /*connect to the db */

  /* Request to log the user */
  $check_log = "SELECT login FROM users WHERE
                login LIKE ? AND passwd LIKE ? AND verified LIKE 1";
    $sth = $pdo->prepare($check_log);
    $sth->execute(array($_POST["login"], hash(sha1, $_POST["pwd"])));
    if ($log = $sth->fetch())
    {
      $_SESSION["login"] = $_POST["login"];
      echo "Success";
    }
    else
      echo "Error";
 ?>
