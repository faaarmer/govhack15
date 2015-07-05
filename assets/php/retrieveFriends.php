<?php
	header('Content-Type: application/json');

	include_once 'connection.php';


	if(!empty($_GET['userId'])){
		
		$userId = $_GET['userId'];
		$friends = getFriends($userId);
		if(sizeof($friends) != 0){
			$friends['success'] = true;
			send_response($friends);
		}else{
			$response = array(
				'success' => false,
				'msg' => 'no friends'
				);
			send_response($response);
		}
		
		
	}else{
		$response = array(
			'success' => false,
			'msg' => 'no user id'
			);
		send_response($response);
	}

	function getFriends($userId){
		global $mysqli;
		$friends = array();
		$sql = "SELECT r.rId, r.fullName, s.sCode, s.lat, s.lon FROM relation r LEFT JOIN status s ON r.rId=s.rId WHERE r.uId = '$userId'";
		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage 1 : %s\n", $mysqli->error);
			return false;

		} else {
			$i=0;
			while($row = $result->fetch_assoc()){
				$friends['friends'][$i] = $row;
				$i++;
			}
			return $friends;
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