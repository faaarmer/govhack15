<?php
	header('Content-Type: application/json');

	include_once 'connection.php';


	if(!empty($_GET['rid'])){
		
		$rid = $_GET['rid'];
		
		$result = deleteFriend($rid);

		$response = array(
			'success' => $result,
			'msg' => 'delete status'
			);
		send_response($response);

		
	}else{
		$response = array(
			'success' => false,
			'msg' => 'missing params'
			);
		send_response($response);
	}

	function deleteFriend($rid){
		global $mysqli;

		$sql = "DELETE FROM relation WHERE rid = '$rid'";

		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage deleteFriend: %s\n", $mysqli->error);
			return false;

		}

		return true;
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