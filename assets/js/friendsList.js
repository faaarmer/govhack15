var FriendsList = {

	init: function(){
		FriendsList.events();
		FriendsList.getFriends();

	},

	events: function(){
		$('body').on('touch click', '.add-button', FriendsList.addFriends);
	},

	addFriends: function(){


		$.ajax({
			url: '../assets/php/FriendsList.php',
			type: 'get',
			data: {

				fullName: fullName,
				phone: phone,
				userId: CheckLoggedIn.user.uId

			},
			dataType: 'jsonp',
			success: function( result ) {
				if(!result.success){ console.log('NOT STORED BITCH');
				}else{
					// FriendsList.storeLogin(result);
					console.log('STORED BITCH');
				}

			}
		});
	},

	getFriends: function(){
		console.log(CheckLoggedIn.user.uId);
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
			var friendsHtml = '<div class="row"><div class="col-xs-6" data-rid="' + friend_id + '"><h6>' + friendName + '</h6></div><div class="col-xs-6 right-status"><span id="safety-status"></span></div></div>';
			//'<li class="friends-list" data-fid="' + friend_id + '">' + friendName + '</li>';
			$('#friends').append(friendsHtml);
		});
	}
};

$(function(){
	FriendsList.init();
});