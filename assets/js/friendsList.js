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


		$('body').on('touch click', '.friend-list-item .btn', FriendsList.sendMessage);
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

	refreshFriends: function() {
		FriendsList.getFriends();
		$('#friends').children().remove();
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
				console.log(results);
				if(!results.success){
				}else{
					FriendsList.insertUsers(results);
					// if(results.friends.sCode)
				}

			}
		});
	},


	insertUsers: function(results){
		var friends = results.friends;

		$.each(friends, function(index, friend){
			var dataStat = friend.sCode;
			var friend_id = friend.rId;
			var friendName = friend.fullName;
			var lat = friend.lat;
			var lon = friend.lon;
			var friendsHtml = '<div class="row friend-list-item"><div class="cool col-xs-6" data-status="' + dataStat +'" data-rid="' + friend_id + '" data-lat="' + lat + '" data-lon="' + lon + '"><h6 class="friend-name">' + friendName + '</h6></div><div class="col-xs-6 right-status"><span class="safety-status"><button id="safetyButton" class="btn btn-xs">Check safety</button><button id="awaitingResponse" class="btn btn-xs hide">Waiting...</button><button id="okStatus" class="btn btn-xs hide"><span class="glyphicon glyphicon-ok"></span> I\'m Safe</button><button id="helpStatus" class="btn btn-xs hide"> I need help!</button></span><button id="deleteButton" class="btn btn-xs"><span class="glyphicon glyphicon-remove"></span></button></div></div>';
			$('#friends').append(friendsHtml);

		});

		$('[data-status="1"').closest('.friend-list-item').find('#safetyButton').addClass('hide');
		$('[data-status="1"').closest('.friend-list-item').find('#okStatus').removeClass('hide');

		$('[data-status="2"').closest('.friend-list-item').find('#safetyButton').addClass('hide');
		$('[data-status="2"').closest('.friend-list-item').find('#helpStatus').removeClass('hide');

		$('[data-status="3"').closest('.friend-list-item').find('#safetyButton').addClass('hide');
		$('[data-status="3"').closest('.friend-list-item').find('#awaitingResponse').removeClass('hide');
	},

	sendMessage: function(){
		var $this = $(this);
		console.log($this);
		var status = $this.closest('.friend-list-item').find('.cool').attr('data-status');
		if(status != 'null'){
			console.log("no send");
			console.log(status);
			return;
		}

		$this.addClass('hide');
		$this.closest('.friend-list-item').find('#awaitingResponse').removeClass('hide');
		$this.closest('.friend-list-item').find('.cool').attr('data-status', 3);

		var rId = $this.closest('.friend-list-item').find('.cool').attr('data-rid');

		if($this.attr('id') == 'safetyButton'){
			$.ajax({
				url: 'assets/php/createSMS.php',
				type: 'get',
				data: {
					userId: CheckLoggedIn.user.uId,
					rId: rId
				},
				dataType: 'jsonp',
				success: function( result ) {
					console.log(result);
					if(!result.success){
						console.log(result);
					}else{
						console.log(result);
						
					}

				}
			});
		}

	}
};

$(function(){
	FriendsList.init();
});