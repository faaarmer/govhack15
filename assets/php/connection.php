<?php

$mysqli = new mysqli('au-cdbr-azure-southeast-a.cloudapp.net','bc3b3b4bd143f0','c011084f','ghack');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

global $mysqli;