var CheckLoggedIn = {

	user: null,

	init: function(){
		CheckLoggedIn.events();
		CheckLoggedIn.getUser();

	},

	events: function(){

	},

	getUser: function(){
		// Retrieve the object from storage
		CheckLoggedIn.user = localStorage.getItem('user');

		CheckLoggedIn.user = JSON.parse(CheckLoggedIn.user);

		if(CheckLoggedIn.user == null || CheckLoggedIn.user == 'null'){
			window.location.replace("login.html");
		}

	}
};

$(function(){
	CheckLoggedIn.init();
});