<?php
  include_once(__DIR__."/../config/connect_db.php");
  include_once(__DIR__."/function.php");
  session_start();
  if (!isset($_SESSION["login"]))
    header("Location: ../index.php");
?>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="../css/index.css">
  <link rel="stylesheet" type="text/css" href="../css/account.css">
  <meta charset="UTF-8">
  <link rel="icon" href="../ressources/favicon.ico">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <title>
    Matcha <?php echo ": ". $_SESSION["login"];?>
  </title>
</head>
<body>
  <div id=header>
    <h1>Welcome to Matcha</h1>
    <h3>My account</h3>
      <a href="login/logout.php"><img src="../ressources/logout.svg"></img></a>
      <a href="account/index.php"><img src="../ressources/account.svg"></img></a>
      <img src="../ressources/notif.png" title="notif"></img>
  </div>
  <div id="body">
    <div id=profile_pics>
      <div id=pic_1_row>
        <div id="pp"><?php get_img(1)?></div>
        <div class="pic_div"><?php get_img(2)?></div>
      </div>
        <div id=pic_2_row>
        <div class="pic_div"><?php get_img(3)?></div>
        <div class="pic_div"><?php get_img(4)?></div>
        <div class="pic_div"><?php get_img(5)?></div>
      </div>
    </div>
    <div id=info>
      <?php get_info(); ?>
    </div>
    <div id=bio>
      <?php get_bio() ?>
    </div>
  </div>
<div id="footer"><h5>Matcha by Gpotte ;)</h5></div>
</body>
<script src=index.js></script>
</html>
