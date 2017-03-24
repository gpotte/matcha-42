<?php
include_once (__DIR__."/../config/connect_db.php");

$pdo = connect_db();
$login = $_POST["login"];
$name = $_POST["name"];
$firstname = $_POST["firstname"];
$mail = $_POST["mail"];
$pwd = $_POST["pwd"];
$sex = $_POST["sex"];
$pref = $_POST["pref"];
$acc_hash = hash(sha1, $mail . $pwd);
/*         CHECK ALL THE INFO           *//*         CHECK ALL THE INFO           *//*         CHECK ALL THE INFO           */

/* CHECK PASSWORD */
if (passwd_security($pwd) != "Success" || $pwd != $_POST["check"])
  return;
/* CHECK PASSWORD */
/* CHECK IF THE USER ALREADY EXIST */
$check_log = "SELECT login FROM users WHERE login LIKE ?";
$check_mail = "SELECT login FROM users WHERE mail LIKE ?";
$sth = $pdo->prepare($check_log);
$sth->execute(array($login));
if ($sth->fetch())
{
  echo "Login already Taken";
  return;
}
$sth = $pdo->prepare($check_mail);
$sth->execute(array($mail));
if ($sth->fetch())
{
  echo "Mail Already Taken";
  return;
}
/* CHECK IF THE USER ALREADY EXIST */
/* CHECK SIZE OF THE INFOS */
if (strlen($login) > 20 || strlen($name) > 20 || strlen($firstname) > 20)
{
  echo "your login or your name must be 20 characters max";
  return;
}
if (strlen($mail) > 55)
{
  echo "your mail is too long";
  return;
}
/* CHECK SIZE OF THE INFOS */
/*         CHECK ALL THE INFO           *//*         CHECK ALL THE INFO           *//*         CHECK ALL THE INFO           */
$pwd = hash(sha1, $pwd);
/*PREPARE QUERY */
if ($sex == "null" && $pref == "null")
{
  $query = "INSERT INTO `users` (`login`, `name`, `firstname`, `mail`, `passwd`, `acc_hash`) VALUES (?, ?, ?, ?, ?, ?)";
  $array = array($login, $name, $firstname, $mail, $pwd, $acc_hash);
}
else if ($sex != "null" && $pref == "null")
{
  $query = "INSERT INTO `users` (`login`, `name`, `firstname`, `sexe`, `mail`, `passwd`, `acc_hash`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  $array = array($login, $name, $firstname, $sex, $mail, $pwd, $acc_hash);
}
else if ($sex == "null" && $pref != "null")
{
  $query = "INSERT INTO `users` (`login`, `name`, `firstname`, `pref`, `mail`, `passwd`, `acc_hash`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  $array = array($login, $name, $firstname, $pref, $mail, $pwd, $acc_hash);
}
else
{
  $query = "INSERT INTO `users` (`login`, `name`, `firstname`, `sexe`, `pref`, `mail`, `passwd`, `acc_hash`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  $array = array($login, $name, $firstname, $sex, $pref, $mail, $pwd, $acc_hash);
}
/*PREPARE QUERY */
/*CREATE THE NEW USER */
$sth = $pdo->prepare($query);
$sth->execute($array);
/* SEND CONFIRMATION MAIL TO THE NEW USER */
// signUpMail($mail, $login, $acc_hash);
echo "Success";

function passwd_security($pwd){
  if (strlen($pwd) < 8 || !preg_match("#[0-9]+#", $pwd) || !preg_match("#[a-zA-Z]+#", $pwd))
    return "Error";
  else
    return "Success";
}
?>
