<?php
function create_db(){
  $DB_DSN = "mysql:host=localhost;";
  $DB_USER = "root";
  $DB_PASSWORD = "root";
  $db = "CREATE DATABASE IF NOT EXISTS matcha; USE matcha;";

  $userTable = "CREATE TABLE IF NOT EXISTS `matcha`.`users` (
                `id` INT NOT NULL AUTO_INCREMENT ,
                `login` VARCHAR(20) NOT NULL ,
                `name` VARCHAR(20) NOT NULL ,
                `firstname` VARCHAR(20) NOT NULL ,
                `sexe` SET('male','female') NULL ,
                `pref` SET('male','female','both') NOT NULL DEFAULT 'both',
                `mail` VARCHAR(55) NOT NULL ,
                `passwd` VARCHAR(41) NOT NULL ,
                `verified` BOOLEAN NOT NULL DEFAULT FALSE ,
                `acc_hash` VARCHAR(41) NOT NULL ,
                `bio` VARCHAR(350) NULL,
                `score` INT NOT NULL DEFAULT 0,
                `localisation` VARCHAR(6) NOT NULL,
                PRIMARY KEY (`id`)) ENGINE = InnoDB;";

                try {
                  $pdo = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
                }
                catch(PDOException $ex){
                  $msg = "Failed to connect to the database";
                }

                 $pdo->exec($db);
                 $pdo->exec($userTable);
}
?>
