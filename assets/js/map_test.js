var Map_test = {

	map: null,
	bushFiresLayer: '',
	fireStationsLayer: '',
	floodLayer: '',

	init: function(){
		Map_test.map_init();
		Map_test.events();
	},

	events: function(){
		$('body').on('click','.bushfires_toggle',function(e) {
			Map_test.bushFiresLayer.toggle();
			$('.cartodb-legend-stack').toggle();
		});

		$('body').on('click','span.bushfires',function(e) {
			Map_test.bushFiresLayer.toggle();
			$('.cartodb-legend-stack').toggle();
		});

		$('body').on('click','.emergency_toggle',function(e) {
			Map_test.fireStationsLayer.toggle();
		});

		$('body').on('click','span.emergency',function(e) {
			Map_test.fireStationsLayer.toggle();
		});

		$('body').on('click','.flood_toggle',function(e) {
			Map_test.floodLayer.toggle();
		});

		$('body').on('click','span.flooding',function(e) {
			Map_test.floodLayer.toggle();
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
        var floodURL = 'https://faaarmer.cartodb.com/api/v2/viz/cb1f427e-2241-11e5-a26b-0e9d821ea90d/viz.json';
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
	    	Map_test.bushFiresLayer.hide();
	    	$('.cartodb-legend-stack').hide();
	    }).on('error', function(error) {
	      console.log(error);
	    });

	    cartodb.createLayer(Map_test.map, fireStationsURL).addTo(Map_test.map).on('done', function(layer) {
	    	Map_test.fireStationsLayer = layer;
	    	Map_test.fireStationsLayer.hide();
	    }).on('error', function(error) {
	      console.log(error);
	    });

	    cartodb.createLayer(Map_test.map, floodURL).addTo(Map_test.map).on('done', function(layer) {
	    	Map_test.floodLayer = layer;
	    	Map_test.floodLayer.hide();
	    }).on('error', function(error) {
	      console.log(error);
	    });
	}
};

$(function(){
	Map_test.init();
});