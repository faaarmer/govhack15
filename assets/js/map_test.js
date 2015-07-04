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
	    L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
	        attribution: 'Stamen'
	    }).addTo(Map_test.map);

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