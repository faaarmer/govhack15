var FriendsList = {

	init: function(){
		console.log('TITTIESQ!!');
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
			success: function( results ) {
				console.log(results + '!!!!!1');
				if(!results.success){
					console.log('failed');
				}else{
					console.log('worked');
					FriendsList.insertUsers(results);
				}

			}
		});
	},


	insertUsers: function(results){
		var friends = results.friends;

		$.each(friends, function(index, friend){
			var friend_id = friend.rId;
			var friendName = friend.fullName;
			var friendsHtml = '<li data-fid="' + friend_id + '">' + friendName + '</li>';
			$('#friends').append(friendsHtml);
		});
	}
};

$(function(){
	FriendsList.init();
});