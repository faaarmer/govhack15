<?php
	header('Content-Type: application/json');

	include_once 'connection.php';

	if(!empty($_GET['email']) && !empty($_GET['fname']) && !empty($_GET['lname']) && !empty($_GET['phone']) && !empty($_GET['password'])){
		$email = $_GET['email'];
		$fname = $_GET['fname'];
		$lname = $_GET['lname'];
		$phone = $_GET['phone'];
		$password = $_GET['password'];
		$emailCheck = checkEmail($email);
		if($emailCheck > 0){
			$emailExists = array(
				'success' => false,
				'msg' => 'email exists'
				);
			send_response($emailExists);
		}else{
			$img = null;
			$result = array();
			$registrationResult['success'] = addNewUser($email, $fname, $lname, $phone, $password, $img);

			if($registrationResult == 1){
				$result['success'] = 'true';
			}else{
				$result['success'] = 'false';
			}

		
			send_response($registrationResult);
		}
		
		
	}else{
		send_response('No email or password');
	}

	function checkEmail($email){
		global $mysqli;

		$sql = "SELECT COUNT(email) FROM users WHERE email = '$email'";

		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage 1 : %s\n", $mysqli->error);
			return false;

		} else {
			if($row = $result->fetch_assoc()) {
				return $row['COUNT(email)'];

			}
		}
	}
	

	function addNewUser($email, $fname, $lname, $phone, $password, $img) {

		global $mysqli;

		$sql = "INSERT INTO users(givenName, surname, email, password, phone, user_img) VALUES('$fname', '$lname', '$email', '$password', '$phone', '$img')";

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