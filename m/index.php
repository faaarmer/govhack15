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

if ($_POST) {
	$values = array( # no string here - if there is, remember to escape_string()
		(int) ($_GET['uId']),
		(int) $_POST['status'],
		(float) $_POST['lat'],
		(float) $_POST['lon'],
		date("'Y-m-d H:i:s'")
	);
	$values = implode(",", $values);
	$sql = "INSERT INTO status (uId, sCode, lat, lon, timestamp) VALUES ($values);";
	if (mysqli_query($mysqli, $sql)) {
		    echo "If you are lucky, someone reading a map app would see this new status and do something.";
	} else {
		    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}
	?>
<?php
} else {
?>
<meta name="viewport" content="width=620" />
<title>geolocation</title>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <article>
      <form method="POST">
      <p>Do you need assistant?</p>
	<input type="hidden" name="lat" id="lat"/>
	<input type="hidden" name="lon" id="lon"/>
	<input type="hidden" name="status"/>
	<p><button onclick="this.form.status.value = 1;">I'm OK</button></p>
	<p><button onclick="this.form.status.value = 2;">Need help</button></p>
      </form>
<?php
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
    </article>
<script>
function success(position) {
  document.querySelector('#lat').value = position.coords.latitude
  document.querySelector('#lon').value = position.coords.longitude
}
function error(msg) {
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  error('not supported');
}

</script>
<?php
$mysqli -> close();
?>
