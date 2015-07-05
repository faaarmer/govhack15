var Logout = {

	init: function(){
		Logout.events();
	},

	events: function(){
		$('body').on('touch click', '#logoutBtn', Logout.logout);

	},

	logout: function(){
		console.log('logout');
		// Put the object into storage
		localStorage.setItem('user', 'null');
		window.location.href = "login.html";
	},

};

$(function(){
	Logout.init();
});