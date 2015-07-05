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
	   $result = $mysqli->query("SELECT uId, fullName FROM relation WHERE relation.rid = '$rid'");
	   $row = $result->fetch_assoc();
	   $data['rid'] = $rid;
	   $data['status'] = $status;
	   $data['lat'] = $lat;
	   $data['lon'] = $lon;
	   $data['relationName'] = $row['fullName'];;
	   $data['date'] = $date;
	   $response['user_id']=$row['uId'];
	   $pusher->trigger($row['uId'], 'status_change', $data);
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