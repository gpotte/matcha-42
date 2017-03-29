<html>
<head>
  <link rel="stylesheet" type="text/css" href="../css/form.css">
  <meta charset="UTF-8">
  <link rel="icon" href="../ressources/favicon.ico">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <title>
    Matcha : Lost password
  </title>
</head>
<body>
  <div id=header>
    <h1>Welcome to Matcha</h1>
    <h3>Fill the form to have a new password</h3>
  </div>
  <div id="form_tab">
    <form id="form">
      <input type="password" name="password" placeholder="Password *" required><br>
      <input type="password" name="check" placeholder="Confirm your password *" required><br>
      <input type="hidden" name="acc_hash" value="<?php echo($_GET["id"]) ?>">
      <input type="hidden" name="login" value="<?php echo($_GET["log"]) ?>">
      <input type=submit value="validate">
    </form>
    <h3 id=result>Your password must be at least 8 characters and contain letters and numbers</h3>
  </div>
<div id="footer"><h5>Matcha by Gpotte ;)</h5></div>
</body>
<script src=reset_pwd.js></script>
</html>
