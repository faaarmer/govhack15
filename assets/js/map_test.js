var Map_test = {

	map: null,
	bushFiresLayer: '',
	fireStationsLayer: '',

	init: function(){
		Map_test.map_init();
		Map_test.events();
	},

	events: function(){
		$('body').on('click','.bushfires_toggle',function(e) {
			Map_test.bushFiresLayer.toggle();
		});

		$('body').on('click','.emergency_toggle',function(e) {
			Map_test.fireStationsLayer.toggle();
		});
	},

	map_init: function(){
		// initiate leaflet map
		Map_test.map = new L.Map('cartodb-map', {
			center: [-28.3080,139.1245],
			zoom: 5,
			zoomControl: false
		});

		 var zoomControl = L.control.zoom({
            position: 'topright'
        });

        Map_test.map.addControl(zoomControl);

		var bushFiresURL = 'https://faaarmer.cartodb.com/api/v2/viz/31908478-2206-11e5-882a-0e8dde98a187/viz.json';
		var fireStationsURL = 'https://faaarmer.cartodb.com/api/v2/viz/790bff40-2228-11e5-89f4-0e4fddd5de28/viz.json';


		// Add a basemap to the map object just created

		var baseMap = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.night/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
			attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
			subdomains: '1234',
			mapID: 'newest',
			app_id: 'KuYppsdXZznpffJsKT24',
			app_code: 'A7tBPacePg9Mj_zghvKt9Q',
			base: 'base',
			maxZoom: 20
		});

	    baseMap.addTo(Map_test.map);

	    cartodb.createLayer(Map_test.map, bushFiresURL).addTo(Map_test.map).on('done', function(layer) {
	    	Map_test.bushFiresLayer = layer;
	    }).on('error', function(error) {
	      console.log(error);
	    });

	    cartodb.createLayer(Map_test.map, fireStationsURL).addTo(Map_test.map).on('done', function(layer) {
	    	Map_test.fireStationsLayer = layer;
	    	Map_test.fireStationsLayer.hide();
	    }).on('error', function(error) {
	      console.log(error);
	    });
	}
};

$(function(){
	Map_test.init();
});