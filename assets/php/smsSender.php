<?php
    function sendSMS($content) {
        $ch = curl_init('http://api.smsbroadcast.com.au/api-adv.php');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $output = curl_exec ($ch);
        curl_close ($ch);
        return $output;    
    }

    // daniel311991
    // password1
    function formatSMS($destination, $text){
	    $username = 'faaarmer';
	    $password = 'password1';
	    // $destination = '0400000000'; //Multiple numbers can be entered, separated by a comma
	    $source    = 'Naya Safety';
	    // $text = 'This is our test message.';
	    // $ref = 'abc123';
	        
	    $content =  'username='.rawurlencode($username).
	                '&password='.rawurlencode($password).
	                '&to='.rawurlencode($destination).
	                '&from='.rawurlencode($source).
	                '&message='.rawurlencode($text);
	  
	    $smsbroadcast_response = sendSMS($content);
	    $response_lines = explode("\n", $smsbroadcast_response);
	    
	     foreach( $response_lines as $data_line){
	        $message_data = "";
	        $message_data = explode(':',$data_line);
	        if($message_data[0] == "OK"){
	            return "The message to ".$message_data[1]." was successful, with reference ".$message_data[2]."\n";
	        }elseif( $message_data[0] == "BAD" ){
	            return "The message to ".$message_data[1]." was NOT successful. Reason: ".$message_data[2]."\n";
	        }elseif( $message_data[0] == "ERROR" ){
	            return "There was an error with this request. Reason: ".$message_data[1]."\n";
	        }
	    }
	}