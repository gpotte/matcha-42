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
      <input type="text" id=login name="login" placeholder="Login *" required><br>
      <input type="mail" id=mail name="mail" placeholder="Mail *" required><br>
      <input type=submit value="validate">
    </form>
    <h3 id=result></h3>
  </div>
<div id="footer"><h5>Matcha by Gpotte ;)</h5></div>
</body>
<script src=lost_pwd.js></script>
</html>
