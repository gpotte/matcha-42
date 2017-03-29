<?php
  function form()
  {
    echo '<div id="form_tab">
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
        <input type=checkbox id=cgu required><p id="cgu_value">J\'accepte Les CGU *</p></input><br>
        <input type=submit value="validate">
      </form>
      <a  href="lost_pwd/index.php"><button id="lost">password lost</button></a>
      <h3 id=result></h3>
    </div>';
  }
 ?>
