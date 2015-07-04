var CheckLoggedIn = {

	user: null,

	init: function(){
		CheckLoggedIn.events();
		var user = CheckLoggedIn.getUser();

	},

	events: function(){

	},

	getUser: function(){
		// Retrieve the object from storage
		CheckLoggedIn.user = localStorage.getItem('user');

		CheckLoggedIn.user = JSON.parse(CheckLoggedIn.user);
		console.log('stored user');
		if(CheckLoggedIn.user == null || CheckLoggedIn.user == 'null'){
			console.log(CheckLoggedIn.user);
			//window.location.replace("login.html");
		}

	}
};

$(function(){
	CheckLoggedIn.init();
});