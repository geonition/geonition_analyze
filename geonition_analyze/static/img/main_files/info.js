

/*
The profile values for the current user
*/

var USER_ID = 2;


var PROFILE_VALUES = {};
var FEATURES = {"crs": {"type": "EPSG", "properties": {"code": 3067}}, "type":"FeatureCollection", "features": []};

/*
renderers in a map with renderer name as key
*/
var renderers = {
	"notConfirmed": new esri.renderer.SimpleRenderer(
							new esri.symbol.SimpleMarkerSymbol()
										),
	// There is problem in ESRI symbol.fromJson() resulting incorrect width and height of the esri.symbol.PictureMarkerSymbol
        // Both definitions with JSON below are not working, JSAPI 1.6, maybe fixed in 2.0							),
	/*"positivePoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol({
													"color":[0,0,0,255],
                                                                                                        "size":31.5,
                                                                                                        "angle":0,
                                                                                                        "xoffset":0,
                                                                                                        "yoffset":0,
                                                                                                        "type":"esriPMS",
                                                                                                        "style":"esriPMS",
                                                                                                        "url":"../../static/images/place_positive_.png"
													})
										),
	"positivePoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol({
													"url": "../../static/images/place_positive.png",
													"width": 31,
													"height": 42
													})
										),*/
	"positivePoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/place_positive.png", 31, 42).setOffset(0,14)
										),
        /*"negativePoint": new esri.renderer.SimpleRenderer(new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 10,
   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
   new dojo.Color([255,0,0]), 1),
   new dojo.Color([0,255,0,0.25]))
),*/
	"negativePoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/place_negative.png", 31, 42).setOffset(0,14)
										),
        "preservePoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/neula217110010.png", 23, 36).setOffset(0,11)
										),
	"improvePoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/neula217110010.png", 23, 36).setOffset(0,11)
                                                                                ),
	"improveArea": new esri.renderer.SimpleRenderer(
                                                        new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                                            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                                            new dojo.Color([217,110,10]), 1),new dojo.Color([241,167,81,0.25]))
										),
	"removeObject": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/neula217110010.png", 23, 36).setOffset(0,11)
										),
	"newBuilding": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/neula217110010.png", 23, 36).setOffset(0,11)
										),
	"newRoute": new esri.renderer.SimpleRenderer(
							new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                                            new dojo.Color([217,110,10]), 3)
										),
	"otherRouteImprovement": new esri.renderer.SimpleRenderer(
							new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                                            new dojo.Color([217,110,10]), 3)
										),
	"otherPlaceImprovement": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/neula217110010.png", 23, 36).setOffset(0,11)
										),
	"otherAreaImprovement": new esri.renderer.SimpleRenderer(
                                                        new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                                            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                                            new dojo.Color([217,110,10]), 1),new dojo.Color([241,167,81,0.25]))
										),
	"storePoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/neula172073136.png", 23, 36).setOffset(0,11)
										),
	"storeRoute": new esri.renderer.SimpleRenderer(
							new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                                            new dojo.Color([172,73,136]), 3)
										),
	"schoolPoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/neula172073136.png", 23, 36).setOffset(0,11)
										),
	"schoolRoute": new esri.renderer.SimpleRenderer(
							new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                                            new dojo.Color([172,73,136]), 3)
										),
	"daycarePoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/neula172073136.png", 23, 36).setOffset(0,11)
										),
	"daycareRoute": new esri.renderer.SimpleRenderer(
							new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                                            new dojo.Color([172,73,136]), 3)
										),
	"workStudyPoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/neula172073136.png", 23, 36).setOffset(0,11)
										),
	"workStudyRoute": new esri.renderer.SimpleRenderer(
							new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                                            new dojo.Color([172,73,136]), 3)
										),
	"hobbyPoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/neula172073136.png", 23, 36).setOffset(0,11)
										),
	"hobbyRoute": new esri.renderer.SimpleRenderer(
							new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                                            new dojo.Color([172,73,136]), 3)
										),
	"culturePoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/neula172073136.png", 23, 36).setOffset(0,11)
										),
	"greenspacePolygon": new esri.renderer.SimpleRenderer(
                                                        new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                                            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                                            new dojo.Color([83,174,71]), 1),new dojo.Color([121,212,109,0.25]))
                                        ),
	"otherServicePoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/neula172073136.png", 23, 36).setOffset(0,11)
										),
    "otherServiceRoute": new esri.renderer.SimpleRenderer(
                            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                                            new dojo.Color([172,73,136]), 3)
                                        ),
	"outdoorRoute": new esri.renderer.SimpleRenderer(
							new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                                            new dojo.Color([83,174,71]), 3)
										),
	"homePoint": new esri.renderer.SimpleRenderer(
							new esri.symbol.PictureMarkerSymbol("/static/images/neula073193215.png", 23, 36).setOffset(0,11)
										)
};
/*
 Default widget definitions for infoTemplates
 */
var default_info_widgets = [
    {
        'type': 'form',
        'selector': '#info_form',
        'searchscope': 'map_infowindow'
    },
    {
        'type':'radiobutton',
        'json': {},
        'selector': '.dojo-radiobutton',
        'searchscope': 'map_infowindow'
    },
    {
        'type': 'checkbox',
        'selector': '.dojo-checkbox',
        'searchscope': 'map_infowindow'
    },
    {
        'type': 'textbox',
        'selector': '.dojo-textbox',
        'searchscope': 'map_infowindow'
    },
    {
        'type': 'horizontalslider',
        'json': {
                'name': 'info_slider', // Div doesn't have name attribute
                'minimum': 0,
                'maximum': 100,
                'discreteValues': 101,
                'intermediateChanges': true,
                'style': 'width: 100%;',
                'value': 50.123
                },
        'selector': '.dojo-horizontalslider',
        'searchscope': 'map_infowindow'
    },
    {
        'type': 'filteringselect',
        'json': {
                'value': 'NULL'
                },
        'selector': '.dojo-filteringselect',
        'searchscope': 'map_infowindow'
    },
    {
        'type': 'textarea',
        'json': {
                'style': 'width: auto;'
                },
        'selector': '.dojo-textarea',
        'searchscope': 'map_infowindow'
    }
];


/*
categories in a map with category name as key
*/
var categories = {
    "improve_area": new Category({
                            "renderer": "improveArea",
                            "type": "polygon",
                            "id": "improve_area",
                            "name": "Kohennettava alue",
                            "infotemplatename": "modify"
                    }),
    "other_area_improvement":  new Category({
                            "renderer": "otherAreaImprovement",
                            "type": "polygon",
                            "id": "other_area_improvement",
                            "name": "Alue",
                            "infotemplatename": "modify"
                    }),
    "greenspace_place": new Category({
                            "renderer": "greenspacePolygon",
                            "type": "polygon",
                            "id": "greenspace_place",
                            "name": "Lähiviheralue",
                            "infotemplatename": "greenspace_template"
                    }),
    "outdoor_route": new Category({
                            "renderer": "outdoorRoute",
                            "type": "polyline",
                            "id": "outdoor_route",
                            "name": "Ulkoilureitti",
                            "infotemplatename": "outdoor_route_template"
                    }),
    "new_route": new Category({
                            "renderer": "newRoute",
                            "type": "polyline",
                            "id": "new_route",
                            "name": "Uusi reitti",
                            "infotemplatename": "new_route"
                    }),
    "other_route_improvement":  new Category({
                            "renderer": "otherRouteImprovement",
                            "type": "polyline",
                            "id": "other_route_improvement",
                            "name": "Reitti",
                            "infotemplatename": "modify"
                    }),
    "store_route": new Category({
                            "renderer": "storeRoute",
                            "type": "polyline",
                            "id": "store_route",
                            "name": "Kauppamatka",
                            "infotemplatename": "service_route_template"
                    }),
    "school_route": new Category({
                            "renderer": "schoolRoute",
                            "type": "polyline",
                            "id": "school_route",
                            "name": "Koulumatka",
                            "infotemplatename": "service_route_template"
                    }),
    "daycare_route": new Category({
                            "renderer": "daycareRoute",
                            "type": "polyline",
                            "id": "daycare_route",
                            "name": "Päiväkotimatka",
                            "infotemplatename": "service_route_template"
                    }),
    "work_study_route": new Category({
                            "renderer": "workStudyRoute",
                            "type": "polyline",
                            "id": "work_study_route",
                            "name": "Työ- tai opiskelumatka",
                            "infotemplatename": "service_route_template"
                    }),
    "route_to_hobby": new Category({
                            "renderer": "hobbyRoute",
                            "type": "polyline",
                            "id": "route_to_hobby",
                            "name": "Harrastusmatka",
                            "infotemplatename": "service_route_template"
                    }),
    "other_service_route": new Category({
                            "renderer": "otherServiceRoute",
                            "type": "polyline",
                            "id": "other_service_route",
                            "name": "Muu palvelureitti",
                            "infotemplatename": "service_route_template"
                    }),
	"pos_aesthetic": new Category({
							"renderer": "positivePoint",
							"type": "point",
							"id": "pos_aesthetic",
							"name": "Ympäristön ulkoinen ilme",
							"infotemplatename": "pos_aesthetic"
					}),
	"pos_social": new Category({
							"renderer": "positivePoint",
							"type": "point",
							"id": "pos_social",
							"name": "Sosiaalinen ilmapiiri",
							"infotemplatename": "pos_social"
					}),
	"pos_activity": new Category({
							"renderer": "positivePoint",
							"type": "point",
							"id": "pos_activity",
							"name": "Ympäristön toimintamahdollisuudet",
							"infotemplatename": "pos_activity"
					}),
	"pos_atmosphere": new Category({
							"renderer": "positivePoint",
							"type": "point",
							"id": "pos_atmosphere",
							"name": "Ympäristön tunnelma",
							"infotemplatename": "pos_atmosphere"
					}),
	"neg_aesthetic": new Category({
							"renderer": "negativePoint",
							"type": "point",
							"id": "neg_aesthetic",
							"name": "Ympäristön ulkoinen ilme",
							"infotemplatename": "neg_aesthetic"
					}),
	"neg_social": new Category({
							"renderer": "negativePoint",
							"type": "point",
							"id": "neg_social",
							"name": "Sosiaalinen ilmapiiri",
							"infotemplatename": "neg_social"
					}),
	"neg_activity": new Category({
							"renderer": "negativePoint",
							"type": "point",
							"id": "neg_activity",
							"name": "Ympäristön toimintamahdollisuudet",
							"infotemplatename": "neg_activity"
					}),
	"neg_atmosphere": new Category({
							"renderer": "negativePoint",
							"type": "point",
							"id": "neg_atmosphere",
							"name": "Ympäristön tunnelma",
							"infotemplatename": "neg_atmosphere"
					}),
	"preserve_point": new Category({
							"renderer": "preservePoint",
							"type": "point",
							"id": "preserve_point",
							"name": "Säilytettävä kohde",
							"infotemplatename": "modify"
					}),
	"improve_point": new Category({
							"renderer": "improvePoint",
							"type": "point",
							"id": "improve_point",
							"name": "Kohennettava paikka",
							"infotemplatename": "modify"
					}),
	"remove_object": new Category({
							"renderer": "removeObject",
							"type": "point",
							"id": "remove_object",
							"name": "Poistettava kohde",
							"infotemplatename": "modify"
					}),
	"new_building": new Category({
							"renderer": "newBuilding",
							"type": "point",
							"id": "new_building",
							"name": "Uusi rakennus",
							"infotemplatename": "new_building"
					}),
	"other_place_improvement":  new Category({
							"renderer": "otherPlaceImprovement",
							"type": "point",
							"id": "other_place_improvement",
							"name": "Paikka",
							"infotemplatename": "modify"
					}),
	"store": new Category({
							"renderer": "storePoint",
							"type": "point",
							"id": "store",
							"name": "Kauppa",
							"infotemplatename": "store_template"
					}),
	"foodstore": new Category({
							"renderer": "storePoint",
							"type": "point",
							"id": "foodstore",
							"name": "Ruokakauppa",
							"infotemplatename": "store_template"
					}),
	"specialstore": new Category({
							"renderer": "storePoint",
							"type": "point",
							"id": "specialstore",
							"name": "Erikoiskauppa",
							"infotemplatename": "store_template"
					}),
	"school": new Category({
							"renderer": "schoolPoint",
							"type": "point",
							"id": "school",
							"name": "Koulu",
							"infotemplatename": "service_place_template"
					}),
	"school_or_daycare": new Category({
							"renderer": "schoolPoint",
							"type": "point",
							"id": "school_or_daycare",
							"name": "Koulu tai päiväkoti",
							"infotemplatename": "service_place_template"
					}),
	"daycare": new Category({
							"renderer": "daycarePoint",
							"type": "point",
							"id": "daycare",
							"name": "Päiväkoti",
							"infotemplatename": "service_place_template"
					}),
	"work_study_place": new Category({
							"renderer": "workStudyPoint",
							"type": "point",
							"id": "work_study_place",
							"name": "Työ- tai opiskelupaikka",
							"infotemplatename": "service_place_template"
					}),
	"hobby_place": new Category({
							"renderer": "hobbyPoint",
							"type": "point",
							"id": "hobby_place",
							"name": "Harrastuspaikka",
							"infotemplatename": "service_place_template"
					}),
	"culture_place": new Category({
							"renderer": "culturePoint",
							"type": "point",
							"id": "culture_place",
							"name": "Kulttuuripalvelu",
							"infotemplatename": "service_place_template"
					}),
	"other_service": new Category({
							"renderer": "otherServicePoint",
							"type": "point",
							"id": "other_service",
							"name": "Muu palvelu",
							"infotemplatename": "service_place_template"
					}),
	"home": new Category({
							"renderer": "homePoint",
							"type": "point",
							"id": "home",
							"name": "Koti",
							"maxAmount": 1,
							"infotemplatename": "home_template"
					}),
	"center_of_vaasa": new Category({
							"renderer": "newBuilding",
							"type": "point",
							"id": "center_of_vaasa",
							"name": "Vaasan keskusta",
							"maxAmount": 1,
							"infotemplatename": "default"
					}),
	"new_ser_act": new Category({
							"renderer": "otherServicePoint",
							"type": "point",
							"id": "new_ser_act",
							"name": "Uusi tominto tai palvelu",
							"maxAmount": 100,
							"infotemplatename": "default"
					})
	};

/*
infotemplates used in the application
*/
var infotemplates = {
	"default": {
		"confirm": "<form name='info_form' id='info_form'><p>Menikö merkki oikeaan paikkaan?</p><div class='center'><div class='button' onclick='categories.${category}.getInfoValues(\"info_form\",${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div><!-- center --></form>",
		"confirmHeight": 150,
		"confirmWidth": 250,
		"info": "<form name='info_form' id='info_form'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Sulje ikkuna</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></form>",	
		"infoWidth": 250,
		"infoHeight": 150
		},
	"pos_aesthetic": {
		"confirm": "<form name='info_form' id ='info_form'><p>Kerro paikan ulkoisesta ilmeestä tarkemmin! Tässä paikassa...</p><input type='checkbox' name='qual_green' class='dojo-checkbox' value='qual_green' /><label for='qual_green'>Laadukas viheralue</label><br /><input type='checkbox' name='cozy' class='dojo-checkbox' value='cozy' /><label for='cozy'>Keskusta on viihtyisä</label><br /><input type='checkbox' name='beautiful_architecture' class='dojo-checkbox' value='beautiful_architecture' /><label for='beautiful_architecture'>Arkkitehtuuri on kaunista</label><br /><input type='checkbox' name='finnished_env' class='dojo-checkbox' value='finnished_env' /><label for='finnished_env'>Ympäristö on viimeisteltyä</label><br /><input type='checkbox' name='clean_env' class='dojo-checkbox' value='clean_env' /><label for='clean_env'>Ympäristö on siisti</label><br /><input type='checkbox' name='build_density' class='dojo-checkbox' value='build_density' /><label for='build_density'>Rakentamisen tiiviys on sopiva</label><br /><input type='checkbox' name='build_h_ok' class='dojo-checkbox' value='build_h_ok' /><label for='build_h_ok'>Rakennuksen korkeus ja mittakaava on sopiva</label><br /><input type='checkbox' name='history' class='dojo-checkbox' value='history' /><label for='history'>Historian havina tuntuu</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"info": "<form name='info_form' id ='info_form'><p>Kerro paikan ulkoisesta ilmeestä tarkemmin! Tässä paikassa...</p><input type='checkbox' name='qual_green' class='dojo-checkbox' value='qual_green' /><label for='qual_green'>Laadukas viheralue</label><br /><input type='checkbox' name='cozy' class='dojo-checkbox' value='cozy' /><label for='cozy'>Keskusta on viihtyisä</label><br /><input type='checkbox' name='beautiful_architecture' class='dojo-checkbox' value='beautiful_architecture' /><label for='beautiful_architecture'>Arkkitehtuuri on kaunista</label><br /><input type='checkbox' name='finnished_env' class='dojo-checkbox' value='finnished_env' /><label for='finnished_env'>Ympäristö on viimeisteltyä</label><br /><input type='checkbox' name='clean_env' class='dojo-checkbox' value='clean_env' /><label for='clean_env'>Ympäristö on siisti</label><br /><input type='checkbox' name='build_density' class='dojo-checkbox' value='build_density' /><label for='build_density'>Rakentamisen tiiviys on sopiva</label><br /><input type='checkbox' name='build_h_ok' class='dojo-checkbox' value='build_h_ok' /><label for='build_h_ok'>Rakennuksen korkeus ja mittakaava on sopiva</label><br /><input type='checkbox' name='history' class='dojo-checkbox' value='history' /><label for='history'>Historian havina tuntuu</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"confirmHeight": 460,
		"confirmWidth": 260, 
		"infoWidth": 260, 
		"infoHeight": 460
	},
	"neg_aesthetic": {
		"confirm": "<form name='info_form' id ='info_form'><p>Kerro paikan ulkoisesta ilmeestä tarkemmin! Tässä paikassa...</p><input type='checkbox' name='badqual_green' class='dojo-checkbox' value='badqual_green' /><label for='badqual_green'>Viheralueita puuttuu</label><br /><input type='checkbox' name='uncozy' class='dojo-checkbox' value='uncozy' /><label for='uncozy'>Keskusta on epäviihtyisä</label><br /><input type='checkbox' name='ugly_architecture' class='dojo-checkbox' value='ugly_architecture' /><label for='ugly_architecture'>Arkkitehtuuri on rumaa</label><br /><input type='checkbox' name='unfinnished_env' class='dojo-checkbox' value='unfinnished_env' /><label for='unfinnished_env'>Ympäristön viimeistely puuttuu</label><br /><input type='checkbox' name='dirty_env' class='dojo-checkbox' value='dirty_env' /><label for='dirty_env'>Ympäristö on epäsiisti</label><br /><input type='checkbox' name='build_density' class='dojo-checkbox' value='build_density' /><label for='build_density'>Rakentaminen on liian tiivistä</label><br /><input type='checkbox' name='build_h_not_ok' class='dojo-checkbox' value='build_h_not_ok' /><label for='build_h_not_ok'>Rakennuksen korkeus ja mittakaava on liian suuri/pieni</label><br /><input type='checkbox' name='history' class='dojo-checkbox' value='history' /><label for='history'>Historiallisuus puuttuu</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"info": "<form name='info_form' id ='info_form'><p>Kerro paikan ulkoisesta ilmeestä tarkemmin! Tässä paikassa...</p><input type='checkbox' name='badqual_green' class='dojo-checkbox' value='badqual_green' /><label for='badqual_green'>Viheralueita puuttuu</label><br /><input type='checkbox' name='uncozy' class='dojo-checkbox' value='uncozy' /><label for='uncozy'>Keskusta on epäviihtyisä</label><br /><input type='checkbox' name='ugly_architecture' class='dojo-checkbox' value='ugly_architecture' /><label for='ugly_architecture'>Arkkitehtuuri on rumaa</label><br /><input type='checkbox' name='unfinnished_env' class='dojo-checkbox' value='unfinnished_env' /><label for='unfinnished_env'>Ympäristön viimeistely puuttuu</label><br /><input type='checkbox' name='dirty_env' class='dojo-checkbox' value='dirty_env' /><label for='dirty_env'>Ympäristö on epäsiisti</label><br /><input type='checkbox' name='build_density' class='dojo-checkbox' value='build_density' /><label for='build_density'>Rakentaminen on liian tiivistä</label><br /><input type='checkbox' name='build_h_not_ok' class='dojo-checkbox' value='build_h_not_ok' /><label for='build_h_not_ok'>Rakennuksen korkeus ja mittakaava on liian suuri/pieni</label><br /><input type='checkbox' name='history' class='dojo-checkbox' value='history' /><label for='history'>Historiallisuus puuttuu</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"confirmHeight": 460,
		"confirmWidth": 260, 
		"infoWidth": 260, 
		"infoHeight": 460
		},
	"pos_activity": {
		"confirm": "<form name='info_form' id ='info_form'><p>Kerro paikan toimintamahdollisuuksista tarkemmin! Tässä paikassa...</p><input type='checkbox' name='good_parking' class='dojo-checkbox' value='good_parking' /><label for='good_parking'>Auto-/pyöräpysäköinti on toimiva</label><br /><input type='checkbox' name='good_meeting' class='dojo-checkbox' value='good_meeting' /><label for='good_meeting'>Hyviä kohtaamispaikkoja</label><br /><input type='checkbox' name='hobby_opportunities' class='dojo-checkbox' value='hobby_opportunities' /><label for='hobby_opportunities'>Harrastus- ja tekemismahdollisuudet ovat hyvät</label><br /><input type='checkbox' name='walking_or_cycling' class='dojo-checkbox' value='walking_or_cycling' /><label for='walking_or_cycling'>Kävellen tai pyörällä liikkuminen on sujuvaa</label><br /><input type='checkbox' name='public_transport' class='dojo-checkbox' value='public_transport' /><label for='public_transport'>Julkisilla liikennevälineillä liikkuminen on sujuvaa</label><br /><input type='checkbox' name='driving_with_car' class='dojo-checkbox' value='driving_with_car' /><label for='driving_with_car'>Autolla liikkuminen on sujuvaa</label><br /><input type='checkbox' name='safe_traffic' class='dojo-checkbox' value='safe_traffic' /><label for='safe_traffic'>Liikenneturvallisuus on hyvä</label><br /><input type='checkbox' name='moving' class='dojo-checkbox' value='moving' /><label for='moving'>Liikkuminen on esteetöntä</label><br /><input type='checkbox' name='vivid_culture_life' class='dojo-checkbox' value='vivid_culture_life' /><label for='vivid_culture_life'>Kulttuurielämä on vilkasta</label><br /><input type='checkbox' name='own_lifestyle' class='dojo-checkbox' value='own_lifestyle' /><label for='own_lifestyle'>Oman elämäntavan toteuttaminen onnistuu hyvin</label><br /><input type='checkbox' name='service' class='dojo-checkbox' value='service' /><label for='service'>Palvelut ovat hyvät</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"info": "<form name='info_form' id ='info_form'><p>Kerro paikan toimintamahdollisuuksista tarkemmin! Tässä paikassa...</p><input type='checkbox' name='good_parking' class='dojo-checkbox' value='good_parking' /><label for='good_parking'>Auto-/pyöräpysäköinti on toimiva</label><br /><input type='checkbox' name='good_meeting' class='dojo-checkbox' value='good_meeting' /><label for='good_meeting'>Hyviä kohtaamispaikkoja</label><br /><input type='checkbox' name='hobby_opportunities' class='dojo-checkbox' value='hobby_opportunities' /><label for='hobby_opportunities'>Harrastus- ja tekemismahdollisuudet ovat hyvät</label><br /><input type='checkbox' name='walking_or_cycling' class='dojo-checkbox' value='walking_or_cycling' /><label for='walking_or_cycling'>Kävellen tai pyörällä liikkuminen on sujuvaa</label><br /><input type='checkbox' name='public_transport' class='dojo-checkbox' value='public_transport' /><label for='public_transport'>Julkisilla liikennevälineillä liikkuminen on sujuvaa</label><br /><input type='checkbox' name='driving_with_car' class='dojo-checkbox' value='driving_with_car' /><label for='driving_with_car'>Autolla liikkuminen on sujuvaa</label><br /><input type='checkbox' name='safe_traffic' class='dojo-checkbox' value='safe_traffic' /><label for='safe_traffic'>Liikenneturvallisuus on hyvä</label><br /><input type='checkbox' name='moving' class='dojo-checkbox' value='moving' /><label for='moving'>Liikkuminen on esteetöntä</label><br /><input type='checkbox' name='vivid_culture_life' class='dojo-checkbox' value='vivid_culture_life' /><label for='vivid_culture_life'>Kulttuurielämä on vilkasta</label><br /><input type='checkbox' name='own_lifestyle' class='dojo-checkbox' value='own_lifestyle' /><label for='own_lifestyle'>Oman elämäntavan toteuttaminen onnistuu hyvin</label><br /><input type='checkbox' name='service' class='dojo-checkbox' value='service' /><label for='service'>Palvelut ovat hyvät</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"confirmHeight": 550, 
		"confirmWidth": 280, 
		"infoWidth": 280, 
		"infoHeight": 550
		},
	"neg_activity": {
		"confirm": "<form name='info_form' id ='info_form'><p>Kerro paikan toimintamahdollisuuksista tarkemmin! Tässä paikassa...</p><input type='checkbox' name='bad_parking' class='dojo-checkbox' value='bad_parking' /><label for='bad_parking'>Auto-/pyöräpysäköinti ei toimi tai puuttuu</label><br /><input type='checkbox' name='bad_meeting' class='dojo-checkbox' value='bad_meeting' /><label for='bad_meeting'>Kohtaamispaikkoja puuttuu</label><br /><input type='checkbox' name='hobby_opportunities' class='dojo-checkbox' value='hobby_opportunities' /><label for='hobby_opportunities'>Harrastus- ja tekemismahdollisuudet ovat huonot</label><br /><input type='checkbox' name='walking_or_cycling' class='dojo-checkbox' value='walking_or_cycling' /><label for='walking_or_cycling'>Kävellen tai pyörällä liikkuminen on hankalaa</label><br /><input type='checkbox' name='public_transport' class='dojo-checkbox' value='public_transport' /><label for='public_transport'>Julkisilla liikennevälineillä liikkuminen on hankalaa</label><br /><input type='checkbox' name='driving_with_car' class='dojo-checkbox' value='driving_with_car' /><label for='driving_with_car'>Autolla liikkuminen on hankalaa</label><br /><input type='checkbox' name='unsafe_traffic' class='dojo-checkbox' value='unsafe_traffic' /><label for='unsafe_traffic'>Liikenneturvallisuus on huono</label><br /><input type='checkbox' name='moving' class='dojo-checkbox' value='moving' /><label for='moving'>Esteet hankaloittavat liikkumistani</label><br /><input type='checkbox' name='dull_culture_life' class='dojo-checkbox' value='dull_culture_life' /><label for='dull_culture_life'>Kulttuurielämä on hiljaista</label><br /><input type='checkbox' name='own_lifestyle' class='dojo-checkbox' value='own_lifestyle' /><label for='own_lifestyle'>Oman elämäntavan toteuttaminen onnistuu huonosti</label><br /><input type='checkbox' name='service' class='dojo-checkbox' value='service' /><label for='service'>Palvelut ovat huonot</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"info": "<form name='info_form' id ='info_form'><p>Kerro paikan toimintamahdollisuuksista tarkemmin! Tässä paikassa...</p><input type='checkbox' name='bad_parking' class='dojo-checkbox' value='bad_parking' /><label for='bad_parking'>Auto-/pyöräpysäköinti ei toimi tai puuttuu</label><br /><input type='checkbox' name='bad_meeting' class='dojo-checkbox' value='bad_meeting' /><label for='bad_meeting'>Kohtaamispaikkoja puuttuu</label><br /><input type='checkbox' name='hobby_opportunities' class='dojo-checkbox' value='hobby_opportunities' /><label for='hobby_opportunities'>Harrastus- ja tekemismahdollisuudet ovat huonot</label><br /><input type='checkbox' name='walking_or_cycling' class='dojo-checkbox' value='walking_or_cycling' /><label for='walking_or_cycling'>Kävellen tai pyörällä liikkuminen on hankalaa</label><br /><input type='checkbox' name='public_transport' class='dojo-checkbox' value='public_transport' /><label for='public_transport'>Julkisilla liikennevälineillä liikkuminen on hankalaa</label><br /><input type='checkbox' name='driving_with_car' class='dojo-checkbox' value='driving_with_car' /><label for='driving_with_car'>Autolla liikkuminen on hankalaa</label><br /><input type='checkbox' name='unsafe_traffic' class='dojo-checkbox' value='unsafe_traffic' /><label for='unsafe_traffic'>Liikenneturvallisuus on huono</label><br /><input type='checkbox' name='moving' class='dojo-checkbox' value='moving' /><label for='moving'>Esteet hankaloittavat liikkumistani</label><br /><input type='checkbox' name='dull_culture_life' class='dojo-checkbox' value='dull_culture_life' /><label for='dull_culture_life'>Kulttuurielämä on hiljaista</label><br /><input type='checkbox' name='own_lifestyle' class='dojo-checkbox' value='own_lifestyle' /><label for='own_lifestyle'>Oman elämäntavan toteuttaminen onnistuu huonosti</label><br /><input type='checkbox' name='service' class='dojo-checkbox' value='service' /><label for='service'>Palvelut ovat huonot</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"confirmHeight": 550,
		"confirmWidth": 280, 
		"infoWidth": 280, 
		"infoHeight": 530
	},
	"neg_social": {
		"confirm": "<form name='info_form' id ='info_form'><p>Kerro paikan ilmapiiristä tarkemmin! Tässä paikassa...</p><input type='checkbox' name='env_care' class='dojo-checkbox' value='env_care' /><label for='env_care'>Kaupunkilaiset eivät huolehdi ympäristöstä</label><br /><input type='checkbox' name='no_social_life' class='dojo-checkbox' value='no_social_life' /><label for='no_social_life'>Sosiaalinen elämä on liian hiljaista</label><br /><input type='checkbox' name='diversity' class='dojo-checkbox' value='diversity' /><label for='diversity'>Asukkaiden kirjo on liiallinen tai liian vähäinen</label><br /><input type='checkbox' name='image' class='dojo-checkbox' value='image' /><label for='image'>Alueen maine on huono</label><br /><input type='checkbox' name='mutual_no_care' class='dojo-checkbox' value='mutual_no_care' /><label for='mutual_no_care'>Asukkaat eivät välitä toisistaan</label><br /><input type='checkbox' name='social_unsafe' class='dojo-checkbox' value='social_unsafe' /><label for='social_unsafe'>Sosiaalinen turvallisuus on huono</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"info": "<form name='info_form' id ='info_form'><p>Kerro paikan ilmapiiristä tarkemmin! Tässä paikassa...</p><input type='checkbox' name='env_care' class='dojo-checkbox' value='env_care' /><label for='env_care'>Kaupunkilaiset eivät huolehdi ympäristöstä</label><br /><input type='checkbox' name='no_social_life' class='dojo-checkbox' value='no_social_life' /><label for='no_social_life'>Sosiaalinen elämä on liian hiljaista</label><br /><input type='checkbox' name='diversity' class='dojo-checkbox' value='diversity' /><label for='diversity'>Asukkaiden kirjo on liiallinen tai liian vähäinen</label><br /><input type='checkbox' name='image' class='dojo-checkbox' value='image' /><label for='image'>Alueen maine on huono</label><br /><input type='checkbox' name='mutual_no_care' class='dojo-checkbox' value='mutual_no_care' /><label for='mutual_no_care'>Asukkaat eivät välitä toisistaan</label><br /><input type='checkbox' name='social_unsafe' class='dojo-checkbox' value='social_unsafe' /><label for='social_unsafe'>Sosiaalinen turvallisuus on huono</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
        "confirmHeight": 490,
        "confirmWidth": 260, 
        "infoWidth": 260, 
        "infoHeight": 490
	},
	"pos_social": {
		"confirm": "<form name='info_form' id ='info_form'><p>Kerro paikan ilmapiiristä tarkemmin! Tässä paikassa...</p><input type='checkbox' name='env_care' class='dojo-checkbox' value='env_care' /><label for='env_care'>Kaupunkilaiset pitävät hyvää huolta ympäristöstä</label><br /><input type='checkbox' name='rich_social_life' class='dojo-checkbox' value='rich_social_life' /><label for='rich_social_life'>Sosiaalinen elämä on vilkasta</label><br /><input type='checkbox' name='diversity' class='dojo-checkbox' value='diversity' /><label for='diversity'>Asukkaiden kirjo on sopiva</label><br /><input type='checkbox' name='image' class='dojo-checkbox' value='image' /><label for='image'>Alueen maine on hyvä</label><br /><input type='checkbox' name='mutual_care' class='dojo-checkbox' value='mutual_care' /><label for='mutual_care'>Asukkaat välittävät toisistaan</label><br /><input type='checkbox' name='social_safety' class='dojo-checkbox' value='social_safety' /><label for='social_safety'>Sosiaalinen turvallisuus on hyvä</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"info": "<form name='info_form' id ='info_form'><p>Kerro paikan ilmapiiristä tarkemmin! Tässä paikassa...</p><input type='checkbox' name='env_care' class='dojo-checkbox' value='env_care' /><label for='env_care'>Kaupunkilaiset pitävät hyvää huolta ympäristöstä</label><br /><input type='checkbox' name='rich_social_life' class='dojo-checkbox' value='rich_social_life' /><label for='rich_social_life'>Sosiaalinen elämä on vilkasta</label><br /><input type='checkbox' name='diversity' class='dojo-checkbox' value='diversity' /><label for='diversity'>Asukkaiden kirjo on sopiva</label><br /><input type='checkbox' name='image' class='dojo-checkbox' value='image' /><label for='image'>Alueen maine on hyvä</label><br /><input type='checkbox' name='mutual_care' class='dojo-checkbox' value='mutual_care' /><label for='mutual_care'>Asukkaat välittävät toisistaan</label><br /><input type='checkbox' name='social_safety' class='dojo-checkbox' value='social_safety' /><label for='social_safety'>Sosiaalinen turvallisuus on hyvä</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"confirmHeight": 460,
		"confirmWidth": 260,
		"infoWidth": 260,
		"infoHeight": 460
		},
	"pos_atmosphere": {
		"confirm": "<form name='info_form' id ='info_form'><p>Kerro paikan tunnelmasta tarkemmin! Tämä paikka on...</p><input type='checkbox' name='best_place' class='dojo-checkbox' value='best_place' /><label for='best_place'>Keskustan paras paikka</label><br /><input type='checkbox' name='welcoming' class='dojo-checkbox' value='welcoming' /><label for='welcoming'>Kutsuva</label><br /><input type='checkbox' name='vivid' class='dojo-checkbox' value='vivid' /><label for='vivid'>Tunnelmaltaan elävä</label><br /><input type='checkbox' name='relaxed' class='dojo-checkbox' value='relaxed' /><label for='relaxed'>Rentouttava</label><br /><input type='checkbox' name='close_to_nature' class='dojo-checkbox' value='close_to_nature' /><label for='close_to_nature'>Luonnonläheinen</label><br /><input type='checkbox' name='quiet' class='dojo-checkbox' value='quiet' /><label for='quiet'>Meluton</label><br /><input type='checkbox' name='surprising' class='dojo-checkbox' value='surprising' /><label for='surprising'>Sopivan yllätyksellinen</label><br /><input type='checkbox' name='calm' class='dojo-checkbox' value='calm' /><label for='calm'>Rauhallinen</label><br /><input type='checkbox' name='child_friendly' class='dojo-checkbox' value='child_friendly' /><label for='child_friendly'>Lapsiystävällinen</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"info": "<form name='info_form' id ='info_form'><p>Kerro paikan tunnelmasta tarkemmin! Tämä paikka on...</p><input type='checkbox' name='best_place' class='dojo-checkbox' value='best_place' /><label for='best_place'>Keskustan paras paikka</label><br /><input type='checkbox' name='welcoming' class='dojo-checkbox' value='welcoming' /><label for='welcoming'>Kutsuva</label><br /><input type='checkbox' name='vivid' class='dojo-checkbox' value='vivid' /><label for='vivid'>Tunnelmaltaan elävä</label><br /><input type='checkbox' name='relaxed' class='dojo-checkbox' value='relaxed' /><label for='relaxed'>Rentouttava</label><br /><input type='checkbox' name='close_to_nature' class='dojo-checkbox' value='close_to_nature' /><label for='close_to_nature'>Luonnonläheinen</label><br /><input type='checkbox' name='quiet' class='dojo-checkbox' value='quiet' /><label for='quiet'>Meluton</label><br /><input type='checkbox' name='surprising' class='dojo-checkbox' value='surprising' /><label for='surprising'>Sopivan yllätyksellinen</label><br /><input type='checkbox' name='calm' class='dojo-checkbox' value='calm' /><label for='calm'>Rauhallinen</label><br /><input type='checkbox' name='child_friendly' class='dojo-checkbox' value='child_friendly' /><label for='child_friendly'>Lapsiystävällinen</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"confirmHeight": 400, 
		"confirmWidth": 250, 
		"infoWidth": 250, 
		"infoHeight": 400
	},
	"neg_atmosphere": {
		"confirm": "<form name='info_form' id ='info_form'><p>Kerro paikan tunnelmasta tarkemmin! Tämä paikka on...</p><input type='checkbox' name='worst_place' class='dojo-checkbox' value='worst_place' /><label for='worst_place'>Keskustan huonoin paikka</label><br /><input type='checkbox' name='unwelcoming' class='dojo-checkbox' value='unwelcoming' /><label for='unwelcoming'>Torjuva</label><br /><input type='checkbox' name='dull' class='dojo-checkbox' value='dull' /><label for='dull'>Tunnelmaltaan kuollut</label><br /><input type='checkbox' name='stressful' class='dojo-checkbox' value='stressful' /><label for='stressful'>Stressaava</label><br /><input type='checkbox' name='absent_from_nature' class='dojo-checkbox' value='absent_from_nature' /><label for='absent_from_nature'>Kaukana luonnosta</label><br /><input type='checkbox' name='noisy' class='dojo-checkbox' value='noisy' /><label for='noisy'>Meluisa</label><br /><input type='checkbox' name='predictable' class='dojo-checkbox' value='predictable' /><label for='predictable'>Liian ennnustettava</label><br /><input type='checkbox' name='hectic' class='dojo-checkbox' value='hectic' /><label for='hectic'>Rauhaton</label><br /><input type='checkbox' name='child_unfriendly' class='dojo-checkbox' value='child_unfriendly' /><label for='child_unfriendly'>Lapsikielteinen</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"info": "<form name='info_form' id ='info_form'><p>Kerro paikan tunnelmasta tarkemmin! Tämä paikka on...</p><input type='checkbox' name='worst_place' class='dojo-checkbox' value='worst_place' /><label for='worst_place'>Keskustan huonoin paikka</label><br /><input type='checkbox' name='unwelcoming' class='dojo-checkbox' value='unwelcoming' /><label for='unwelcoming'>Torjuva</label><br /><input type='checkbox' name='dull' class='dojo-checkbox' value='dull' /><label for='dull'>Tunnelmaltaan kuollut</label><br /><input type='checkbox' name='stressful' class='dojo-checkbox' value='stressful' /><label for='stressful'>Stressaava</label><br /><input type='checkbox' name='absent_from_nature' class='dojo-checkbox' value='absent_from_nature' /><label for='absent_from_nature'>Kaukana luonnosta</label><br /><input type='checkbox' name='noisy' class='dojo-checkbox' value='noisy' /><label for='noisy'>Meluisa</label><br /><input type='checkbox' name='predictable' class='dojo-checkbox' value='predictable' /><label for='predictable'>Liian ennnustettava</label><br /><input type='checkbox' name='hectic' class='dojo-checkbox' value='hectic' /><label for='hectic'>Rauhaton</label><br /><input type='checkbox' name='child_unfriendly' class='dojo-checkbox' value='child_unfriendly' /><label for='child_unfriendly'>Lapsikielteinen</label><br /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide();'>Poista kohde</div></div><!-- center --></form>",
		"confirmHeight": 400, 
		"confirmWidth": 250,
		"infoWidth": 250,
		"infoHeight": 400
	},
	"modify": {	
		"confirm": "<form name='info_form' id='info_form'><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><p>Menikö kohde oikeaan paikkaan</p><div class='infobutton_area'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div></form>",
		"info": "<form name='info_form' id='info_form'><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><p>Menikö kohde oikeaan paikkaan</p><div class='infobutton_area'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div></form>",
		"confirmHeight": 270,
		"confirmWidth": 240,
		"infoWidth": 240,
		"infoHeight": 270
	},
	"service_place_template": {
		"confirm": "<form name='info' id='info_form'><p>Onko sijainti hyvä?</p><input class='dojo-radiobutton' type='radio' name='good_position' value='yes' /><label for='yes'>Kyllä</label><input class='dojo-radiobutton' type='radio' name='good_position' value='no' /><label for='no'>Ei</label><p>Kuinka monta kertaa käyt viikossa?</p><input type='text' name='how_often_per_week' class='dojo-textbox'/><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div><!-- center --></form>",
		"info": "<form name='info' id='info_form'><p>Onko sijainti hyvä?</p><input class='dojo-radiobutton' type='radio' name='good_position' value='yes' /><label for='yes'>Kyllä</label><input class='dojo-radiobutton' type='radio' name='good_position' value='no' /><label for='no'>Ei</label><p>Kuinka monta kertaa käyt viikossa?</p><input type='text' name='how_often_per_week' class='dojo-textbox'/><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div><!-- center --></form>",
		"confirmHeight": 350, 
		"confirmWidth": 250,
		"infoWidth": 250,
		"infoHeight": 350
	},
    "service_route_template": {
        "confirm": "<form name='info' id='info_form'><p>Miten pääasiallisesti kuljet reittiä?</p><p><input class='dojo-checkbox' type='checkbox' name='route_type' value='walk' /><label for='walk'>Kävellen</label></p><p><input class='dojo-checkbox'  type='checkbox' name='route_type' value='bicycle' /><label for='bicycle'>Pyörällä</label></p><p><input class='dojo-checkbox'  type='checkbox' name='route_type' value='car' /><label for='car'>Autolla</label></p><p><input class='dojo-checkbox'  type='checkbox' name='route_type' value='public_transport' /><label for='public_transport'>Julkisilla</label></p><p>Muuten, miten?</p><input class='dojo-textbox' type='text' name='other' /><p>Onko reitti?</p><div class='slider_values'><span class='left'>Epämiellyttävä</span><span class='right'>Miellyttävä</span></div><div class='dojo-horizontalslider'></div><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div><!-- center --></form>",
        "info": "<form name='info' id='info_form'><p>Miten pääasiallisesti kuljet reittiä?</p><p><input class='dojo-checkbox' type='checkbox' name='route_type' value='walk' /><label for='walk'>Kävellen</label></p><p><input class='dojo-checkbox'  type='checkbox' name='route_type' value='bicycle' /><label for='bicycle'>Pyörällä</label></p><p><input class='dojo-checkbox'  type='checkbox' name='route_type' value='car' /><label for='car'>Autolla</label></p><p><input class='dojo-checkbox'  type='checkbox' name='route_type' value='public_transport' /><label for='public_transport'>Julkisilla</label></p><p>Muuten, miten?</p><input class='dojo-textbox' type='text' name='other' /><p>Onko reitti?</p><div class='slider_values'><span class='left'>Epämiellyttävä</span><span class='right'>Miellyttävä</span></div><div class='dojo-horizontalslider'></div><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div><!-- center --></form>",
        "confirmHeight": 390,
        "confirmWidth": 250,
        "infoWidth": 250,
        "infoHeight": 390
    },
	"store_template": {
		"confirm": "<form name='info' id='info_form'><p>Onko sijainti hyvä?</p><input class='dojo-radiobutton' type='radio' name='good_position' value='yes' /><label for='yes'>Kyllä</label><input class='dojo-radiobutton' type='radio' name='good_position' value='no' /><label for='no'>Ei</label><p>Kuinka monta kertaa käyt viikossa?</p><input type='text' name='how_often_per_week' class='dojo-textbox'/><p>Miten tyytyväinen olet tähän kauppaan?</p><div class='slider_values'><span class='left'>Erittäin tyytymätön</span><span class='right'>Erittäin tyytyväinen</span></div><div class='dojo-horizontalslider'></div><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div><!-- center --></form>",
		"info": "<form name='info' id='info_form'><p>Onko sijainti hyvä?</p><input class='dojo-radiobutton' type='radio' name='good_position' value='yes' /><label for='yes'>Kyllä</label><input class='dojo-radiobutton' type='radio' name='good_position' value='no' /><label for='no'>Ei</label><p>Kuinka monta kertaa käyt viikossa?</p><input type='text' name='how_often_per_week' class='dojo-textbox'/><p>Miten tyytyväinen olet tähän kauppaan?</p><div class='slider_values'><span class='left'>Erittäin tyytymätön</span><span class='right'>Erittäin tyytyväinen</span></div><div class='dojo-horizontalslider'></div><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div><!-- center --></form>",
		"confirmHeight": 400, 
		"confirmWidth": 250,
		"infoWidth": 250,
		"infoHeight": 400
	},
    "outdoor_route_template": {
        "confirm": "<form name='info' id='info_form'><p>Miten pääasiallisesti kuljet reittiä?</p><p><input class='dojo-checkbox' type='checkbox' name='walk' value='walk' /><label for='walk'>Kävellen</label></p><p><input class='dojo-checkbox'  type='checkbox' name='run' value='run' /><label for='run'>Juosten</label></p><p><input class='dojo-checkbox'  type='checkbox' name='bicycle' value='bicycle' /><label for='bicycle'>Pyörällä</label></p><p><input class='dojo-checkbox'  type='checkbox' name='dog' value='dog' /><label for='dog'>Koiran kanssa</label></p><p><input class='dojo-checkbox'  type='checkbox' name='children' value='children' /><label for='children'>Lasten kanssa</label></p><p>Muuten, miten?</p><input class='dojo-textbox' type='text' name='other' /><p>Onko reitti?</p><div class='slider_values'><span class='left'>Epämiellyttävä</span><span class='right'>Miellyttävä</span></div><div class='dojo-horizontalslider'></div><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div><!-- center --></form>",
        "info": "<form name='info' id='info_form'><p>Miten pääasiallisesti kuljet reittiä?</p><p><input class='dojo-checkbox' type='checkbox' name='walk' value='walk' /><label for='walk'>Kävellen</label></p><p><input class='dojo-checkbox'  type='checkbox' name='run' value='run' /><label for='run'>Juosten</label></p><p><input class='dojo-checkbox'  type='checkbox' name='bicycle' value='bicycle' /><label for='bicycle'>Pyörällä</label></p><p><input class='dojo-checkbox'  type='checkbox' name='dog' value='dog' /><label for='dog'>Koiran kanssa</label></p><p><input class='dojo-checkbox'  type='checkbox' name='children' value='children' /><label for='children'>Lasten kanssa</label></p><p>Muuten, miten?</p><input class='dojo-textbox' type='text' name='other' /><p>Onko reitti?</p><div class='slider_values'><span class='left'>Epämiellyttävä</span><span class='right'>Miellyttävä</span></div><div class='dojo-horizontalslider'></div><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div><!-- center --></form>",
        "confirmHeight": 420,
        "confirmWidth": 250,
        "infoWidth": 250,
        "infoHeight": 420
    },
	"greenspace_template": {
		"confirm": "<form name='info' id='info_form'><p>Onko sijainti hyvä?</p><input class='dojo-radiobutton' type='radio' name='good_position' value='yes' /><label for='yes'>Kyllä</label><input class='dojo-radiobutton' type='radio' name='good_position' value='no' /><label for='no'>Ei</label><p>Kuinka monta kertaa käyt viikossa?</p><input type='text' name='how_often_per_week' class='dojo-textbox'/><p>Onko viheralueen käytölle talvella tarvetta?</p><input type='radio' name='winter_use' value='yes' class='dojo-radiobutton'/><label for='yes'>Kyllä</label><input type='radio' name='winter_use' value='no'  class='dojo-radiobutton'/><label for='no'>Ei</label><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div><!-- center --></form>",
		"info": "<form name='info' id='info_form'><p>Onko sijainti hyvä?</p><input class='dojo-radiobutton' type='radio' name='good_position' value='yes' /><label for='yes'>Kyllä</label><input class='dojo-radiobutton' type='radio' name='good_position' value='no' /><label for='no'>Ei</label><p>Kuinka monta kertaa käyt viikossa?</p><input type='text' name='how_often_per_week' class='dojo-textbox'/><p>Onko viheralueen käytölle talvella tarvetta?</p><input type='radio' name='winter_use' value='yes' class='dojo-radiobutton'/><label for='yes'>Kyllä</label><input type='radio' name='winter_use' value='no'  class='dojo-radiobutton'/><label for='no'>Ei</label><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><div class='center'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div><!-- center --></form>",
		"confirmHeight": 370,
		"confirmWidth": 250,
		"infoWidth": 250,
		"infoHeight": 370
	},
	"new_route": {
		"confirm": "<form name='info_form' id='info_form'><p>Minkälainen reitti?</p><select class='dojo-filteringselect' name='route_type'><option value=''></option><option value='walking_route'>Kävelyreitti</option><option value='cycling_route'>Pyörätie</option><option value='car_route'>Autotie</option><option value='public_transport_route'>Julkisten kulkuneuvojen reitti</option></select><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><p>Menikö kohde oikeaan paikkaan</p><div class='infobutton_area'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div></form>",
		"info": "<form name='info_form' id='info_form'><p>Minkälainen reitti?</p><select class='dojo-filteringselect' name='route_type'><option value=''></option><option value='walking_route'>Kävelyreitti</option><option value='cycling_route'>Pyörätie</option><option value='car_route'>Autotie</option><option value='public_transport_route'>Julkisten kulkuneuvojen reitti</option></select><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><p>Menikö kohde oikeaan paikkaan</p><div class='infobutton_area'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div></form>",
		"confirmWidth": 250,
		"confirmHeight": 300, 
		"infoWidth": 250,
		"infoHeight": 300
		},
	"new_building": {
		"confirm": "<form name='info_form' id='info_form'><p>Minkä kokoinen rakennus?</p><select class='dojo-filteringselect' name='house_size'><option value=''></option><option value='separate_house'>Erillistalo</option><option value='pair_house'>Paritalo</option><option value='row_house'>Rivitalo</option><option value='low_block'>Pienkerrostalo</option><option value='high_block'>Kerrostalo (yli 4 kerrosta)</option></select><p>Mihin tarkoitukseen?</p><input type='radio' name='purpose' value='living' class='dojo-radiobutton' /><label for='living'>Asuminen</label><br /><input type='radio' name='purpose' value='industry' class='dojo-radiobutton' /><label for='industry'>Teollisuus</label><br /><input type='radio' name='purpose' value='service' class='dojo-radiobutton' /><label for='service'>Palvelu</label><br /><p>Muu mikä?</p><input type='text' name='purpose-text' class='dojo-textbox' /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><p>Menikö kohde oikeaan paikkaan</p><div class='infobutton_area'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div></form>",
		"info": "<form name='info_form' id='info_form'><p>Minkä kokoinen rakennus?</p><select class='dojo-filteringselect' name='house_size'><option value=''></option><option value='separate_house'>Erillistalo</option><option value='pair_house'>Paritalo</option><option value='row_house'>Rivitalo</option><option value='low_block'>Pienkerrostalo</option><option value='high_block'>Kerrostalo (yli 4 kerrosta)</option></select><p>Mihin tarkoitukseen?</p><input type='radio' name='purpose' value='living' class='dojo-radiobutton' /><label for='living'>Asuminen</label><br /><input type='radio' name='purpose' value='industry' class='dojo-radiobutton' /><label for='industry'>Teollisuus</label><br /><input type='radio' name='purpose' value='service' class='dojo-radiobutton' /><label for='service'>Palvelu</label><br /><p>Muu mikä?</p><input type='text' name='purpose-text' class='dojo-textbox' /><p>Kerro lisää!</p><textarea name='comments' cols='18' rows='5' class='dojo-textarea'></textarea><p>Menikö kohde oikeaan paikkaan</p><div class='infobutton_area'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div></form>",
		"confirmWidth": 250,
		"confirmHeight": 390, 
		"infoWidth": 250,
		"infoHeight": 390
		},			
	"home_template": {
			"confirm": "<form name='info_form' id='info_form'><p>Menikö kotitalo oikeaan paikkaan?</p><div class='center'><div class='button' onclick='categories.${category}.getInfoValues(\"info_form\",${graphicId});map.infoWindow.hide();'><span class='left-border'></span><span class='text'>Tallenna kohde</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></div><!-- center --></form>",
			"info": "<form name='info_form' id='info_form'><div class='button' onmousedown='categories.${category}.getInfoValues(\"info_form\", ${graphicId});map.infoWindow.hide()'><span class='left-border'></span><span class='text'>Sulje ikkuna</span><span class='right-border'></span></div><div class='remove' onmousedown='categories.${category}.removeGraphic(${graphicId});map.infoWindow.hide()'>Poista kohde</div></form>",
			"confirmWidth": 250,
			"confirmHeight": 150,
			"infoWidth": 250,
			"infoHeight": 150
			}
};

