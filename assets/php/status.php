<?php 

include_once 'connection.php';
require('../../vendor/autoload.php');

$pusher = new Pusher('9b198123b867650ff8cb', 'cc8bbf10251c6efbd0d2', '128293');

$response = array();
/* check connection */
if ($mysqli->connect_errno) {
	    printf("Connect failed: %s\n", $mysqli->connect_error);
		    exit();
}

$rid = 	(int) $_GET['rid'];
$status = (int) $_GET['status'];
$lat = (float) $_GET['lat'];
$lon = (float) $_GET['lon'];
$date = date("'Y-m-d H:i:s'");

$sql = "INSERT INTO status (rid, sCode, lat, lon, sTimestamp) VALUES ($rid,$status,$lat,$lon,$date) ON DUPLICATE KEY UPDATE sCode = $status, lat=$lat,lon=$lon,sTimestamp=$date;";
if (mysqli_query($mysqli, $sql)) {
	   $response['status'] = "success";
	   $data = array();
	   $result = $mysqli->query("SELECT uId FROM users, relations WHERE relations.rid = '$rid' AND relations.uId = users.uId");
	   $row = $result->fetch_assoc();
	   echo $row['uId'];
	   $data['rid'] = $rid;
	   $data['status'] = $status;
	   $data['lat'] = $lat;
	   $data['lon'] = $lon;
	   $data['date'] = $date;
	   $pusher->trigger($row['uId'], 'my_event', $data);
} else {
		error_log(mysqli_error($mysqli));
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