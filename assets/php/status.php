<?php 

$hostname = "au-cdbr-azure-southeast-a.cloudapp.net";
$username = "bfeace5cc210be";
$password = "cfe2e899";
$database = "govhack2015bne";

$response = array();
$mysqli = new mysqli($hostname, $username, $password, $database);
/* check connection */
if ($mysqli->connect_errno) {
	    printf("Connect failed: %s\n", $mysqli->connect_error);
		    exit();
}

$values = array( # no string here - if there is, remember to escape_string()
	(int) $_GET['uId'],
	(int) $_GET['status'],
	(float) $_GET['lat'],
	(float) $_GET['lon'],
	date("'Y-m-d H:i:s'")
);
$values = implode(",", $values);
$sql = "INSERT INTO status (uId, sCode, lat, lon, timestamp) VALUES ($values);";
if (mysqli_query($mysqli, $sql)) {
	   $response['status'] = "success";
} else {
	   $response['status'] = "failed";
}

send_response($response);

/**
* Sends the response.
*/
function send_response($response) {
	if ( !empty($_GET['callback']) ) {
		echo $_GET['callback'] . '(' . json_encode($response) . ')';
	}
	else {
		echo json_encode($response);
	}
}