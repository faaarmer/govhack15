var FriendsList = {

	init: function(){
		FriendsList.events();
		FriendsList.getFriends();

	},

	events: function(){
		$('body').on('touch click', '.add-button', FriendsList.addFriends);

		$('body').on('touch click', '.delete-button', function(e) {
			var rid = $(this).closest('.row').find('.friend').attr('data-rid');
			FriendsList.deleteFriends(rid);
		});

		$('.form-control').keypress(function (e) {
		  if (e.which == 13) {
		    FriendsList.addFriends();
		    return false;
		  }
		});
	},

	addFriends: function(){
		var fullName = $('#fullName').val();
		var phone = $('#phone').val();

		$.ajax({
			url: 'assets/php/addFriends.php',
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
					FriendsList.getFriends();
					$('#friends').children().remove();
					$('#fullName').val("");
					$('#phone').val("");
				}

			}
		});
	},

	deleteFriends: function(rid){

		$.ajax({
			url: 'assets/php/deleteFriends.php',
			type: 'get',
			data: {

				rid: rid

			},
			dataType: 'jsonp',
			success: function( result ) {
				if (result.success) {
					$('.friend[data-rid='+rid+']').parent().remove();
				}
			}
		});
	},

	getFriends: function(){
		console.log(CheckLoggedIn.user.uId);
		$.ajax({
			url: 'assets/php/retrieveFriends.php',
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
			var friendsHtml = '<div class="row"><div class="col-xs-6 friend" data-rid="' + friend_id + '"><h6>' + friendName + '</h6></div><div class="col-xs-6 right-status"><span id="safety-status"></span><p class="delete-button">X</p></div></div>';
			//'<li class="friends-list" data-fid="' + friend_id + '">' + friendName + '</li>';
			$('#friends').append(friendsHtml);
		});
	}
};

$(function(){
	FriendsList.init();
});