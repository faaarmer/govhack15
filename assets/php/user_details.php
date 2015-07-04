<?php
	header('Content-Type: application/json');

	include_once 'connection.php';


	if(!empty($_GET['rid'])){
		
		$rid = $_GET['rid'];
		
		$result = getDetails($rid);

		$response = array(
			'success' => $result,
			'msg' => 'user details'
			);
		send_response($response);

		
	}else{
		$response = array(
			'success' => false,
			'msg' => 'missing params'
			);
		send_response($response);
	}

	function getDetails($rid){
		global $mysqli;

		$sql = "SELECT givenName, surname, user_img FROM users, relation WHERE relation.rid = '$rid' AND relation.uId = users.uId";

		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage getDetails: %s\n", $mysqli->error);
			return false;

		}

		return $result->fetch_assoc();
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