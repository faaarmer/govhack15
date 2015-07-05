var Locator_page = {
	rid: '',
	
	init: function() {
		Locator_page.rid = Locator_page.getUrlParameter('rid');
		Locator_page.load_details(Locator_page.rid);

		Locator_page.events();
	},

	events: function(){
		$('body').on('click','.ok_button',function(e){
			var lat = $('.lat').val();
			var lon = $('.lon').val();
			if (lon != '' && lat != '') {
				Locator_page.send_status(Locator_page.rid, lat, lon, 1);
			} else {
				alert('wait for data pls');
			}
			$(".you-ok").hide();
			$(".im-ok").show();
		})

		$('body').on('click','.help_button',function(e){
			var lat = $('.lat').val();
			var lon = $('.lon').val();
			if (lon != '' && lat != '') {
				Locator_page.send_status(Locator_page.rid, lat, lon, 2);
			} else {
				alert('wait for data pls');
			}
			$(".you-ok").hide();
			$(".help-me").show();
		})
	},

	send_status: function(rid, lat, lon, status) {
		$.ajax({
            url: '../assets/php/status.php',
            type: 'GET',
            data: {
                rid: rid,
                status: status,
                lat: lat,
                lon: lon
            },
            dataType: 'jsonp',
            success: function( result ) {
               console.log(result);
               if(result.status == "success") {
               if (status == 1) {
                		console.log("Thanks, we will let aaa");
                	}

                }

            }
        });
	},
	
	load_details: function(rid) {
		$.ajax({
            url: '../assets/php/user_details.php',
            type: 'GET',
            data: {
                rid: rid
            },
            dataType: 'jsonp',
            success: function( result ) {
                if (result.success) {
                	$('.you-ok').text(result.success.givenName + " " + result.success.surname + ' wants to know if you are safe.');
                	$('.im-ok').find('.sec-header').text(result.success.givenName + " " + result.success.surname + ' has been notifed of your safety.');
                	$('.help-me').find('.sec-header').text("Don't worry, " + result.success.givenName + " " + result.success.surname + ' has been notified of your location');
                }
            }
        });
	},

	getUrlParameter: function(sParam)
	{
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) 
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam) 
	        {
	            return sParameterName[1];
	        }
	    }
	}          
}
$(function(){
	Locator_page.init();
})