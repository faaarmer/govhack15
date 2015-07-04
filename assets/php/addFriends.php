<?php
	header('Content-Type: application/json');

	include_once 'connection.php';


	if(!empty($_GET['fullName']) && !empty($_GET['phone']) && !empty($_GET['userId'])){
		
		$fullName = $_GET['fullName'];
		$phone = $_GET['phone'];
		$userId = $_GET['userId'];
		
		$result = addFriend($fullName, $phone, $userId);

		$response = array(
			'success' => $result,
			'msg' => 'add status'
			);
		send_response($response);

		
	}else{
		$response = array(
			'success' => false,
			'msg' => 'missing params'
			);
		send_response($response);
	}

	function addFriend($fullName, $phone, $userId){
		global $mysqli;

		$sql = "INSERT INTO relation(fullName, phone, uId) VALUES('$fullName', '$phone', '$userId')";

		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage 1 : %s\n", $mysqli->error);
			return false;

		} else {
			return true;
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