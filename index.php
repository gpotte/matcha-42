<?php
  include_once (__DIR__.'/config/setup.php');

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
      <img src="ressources/account.svg" title='<?php echo $_SESSION["login"]; ?>'></img>
    <?php }?>
  </div>
<!-- CREATION DE COMPTE OU LOGIN -->
<?php   if (!isset($user)){ ?>
  <div id="form_tab">
    <div id="button_form">
      <button id="get_log">Log-in</button>
      <button id="get_sign">Sign-up</button>
    </div>
    <form class="invisible_tab" id="logform">
      <input type="text" id="login" name="login" placeholder="login *" required><br>
      <input type="password" id=password name="pwd" placeholder="Password *" required><br>
      <input type=submit value="validate">
    </form>
    <form id="signform">
      <input type="text" id=login name="login" placeholder="Login *" required><br>
      <input type="text" id=name name="name" placeholder="Name *" required><br>
      <input type="text" id=firstname name="firstname" placeholder="First Name *"required><br>
      <input type="mail" id=mail name="mail" placeholder="Mail *" required><br>
      <input type="password" id=password name="pwd" placeholder="Password *" required><br>
      <input type="password" id=check name="check" placeholder="Repeat Password *" required><br>
      <select id="sexe" name="sex">
        <option value=null>sexe</option>
        <option value=male>homme</option>
        <option value=female>femme</option>
      </select><br>
      <select id="pref" name=pref>
        <option value=null>preference</option>
        <option value=male>homme</option>
        <option value=female>femme</option>
        <option value=both>les deux</option>
      </select><br>
      <input type=checkbox id=cgu required><p id="cgu_value">J'accepte Les CGU *</p></input><br>
      <input type=submit value="validate">
    </form>
    <a  href="lost_pwd/index.php"><button id="lost">password lost</button></a>
    <h3 id=result></h3>
  </div>
<?php }?>
<!-- CREATION DE COMPTE OU LOGIN -->
<div id="footer"><h5>Matcha by Gpotte ;)</h5></div>
</body>
<script src=index/field_validity.js></script>
<script src=index/login_page.js></script>
</html>
