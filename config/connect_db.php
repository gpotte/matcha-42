<?php
function  connect_db()
{
  $DB_DSN = "mysql:dbname=matcha;host=localhost;";
  $DB_USER = "root";
  $DB_PASSWORD = "root";
  try {
    $pdo = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
  }
  catch(PDOException $ex){
    $msg = "Failed to connect to the database";
  }

  return ($pdo);
}
?>
