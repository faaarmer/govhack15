var Map_test = {

	map: null,

	init: function(){
		Map_test.map_init();
	},

	events: function(){

	},

	map_init: function(){
		// initiate leaflet map
		Map_test.map = new L.Map('cartodb-map', {
			center: [35.3080,149.1245],
			zoom: 6
		})

		var layerUrl = 'https://faaarmer.cartodb.com/api/v2/viz/31908478-2206-11e5-882a-0e8dde98a187/viz.json';

		// Add a basemap to the map object just created

		var HERE_normalNight = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.night/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
			attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
			subdomains: '1234',
			mapID: 'newest',
			app_id: 'KuYppsdXZznpffJsKT24',
			app_code: 'A7tBPacePg9Mj_zghvKt9Q',
			base: 'base',
			maxZoom: 20
		});
	    HERE_normalNight.addTo(Map_test.map);

		cartodb.createLayer(Map_test.map, layerUrl)
	    .addTo(Map_test.map).on('done', function(layer) {

	    }).on('error', function() {
	      //log the error
	    });
	}
};

$(function(){
	Map_test.init();
});