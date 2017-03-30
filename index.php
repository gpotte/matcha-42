<?php
  include_once (__DIR__.'/index/form.php');
  include_once (__DIR__.'/config/setup.php');
  include_once (__DIR__.'/utility/get_loc.php');

  create_db();
  session_start();
  if (isset($_SESSION["login"]))
      $user = $_SESSION["login"];
?>
<html>
<head>
<?php if (!isset($user)){ ?>
  <link rel="stylesheet" type="text/css" href="css/form.css">
<?php } else { ?>
  <link rel="stylesheet" type="text/css" href="css/index.css">
<?php }?>
  <meta charset="UTF-8">
  <link rel="icon" href="ressources/favicon.ico">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <title>
    Matcha <?php if (isset($_SESSION["login"])){echo ":".$user;}?>
  </title>
</head>
<body>
  <div id=header>
    <h1>Welcome to Matcha</h1>
    <h3>The best meeting experience</h3>
    <?php if (isset($user)){ ?>
      <a href="login/logout.php"><img src="ressources/logout.svg"></img></a>
      <a href="account/index.php"><img src="ressources/account.svg"></img></a>
      <img src="ressources/notif.png" title="notif"></img>
    <?php }?>
  </div>
<!-- CREATION DE COMPTE OU LOGIN -->
<?php   if (!isset($user)){
  form();
 }  ?>
<!-- CREATION DE COMPTE OU LOGIN -->
<div id="footer"><h5>Matcha by Gpotte ;)</h5>
<?php get_post_code()?>
</div>
</body>
<script src=index/field_validity.js></script>
<script src=index/login_page.js></script>
</html>
