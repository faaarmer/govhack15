<?php
	header('Content-Type: application/json');

	include_once 'connection.php';
	include_once 'smsSender.php';


	if(!empty($_GET['rId']) && !empty($_GET['userId'])){
		
		$rId = $_GET['rId'];
		$userId = $_GET['userId'];
		$userDetails = get_userlogin_by_userId($userId);
		// send_response($userDetails);
		if(!$userDetails){
			$response = array(
				'success' => false,
				'msg' => 'user details failed'
				);
			send_response($response);

		}else{
			$friendDetails = friendsDetail($rId, $userId);
			// send_response($friendDetails);
			if(!$friendDetails){

				$response = array(
					'success' => false,
					'msg' => 'no friends'
					);
				send_response($response);

			}else{
				createSMS($friendDetails, $userDetails);
			}
		}
		
		
		
	}else if(!empty($_GET['sendAll']) && !empty($_GET['userId'])){

		$rId = null;
		$userId = $_GET['userId'];
		$userDetails = get_userlogin_by_userId($userId);
		// send_response($userDetails);
		if(!$userDetails){
			$response = array(
				'success' => false,
				'msg' => 'user details failed'
				);
			send_response($response);

		}else{
			$friendDetails = friendsDetail($rId, $userId);
			// send_response($friendDetails);
			if(!$friendDetails){

				$response = array(
					'success' => false,
					'msg' => 'no friends'
					);
				send_response($response);

			}else{
				createSMS($friendDetails, $userDetails);
			}
		}
		

	}


	function get_userlogin_by_userId($userId) {

		global $mysqli;

		$sql = "SELECT uId, givenName, surname, email, phone, user_img FROM users WHERE uId = '$userId'";

		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage 1 : %s\n", $mysqli->error);
			return false;

		} else {
			if($row = $result->fetch_assoc()) {
				return $row;

			}else{
				return false;
			}
		}
	}


	function friendsDetail($rId, $userId){
		global $mysqli;
		$friends = array();
		if($rId == null || $rId == ""){
			$sql = "SELECT rId, fullName, phone FROM relation WHERE uId = '$userId'";
		}else{
			$sql = "SELECT rId, fullName, phone FROM relation WHERE uId = '$userId' AND rId = '$rId'";
		}

		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage 1 : %s\n", $mysqli->error);
			return false;

		} else {
			if($result->num_rows > 0) {
				
				$i=0;
				while($row = $result->fetch_assoc()){
					$friends['friends'][$i] = $row;
					$i++;
				}
				return $friends;
			}else{
				return false;
			}
		}

	}

		function createSMS($friendDetails, $userDetails){

		foreach ($friendDetails['friends'] as $friend) {
			$url = "http://govhack.azurewebsites.net/m/?rid=" . $friend['rId'];
			$text = "Hi " . $friend['fullName'] . ",\n" . $userDetails['givenName'] . " " . $userDetails['surname'] . " would like to know if you're safe.\nPlease visit the link to let them know!\n" . $url;
			$destination = $friend['phone'];
			// echo $text;
			$smsResult =  formatSMS($destination, $text);
			// echo $smsResult;

			updateStatusTable($friend);

		}

		$response = array(
			'success' => true,
			'msg' => 'sent check'
			);
		send_response($response);



	}


	function updateStatusTable($friend){
		global $mysqli;
		$rid = $friend['rId'];
		$status = 3;
		$lat = NULL;
		$lon = NULL;
		$date = date("'Y-m-d H:i:s'");

		$sql = "INSERT INTO status (rid, sCode, lat, lon, sTimestamp) VALUES ($rid,$status,NULL,NULL,$date) ON DUPLICATE KEY UPDATE sCode = $status, lat=NULL,lon=NULL,sTimestamp=$date";
		if (mysqli_query($mysqli, $sql)) {
			 // $response['status'] = "success";
		} else {
			error_log(mysqli_error($mysqli));	
		   // $response['status'] = "failed";
		}
	}

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