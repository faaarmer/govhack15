var Registration = {

	init: function(){
		Registration.events();
	},

	events: function(){
		$('body').on('touch click', '.registerBtn', Registration.register);
	},

	register: function(){
		var email = $('#email').val();
		var fname = $('#fname').val();
		var lname = $('#lname').val();
		var phone = $('#phone').val();
		var password = $('#password').val();

		$.ajax({
			url: 'assets/php/registration.php',
			type: 'get',
			data: {
				email: email,
				fname: fname,
				lname: lname,
				phone: phone,
				password: password
			},
			dataType: 'jsonp',
			success: function( user ) {
				if(!user.success){
					console.log('incorrect login');
				}else{
					Registration.storeLogin(user);
				}
				
			}
		});
	},

	storeLogin: function(user){

		// Put the object into storage
		// localStorage.setItem('user', JSON.stringify(user));

		// Retrieve the object from storage
		// var retrievedObject = localStorage.getItem('testObject');

		// console.log('retrievedObject: ', JSON.parse(retrievedObject));

		window.location.href = "login.html";
	}
};

$(function(){
	Registration.init();
});