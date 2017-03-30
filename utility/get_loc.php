<?php
  function get_post_code(){
    if (isset($_SERVER['HTTP_CLIENT_IP']))
      $user_ip = $_SERVER['HTTP_CLIENT_IP'];
    else
     $user_ip = $_SERVER['REMOTE_ADDR'];
    $ch1 = curl_init ('https://api.ipify.org?format=json');
    curl_setopt($ch1, CURLOPT_HEADER, 0);
    curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($ch1);
    $result = json_decode($result, true);
    var_dump($result);
    // $ch = curl_init("https://freegeoip.net/json/");
    // curl_setopt($ch, CURLOPT_HEADER, 0);
    // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //
    // $result = curl_exec($ch);
    // $result = json_decode($result, true);
    // print_r ($result["zip_code"]);
    // curl_close($ch);
  }
 ?>
