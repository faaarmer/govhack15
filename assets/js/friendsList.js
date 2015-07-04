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
				if(!result.success){
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
				if(!results.success){
				}else{
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
			var friendsHtml = '<div class="col-xs-6" data-fid="' + friend_id + '"><h6>' + friendName + '</h6></div><div class="col-xs-6 right-status"><span id="safety-status"></span></div>';
			//'<li class="friends-list" data-fid="' + friend_id + '">' + friendName + '</li>';
			$('#friends').append(friendsHtml);
		});
	}
};

$(function(){
	FriendsList.init();
});