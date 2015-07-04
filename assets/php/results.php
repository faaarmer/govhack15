<?php
include('timeago.php');
$hostname = "au-cdbr-azure-southeast-a.cloudapp.net";
$username = "bfeace5cc210be";
$password = "cfe2e899";
$database = "govhack2015bne";
$sCode = array(1 => 'OK', 2 => 'Need help');
$mysqli = new mysqli($hostname, $username, $password, $database);
/* check connection */
if ($mysqli->connect_errno) {
	    printf("Connect failed: %s\n", $mysqli->connect_error);
		    exit();
}
/* Select queries return a resultset */
$sql = "select givenName, surname, sCode, timestamp, lat, lon from users join (select p1.* from status p1 left join status p2 on (p1.uId = p2.uId and p1.timestamp < p2.timestamp) where p2.timestamp IS NULL) as status where status.uId = users.uId;";
if ($result = $mysqli->query($sql)) {
	print '<table border="1"><caption>Status</caption><tbody>';
	while($row = $result->fetch_assoc()){
			$row['timestamp'] = get_timeago($row['timestamp']);
			$row['sCode'] = $sCode[$row['sCode']];
		    print "<tr><td>$row[givenName] $row[surname]</td><td>$row[sCode]</td><td>$row[timestamp]</td>";
			print "<td>$row[lat]</td><td>$row[lon]</td><td><button>Notify</button></td></tr>";
	}
	print "</table></tbody>";
}
?>