var Locator_page = {
	init: function() {
		Locator_page.events();
	},

	events: function(){
		$('body').on('click','.ok_button',function(e){
			var lat = $('.lat').val();
			var lon = $('.lon').val();
			if (lon != '' && lat != '') {
				Locator_page.send_status(Locator_page.getUrlParameter('uid'), lat, lon, 1);
			} else {
				alert('wait for data pls');
			}
		})

		$('body').on('click','.help_button',function(e){
			var lat = $('.lat').val();
			var lon = $('.lon').val();
			if (lon != '' && lat != '') {
				Locator_page.send_status(Locator_page.getUrlParameter('uid'), lat, lon, 2);
			} else {
				alert('wait for data pls');
			}
		})
	},

	send_status: function(uId, lat, lon, status) {
		$.ajax({
            url: '../assets/php/status.php',
            type: 'GET',
            data: {
                uId: uId,
                status: status,
                lat: lat,
                lon: lon
            },
            dataType: 'jsonp',
            success: function( result ) {
                console.log(result);
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