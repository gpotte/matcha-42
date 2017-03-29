<?php
function confirmation_mail($login, $mail, $acc_hash)
 {
   $link = "http://localhost:8080/matcha/mail/mail-confirmation.php?id=".$acc_hash."&log=".$login;
   $subject = "Inscription Matcha";
   $content = "<html>
                 <head>
                   <title> Matcha </title>
                   </head>
                   <body>
                   <p>Bonjour " . $login . " pour finaliser ton inscription clique sur ce lien</p>
                   <a href='".$link."'>confirmation de compte ! </a>
                   <p> ou va directement ici ".$link."
                   </body>";
   $headers  = 'MIME-Version: 1.0' . "\r\n";
   $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
   $headers .= 'From: matcha <noreply@matcha.lol>' . "\r\n";
   mail($mail, $subject, $content, $headers);
 }

 function pwd_lost_mail($login, $mail, $acc_hash)
  {
    $link = "http://localhost:8080/matcha/lost_pwd/reset_pwd.php?id=".$acc_hash."&log=".$login;
    $subject = "Matcha mot de passe perdu";
    $content = "<html>
                  <head>
                    <title> Matcha </title>
                    </head>
                    <body>
                    <p>Bonjour " . $login . " pour reinitialiser ton mot de passe</p>
                    <a href='".$link."'>clique ici ! </a>
                    <p> ou va directement ici ".$link."
                    </body>";
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= 'From: matcha <noreply@matcha.lol>' . "\r\n";
    mail($mail, $subject, $content, $headers);
  }
 ?>
