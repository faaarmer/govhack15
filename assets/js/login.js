var Login = {

	init: function(){
		Login.events();
	},

	events: function(){
		$('body').on('touch click', '.loginBtn', Login.login);

		$('.form-control').keypress(function (e) {
		  if (e.which == 13) {
		    Login.login();
		    return false;
		  }
		});
	},

	login: function(){
		var email = $('#email').val();
		var password = $('#password').val();
		$.ajax({
			url: 'assets/php/login.php',
			type: 'get',
			data: {
				email: email,
				password: password
			},
			dataType: 'jsonp',
			success: function( user ) {
				console.log(user);
				if(!user.success){
					console.log('incorrect login');
				}else{
					Login.storeLogin(user);
				}
				
			}
		});
	},

	storeLogin: function(user){

		// Put the object into storage
		localStorage.setItem('user', JSON.stringify(user));

		// Retrieve the object from storage
		// var retrievedObject = localStorage.getItem('testObject');

		// console.log('retrievedObject: ', JSON.parse(retrievedObject));

		window.location.href = "/";
	}
};

$(function(){
	Login.init();
});