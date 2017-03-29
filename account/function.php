<?php
session_start();
function get_img($id){
  echo "<div class=image-upload>
        <label for=input_".$id."><img src=../ressources/plus.png></img></label>
        <input id=input_".$id." type=file accept=image/* />
        </div>";
}
?>
