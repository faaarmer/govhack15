<?php
	header('Content-Type: application/json');

	include_once 'connection.php';


	if(!empty($_GET['email']) && !empty($_GET['password'])){
		$email = $_GET['email'];
		$password = $_GET['password'];
		$userDetails = get_userlogin_by_email($email, $password);
		$userDetails['success'] = !$userDetails ? false : true;
		
		send_response($userDetails);
		
	}else{
		send_response('No email or password');
	}
	

	function get_userlogin_by_email($email, $password) {

		global $mysqli;

		$sql = "SELECT uId, givenName, surname, email, phone, user_img FROM users WHERE email = '$email' AND password = '$password'";

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