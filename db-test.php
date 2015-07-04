<?php

$mysqli = new mysqli('au-cdbr-azure-southeast-a.cloudapp.net','bfeace5cc210be','cfe2e899','govhack2015bne');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}