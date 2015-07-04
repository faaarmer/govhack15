var FriendsList = {

	init: function(){
		FriendsList.events();
		FriendsList.getFriends();
	},

	events: function(){
		$('body').on('touch click', '.registerBtn', FriendsList.register);
	},

	addFriends: function(){


		$.ajax({
			url: '../assets/php/FriendsList.php',
			type: 'get',
			data: {
				email: email,
				fname: fname,
				lname: lname,
				phone: phone,
				password: password
			},
			dataType: 'jsonp',
			success: function( result ) {
				console.log(result);
				if(!result.success){
					console.log('incorrect login');
				}else{
					FriendsList.storeLogin(result);
				}

			}
		});
	},

	getFriends: function(){
		$.ajax({
			url: '../assets/php/retrieveFriends.php',
			type: 'get',
			data: {
				userId: CheckLoggedIn.user.uId
			},
			dataType: 'jsonp',
			success: function( result ) {
				console.log(result);
				if(!result.success){
					console.log('failed');
				}else{
					console.log('worked');
				}

			}
		});
	}
};

$(function(){
	FriendsList.init();
});