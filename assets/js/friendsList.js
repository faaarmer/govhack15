var FriendsList = {

	init: function(){
		FriendsList.events();
	},

	events: function(){
		$('body').on('touch click', '.registerBtn', FriendsList.register);
	},

	register: function(){
		

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
	}
};

$(function(){
	FriendsList.init();
});