/*global esri, dojo, dijit, dojox, djConfig, console */
dojo.require("esri.map");
dojo.require("dijit.form.Form");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.ValidationTextBox");
dojo.require("dijit.form.NumberTextBox");
dojo.require("dijit.form.NumberSpinner");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dijit.form.HorizontalSlider");
dojo.require("dijit.form.SimpleTextarea");
dojo.require("dojox.validate.regexp");
dojo.require("dojo.html");

/*Mapservice used */
var MAPSERVICE_URL = "https://pehmogis.tkk.fi/ArcGIS/rest/services/suomi/MapServer";

/* Mapservice for satellite map */
var SATELLITE_MAPSERVICE_URL = "https://pehmogis.tkk.fi/ArcGIS/rest/services/suomi-ilma/MapServer";

/*Mapservice for the overview map*/
var OVERVIEWMAP_URL = "https://pehmogis.tkk.fi/ArcGIS/rest/services/suomi/MapServer";

/*
 * All active widgets
 */
var widgets = [];

var map; // the map variable has to be global

var drawTool; // this tool is used to draw graphics on the map

//kind of an primary key for the unconfirmed graphics(always negative)
var graphicId = -1;

/*
ESRI default configuration
*/
esri.config.defaults.map.panDuration = 700;
esri.config.defaults.map.panRate = 50;

/* 
* This function creates widgets according to the widgetarray.
*/
/*
The widgetarray is defined in the following way:

[
{
"type": <type of widget>,
"json": <extra properties>,
"selector": <css 3 selector>,
"searchscope": <css 3 node id>,
},
{
<next json widget>
}
]
*/
function createWidgets(widgetarray) {
    console.log(widgetarray);
    var i = 0;
    var j = 0;
    console.log("create widgets");
    console.log(widgetarray);
    console.log(PROFILE_VALUES);
    for(i = 0; i < widgetarray.length; i++) {
	var wj = widgetarray[i];
        var elem = dojo.query(wj.selector,wj.searchscope);
        
        if(elem === undefined || elem === null || wj.type === undefined) {
            continue;
	} else if (wj.type.toLowerCase() === "form") {
            if(djConfig.isDebug) {
		console.log("creating form widget");
            }
	    for(j = 0; j < elem.length; j++) {
		//default values
		if(wj.json === undefined || wj.json === null) {
                    wj.json = {};
		}
		wj.json.name = elem[j].name;
		wj.json.method = elem[j].method;
		wj.json.action = elem[j].action;
		var f = new dijit.form.Form(wj.json, elem[j]);
                widgets.push([f,wj.searchscope]);
		//NO submit for enter onclick
		dojo.connect(f, "onSubmit", function(event) {dojo.stopEvent(event);/*Do nothing*/});
	    }	
	}
	else if (wj.type.toLowerCase() === "numbertextbox") {
            if(djConfig.isDebug) {
                console.log("creating numbertextbox");
            }
            for(j = 0; j < elem.length; j++) {
		//default values
		if(wj.json === undefined || wj.json === null) {
                    wj.json = {};
		}
		wj.json.name = elem[j].name;
		wj.json.value = NaN;
		var ntb = new dijit.form.NumberTextBox(wj.json, elem[j]);
		widgets.push([ntb,wj.searchscope]);

                if(PROFILE_VALUES[wj.json.name] !== undefined && PROFILE_VALUES[wj.json.name] !== null) {
                    ntb.set('value', PROFILE_VALUES[wj.json.name]);
                }
            }
        }
        else if (wj.type.toLowerCase() === "radiobutton") {
	    if(djConfig.isDebug) {
		console.log("create radionbutton");
	    }
	    for(j = 0; j < elem.length; j++) {
		//default values
		if(wj.json === undefined || wj.json === null) {
                    wj.json = {};
		}
		wj.json.name = elem[j].name;
		wj.json.value = elem[j].value;
				
		//events
		var onclick = null; // needs to be defined, google chrome does not "forget" the value
		if(elem[j].onclick !== undefined && elem[j].onclick !== null) {
                    onclick = elem[j].onclick;
		}
				
                var rb = new dijit.form.RadioButton(wj.json, elem[j]);
		widgets.push([rb,wj.searchscope]);
				
		if(onclick !== undefined && onclick !== null) {
                    dojo.connect(rb,"onClick",null,onclick);
		}
                if(PROFILE_VALUES[wj.json.name] !== undefined && PROFILE_VALUES[wj.json.name] !== null) {
                    if(PROFILE_VALUES[wj.json.name] === wj.json.value) {
                        rb.set('checked', 'true');
                    }
                }
	    }
    	}
	else if (wj.type.toLowerCase() === "checkbox") {
            console.log("create checkbox");
	if(djConfig.isDebug) {
            console.log("create checkbox");
	}
	for(j = 0; j < elem.length; j++) {
            console.log(elem[j]);
	    //default values
	    if(wj.json === undefined || wj.json === null) {
		wj.json = {};
	    }
	    wj.json.name = elem[j].name;
	    wj.json.value = elem[j].value;
	    wj.json.checked = elem[j].checked;
	    var cb = new dijit.form.CheckBox(wj.json, elem[j]);
	    widgets.push([cb,wj.searchscope]);
                
	    if(PROFILE_VALUES[wj.json.name] !== undefined &&
                PROFILE_VALUES[wj.json.name] !== null) {

                if(dojo.isArray(PROFILE_VALUES[wj.json.name])) {
					    for(var k = 0; k < PROFILE_VALUES[wj.json.name].length; k++) {
					        if(PROFILE_VALUES[wj.json.name][k] === wj.json.value) {
                                console.log(wj.json.value);
                                cb.set('value', wj.json.value);
                                break;
                            }
                        }
                    } else if(PROFILE_VALUES[wj.json.name] === wj.json.value) {
                        cb.set('value', wj.json.value);
                    } else if(("" + PROFILE_VALUES[wj.json.name]) === wj.json.value) {
                        cb.set('value', wj.json.value);
                    }
				}
			}
		}
		else if (wj.type.toLowerCase() === "filteringselect") {
			if(djConfig.isDebug) {
			    console.log("create filteringselect widget");
		    }
			for(j = 0; j < elem.length; j++) {
                            //default values
                            if(wj.json === undefined || wj.json === null) {
                                wj.json = {};
                            }
                            wj.json.name = elem[j].name;
                            wj.json.value = "";
                            
                            var fs = new dijit.form.FilteringSelect(wj.json, elem[j]);
                            widgets.push([fs,wj.searchscope]);
                            if(PROFILE_VALUES[wj.json.name] &&
                                PROFILE_VALUES[wj.json.name] !== undefined &&
                                PROFILE_VALUES[wj.json.name] !== null) {
                                
                                fs.set('value', PROFILE_VALUES[wj.json.name]);
                            }
			}
		}
		else if (wj.type.toLowerCase() === "textarea") {
			if(djConfig.isDebug) {
				console.log("creating textarea");
			}
			for(j = 0; j < elem.length; j++) {
				//default values
				if(wj.json === undefined || wj.json === null) {
					wj.json = {};
				}

				wj.json.name = elem[j].name;
				wj.json.value = elem[j].value;
                wj.json.rows = elem[j].rows;
                wj.json.cols = elem[j].cols;
                // IE makes textarea too small
                if(dojo.isIE) {
                    wj.json.cols = elem[j].cols + 5;
                    wj.json.rows = elem[j].rows + 1;
                }

                var ta = new dijit.form.SimpleTextarea(wj.json, elem[j]);

				widgets.push([ta,wj.searchscope]);
				if(PROFILE_VALUES[wj.json.name] !== undefined && PROFILE_VALUES[wj.json.name] !== null) {
					ta.set('value', PROFILE_VALUES[wj.json.name]);
				}
			}
		}
		else if (wj.type.toLowerCase() === "validationtextbox") {
			if(djConfig.isDebug) {
				console.log("creating validation text box");
			}
			for(j = 0; j < elem.length; j++) {
				//default values
				if(wj.json === undefined || wj.json === null) {
					wj.json = {};
				}
				
				wj.json.name = elem[j].name;
				wj.json.value = elem[j].value;
				
				var vtb = new dijit.form.ValidationTextBox(wj.json, elem[j]);
				
				widgets.push([vtb,wj.searchscope]);
				if(PROFILE_VALUES[wj.json.name] !== undefined && PROFILE_VALUES[wj.json.name] !== null) {
					vtb.set('value', PROFILE_VALUES[wj.json.name]);
				}
			}
		}
		else if (wj.type.toLowerCase() === "textbox") {
			// dojo textbox and area moves around in IE not tested
			if(djConfig.isDebug) {
				console.log("IE FIX in createwidgets textbox 22.2.2010");
			}
			if(dojo.isIE) {
			//	continue;
			}
			
			//create the widgets
			var tbelem = dojo.query(wj.selector,wj.searchscope);
			
			for(j = 0; j < tbelem.length; j++) {
				//default PROFILE_VALUES
				if(wj.json === undefined || wj.json === null) {
					wj.json = {};
				}
				wj.json.name = tbelem[j].name;
				wj.json.value = tbelem[j].value;
				
				var tb = new dijit.form.TextBox(wj.json, tbelem[j]);
				widgets.push([tb,wj.searchscope]);
                
				if(PROFILE_VALUES[wj.json.name] !== undefined && PROFILE_VALUES[wj.json.name] !== null) {
					tb.set('value', PROFILE_VALUES[wj.json.name]);
				}
			}
		}
		else if (wj.type.toLowerCase() === "horizontalslider") {
			if(djConfig.isDebug) {
				console.log("create horizontal slider");
			}
			for(j = 0; j < elem.length; j++) {
				//default values
				if(wj.json === undefined || wj.json === null) {
					wj.json = {};



				}
				//create the widget
				var hs = new dijit.form.HorizontalSlider(wj.json, elem[j]);
				widgets.push([hs,wj.searchscope]);
				if(PROFILE_VALUES[wj.json.name] !== undefined && PROFILE_VALUES[wj.json.name] !== null) {
					hs.set('value', PROFILE_VALUES[wj.json.name]);
				}
			}
		}
		else if (wj.type.toLowerCase() === "emailtextbox") {
			if(djConfig.isDebug) {
				console.log("create email textbox");
			}
			for(j = 0; j < elem.length; j++) {
				//default values
				if(wj.json === undefined || wj.json === null) {
					wj.json = {};
				}
				wj.json.name = elem[j].name;
				wj.json.regExpGen = dojox.validate.regexp.emailAddress;
				var etb = new dijit.form.ValidationTextBox(wj.json, elem[j]);
				widgets.push([etb,wj.searchscope]);
				if(PROFILE_VALUES[wj.json.name] !== undefined && PROFILE_VALUES[wj.json.name] !== null) {
					etb.set('value', PROFILE_VALUES[wj.json.name]);
				}
			}
		}
		else if (wj.type.toLowerCase() === "numberspinner") {
			if(djConfig.isDebug) {
				console.log("create number spinner");
			}
			for(j = 0; j < elem.length; j++) {
				//default values
				if(wj.json === undefined || wj.json === null) {
					wj.json = {};
				}
				wj.json.name = elem[j].name;
				
				var ns = new dijit.form.NumberSpinner(wj.json, elem[j]);
				widgets.push([ns,wj.searchscope]);
				if(PROFILE_VALUES[wj.json.name] !== undefined && PROFILE_VALUES[wj.json.name] !== null) {
					ns.set('value', PROFILE_VALUES[wj.json.name]);
				}
			}
		}
		else if (wj.type.toLowerCase() === "buttonwidget") {
			if(djConfig.isDebug) {
				console.log("create buttonwidget");
			}
			for(j = 0; j < elem.length; j++) {
				//default values
				if(wj.json === undefined || wj.json === null) {
					wj.json = {};
				}
				wj.json.id = elem[j].id;
				var bw = new ButtonWidget(wj.json);
				widgets.push([bw,wj.searchscope]);
			}
		}
	}
	return;
}

/*
 this features is calback for api get_features
*/
function get_features_handle(response_json) {
    if(response_json !== undefined) {
        FEATURES.features = response_json.features
        if(FEATURES.features === undefined) {
            FEATURES.features = [];
        }
        for(var i = 0; i < FEATURES.features.length; i++) {
            FEATURES.features[i].properties.graphicID = FEATURES.features[i].id;
        }
    } else {
        FEATURES.features = {};
    }
    postMapCreate();
}

/*
*/
function get_profiles_handle(data, textStatus, jqXHR) {
    if(textStatus === 'success') {
        status_code = jqXHR.status;
    }
    else {
        status_code = data.status;
    }
    if(status_code == 200) {
        PROFILE_VALUES = data[0];
        if(PROFILE_VALUES === undefined) {
            PROFILE_VALUES = {};
        }
    } else {
        PROFILE_VALUES = {};
    }
    
    //create widgets according to the script in the page
    var node = document.body;
    var widgetelem = dojo.query("div.widget-definitions script", node);

    if(widgetelem !== undefined && widgetelem !== null) {
        for(var i = 0; i < widgetelem.length; i++) {
            try {
                var widgetdef = widgetelem[i].text;
                widgetdef = dojo.eval(widgetdef);
                for(var j = 0; j < widgetdef.length; j++) {
                    if(widgetdef[j].searchscope === undefined ||
                        widgetdef[j].searchscope === null) {
                        widgetdef[j].searchscope = node;
                    }
                }
                createWidgets(widgetdef);
            } catch(ex) {
                if(djConfig.isDebug) {
                    console.error(ex);
                }
            }
        }
    }
    return data;
}


/*
This function does all the post creation after the map has been loaded
*/
var graphics = [];
var query_features_for_user = true;

function postMapCreate() {
    //make sure the features has been retrieved
    if(query_features_for_user) {
        gnt.geo.get_features("?time__now=true&user_id=" + USER_ID, get_features_handle);
        query_features_for_user = false;
        return;
    }

    drawTool = new esri.toolbars.Draw(map);

    var spatialReference = new esri.SpatialReference({"wkid": FEATURES.crs.properties.code});
    var features = FEATURES.features;
    
    for(var i in features) {

        var feat = features[i];
        var graphic_json = {};
        graphic_json.attributes = feat.properties;
        graphic_json.attributes.graphicId = feat.id;
        //graphic_json.id = feat.id;

        var geometry_json = {};

        if(feat.geometry.type === "Point") {
            geometry_json.x = feat.geometry.coordinates[0];
            geometry_json.y = feat.geometry.coordinates[1];
            graphic_json.geometry = new esri.geometry.Point(geometry_json);
        } else if(feat.geometry.type === "LineString") {
            geometry_json.paths = [];
            geometry_json.paths[0] = feat.geometry.coordinates;
            graphic_json.geometry = new esri.geometry.Polyline(geometry_json);
        } else if(feat.geometry.type === "Polygon") {
            geometry_json.rings = feat.geometry.coordinates;
            graphic_json.geometry = new esri.geometry.Polygon(geometry_json);
        }
        graphic_json.geometry.setSpatialReference(spatialReference);
        var add_graphic = new esri.Graphic(graphic_json);
        add_graphic.id = feat.id;
        graphics.push(add_graphic);
    }
    
    //add the categories graphicslayers to the map
    for (var cat in categories) {
        for(i = 0; i < graphics.length; i++) {
            if(graphics[i].attributes.category === cat) {
            // Add correct infoTemplate to the graphic
            graphics[i].setInfoTemplate(new esri.InfoTemplate(
                                            categories[cat].name,
                                            infotemplates[categories[cat].infotemplatename].info)
                                            );
            categories[cat].graphicsLayer.add(graphics[i]);
            }
        }
        map.addLayer(categories[cat].graphicsLayer);
    }
    // Add the navigation background
    // HTML KOODIA EI PITÄISI KIRJOITTAA NÄIN, MIKSI SITÄ TAUSTAA EI VAIN POISTETTU??
    var navigation = '<div id="navigation_tools_background"><div id="pan_arrows">' +
        '<div id="pan_up" class="fixedPanPehmo panUp" onclick="map.panUp();"></div>' +
        '<div id="pan_right" class="fixedPanPehmo panRight" onclick="map.panRight();"></div>' +
        '<div id="pan_down" class="fixedPanPehmo panDown" onclick="map.panDown();"></div>' +
        '<div id="pan_left" class="fixedPanPehmo panLeft" onclick="map.panLeft();"></div>' +
        '<div id="pan_upperRight" class="fixedPanPehmo panUpperRight" onclick="map.panUpperRight();"></div>' +
        '<div id="pan_lowerRight" class="fixedPanPehmo panLowerRight" onclick="map.panLowerRight();"></div>' +
        '<div id="pan_upperLeft" class="fixedPanPehmo panUpperLeft" onclick="map.panUpperLeft();"></div>' +
        '<div id="pan_lowerLeft" class="fixedPanPehmo panLowerLeft" onclick="map.panLowerLeft();"></div>' +
        '</div><!-- pan_arrows --></div><!-- navigation tools background -->';

    dojo.place(navigation, "map_root", "last");

    // Ugly way to keep satellite view button in place
    var satText = "";
    switch (djConfig.locale) {
        case "fi":
            satText = "Ilmakuva";
            break;
        case "sv":
            satText = "Satellitbild";
            break;
   }
    var satellite = '<div id="satellite_map_button" onmousedown="toggleSatelliteMap()">' +
                    '<div id="satellite_button_activity">' +
                    '<span class="left-border"></span>' +
                    '<span class="text">' + satText + '</span>' +
                    '<span class="right-border"></span>' +
                    '</div></div>';
    dojo.place(satellite, "map_root", "last");

}

var resize_timer;
var reposition_timer;
var tiledMapServiceLayer;
var imageServiceLayer;

/*
init is called when the user enters the site
*/
function init() {
    //load the map
    map = new esri.Map("map");

    try {
        tiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(MAPSERVICE_URL);
    }
    catch(err){
        console.log(dojo.toJson(err));
    }
    //image service layer for the sattelite view
    try {
        imageServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(SATELLITE_MAPSERVICE_URL);
    }
    catch(error){
        console.log(dojo.toJson(error));
    }

    map.addLayer(tiledMapServiceLayer);
    map.addLayer(imageServiceLayer);
    imageServiceLayer.hide();
    
    //Vaasa palosaari extent
    map.setExtent(new esri.geometry.Extent({
                                "xmax":230666,
                                "xmin":225873,
                                "ymax":7010923,
                                "ymin":7007240}));

    //connect events
    if(map.loaded) {
        postMapCreate();
    } else {
        dojo.connect(map, "onLoad", postMapCreate);
    }

    //THIS was here but I think the layers is added elsewhere when used too
    // add the category layers to the map
    //for(var k = 0; k < categories.length; k++) {
    //	map.addLayer(categories[i].graphicsLayer);
    //}



    //connect to window's resize event
    dojo.connect(window, "onresize", function() {
        //clear any existing resize timer
        clearTimeout(resize_timer);
        //create new resize timer with delay of 500 milliseconds
        resize_timer = setTimeout(function() {map.resize();}, 500);
        });
		
    //connect to window's onscroll event(there might not be such event in all browsers check this)
    dojo.connect(window, "onscroll", function() {
        //clear any existing resize timer
        clearTimeout(reposition_timer);
        //create new resize timer with delay of 500 milliseconds
        reposition_timer = setTimeout(function() {map.reposition();}, 500);
        });
	
    // Connect infoWindows onShow event
    dojo.connect(map.infoWindow, "onShow", createInfo);
    dojo.connect(map.infoWindow, "onHide", removeUnconfirmed);
    
    //get_profiles("?time__now=true&user_id=" + USER_ID, get_profiles_handle);
    gnt.opensocial_people.get_list_of_persons("@me", "@self", get_profiles_handle); 
    
}

function removeUnconfirmed() {
    for(var cat in categories) {
            categories[cat].removeUnconfirmed();
        }
    }

function toggleSatelliteMap() {
    if(imageServiceLayer.visible) {
        imageServiceLayer.hide();
        tiledMapServiceLayer.show();
        dojo.removeClass("satellite_button_activity","active");
    } else {
        imageServiceLayer.show();
        tiledMapServiceLayer.hide();
        dojo.addClass("satellite_button_activity","active");
    }
    
}

function destroyWidgets(widgetarray) {
	var scope = widgetarray[0].searchscope;
	for(var j = 0; j < widgets.length; j++) {
            if(widgets[j][0] !== null && widgets[j][1] === scope) {
                try {
                    //widgets[j][0].destroy();
                    var widg = widgets.splice(j, 1);
                    widg[0][0].destroy();
                    j--;
                } catch(ex) {
                    console.log('problem destroying the widget: ' + ex);
                }
            }
        }
	//widgets = [];
}

/*
This function takes content as html or text and puts 
it into the node with the nodeid given.
*/
function setContent(content, nodeid) {
    // FIX for IE, for some reason script -tag disappers after assign to innerHTML
    var start = content.indexOf('<script type="application/json">');
    var stop = content.indexOf('</script>', start + 1);
    start = start + '<script type="application/json">'.length;
    var scriptText = dojo.trim(content.substring(start,stop));
   
    var node = dojo.byId(nodeid);
    node.innerHTML = content;
	
    if(scriptText !== undefined && scriptText !== null) {
        try {
            var widgetdef = scriptText;
            widgetdef = dojo.eval(widgetdef);
            for(var j = 0; j < widgetdef.length; j++) {
                if(widgetdef[j].searchscope === undefined ||
                    widgetdef[j].searchscope === null) {
                    widgetdef[j].searchscope = nodeid;
                }

            }
            destroyWidgets(widgetdef); // make sure the widgets is not created twice
            createWidgets(widgetdef);
        } catch(ex) {
            if(dojo.isDebug) {
                console.debug('Problem with widgets: ' + ex);
                return ex;
            }
        }
    }
}

/*
This function assigns current graphic varianble
 */
var lastClickedGraphic;

function getClickedGraphic(event) {
    lastClickedGraphic = event.graphic;
}

function setValues(formnode, values) {
    // check if formnode is string. If it is get it's domnode
    if(dojo.isString(formnode)) {
        formnode = dojo.byId(formnode);
    }
    //check if dijit available
    var form = dijit.byId(formnode.id);
    if(form === undefined || form === null) {
        form = formnode;
    }

    try {
        form.set('value',values);

    } catch(ex) {
        if(djConfig.isDebug) {
            console.error("we recommend to use dijit.form.Form as form.");
            console.error(ex);
        }
    }
}


/*
This function uses ajax to get content from the given url and
put it into the given node with nodeid as innerHTML
*/
function get(url, nodeid) {
    dojo.xhrGet({
        "url": url, 
        "handleAs": "text",
        "sync": false,
        //"preventCache": true,

        // The LOAD function will be called on a successful response.
        "load": function(response, ioArgs) {
            setContent(response,nodeid);
            return response;
        },

        // The ERROR function will be called in an error case.
        "error": function(response, ioArgs) {
            if (djConfig.debug) {
                console.error("HTTP status code: ", ioArgs.xhr.status);
            }
            return response;
        }
    });
}

/*
This function sends a post http request to the server

takes as parameters the url and the content for the post.

the content should be in json format
*/
function post(url, content) {
    dojo.xhrPost({
        "url": url,
        "sync": false,
        "handleAs": "json",
        "postData": encodeURIComponent(dojo.toJson(content)),
        "headers": {"Content-Type":"application/json"},
        "load": function(response, ioArgs) {
                return response;
        },
        "error": function(response, ioArgs) {
                return response;
        }
    });
}


/*
This function gets the values from inside the form given.
Should return the values according to standards.
*/
function getValues(formnode) {
	var attr_val;
	
	// check if formnode is string. If it is get it's domnode
	if(dojo.isString(formnode)) {
		formnode = dojo.byId(formnode);
	}
	//check if dijit available
	var form = dijit.byId(formnode.id);
	if(form === undefined || form === null) {
		form = formnode;
	}

    var attr_obj = dojo.formToObject(form.id);

    try {
        attr_val = form.get('value');
        
	} catch(ex) {
		attr_val = {};
		
		if(djConfig.isDebug) {
			console.error("we recommend to use dijit.form.Form as form.");
			console.error(ex);
		}
	}

    //chekbox problem, should send empty array if checkboxes empty
    for(var value_name in attr_val) {
        if(dojo.isArray(attr_val[value_name]) && attr_val[value_name].length === 0) {
            attr_obj[value_name] = [];
        }
    }

    attr_val = attr_obj;
	
	return attr_val;
	
	//FIX for getting normal input values from inside the form last checked esri 1.4
    //TODO
}

/*
This function hides any node shose id is given
*/
function hide(nodeid) {
		dojo.removeClass(dojo.byId(nodeid),"visible");
		if(!dojo.hasClass(dojo.byId(nodeid),"hidden")) {
			dojo.addClass(dojo.byId(nodeid),"hidden");
		}
}

/* 
The submit functions takes the id of the form that should be submitted
and submitts it.

the next_content_node is where it loads the response html returned
from the post. If the next_content_node is undefined or null
it will reload the current page.


THIS SHUOLD NOT BE USED ANYMORE!! USE INSTEAD THE API FUNCTIONS
AND form onSubmit(event) for each form
*/
function submitForm(nodeid, attr) {
	
	var form = dojo.byId(nodeid);
	
	if(form === undefined && form === null) {
		return false;
    }
	
	//check validitiy and submit if basic
	var formdijit = dijit.byId(nodeid);
	if(formdijit !== undefined && formdijit !== null) {
		if(!formdijit.validate()) {	
			return false;
		} 
	}
	
	var val = getValues(form);
	
	if(attr.destroy === undefined ||
	   attr.destroy === null ||
	   attr.destroy === true) {
	    formdijit.destroyRecursive();
    } 
    if(attr.hidenode !== undefined ||
        attr.hidenode !== null) {
        hide(attr.hidenode);
    }
    
    if(attr.type === 'login') {
        dojo.xhrPost({
	        "url": form.action, 
	        "handleAs": "json",
	        "postData": dojo.toJson(val),
		    "headers": {"Content-Type":"application/json"},
	        
	        // The LOAD function will be called on a successful response.
	        "load": function(response, ioArgs) {
	                    window.location.reload();
			            return true;
		            },

	        // The ERROR function will be called in an error case.
	        "error": function(response, ioArgs) {
	                    if (djConfig.debug) {
	                        console.error("HTTP status code: ", ioArgs.xhr.status);
                        }
                        return false;
                    }
            });
    } else {
	PROFILE_VALUES = dojo.mixin(PROFILE_VALUES, val);
        save_profile(PROFILE_VALUES);
    }
}

/*
This funtion show the node
*/
function show(nodeid) {
		dojo.removeClass(dojo.byId(nodeid),"hidden");
		if(!dojo.hasClass(dojo.byId(nodeid),"visible")) {
			dojo.addClass(dojo.byId(nodeid),"visible");
		}
}
/*
helper functions for dynamic forms

the modify function show takes two strings as parameters,
both strings is a cs query that should return the nodes
to hide respectively the nodes to show.
*/
function modify(showcss, hidecss) {
	var hidenodes = dojo.query(hidecss);
	var shownodes = dojo.query(showcss);
	
	var i;
	for(i = 0; i < hidenodes.length; i++) {
		dojo.removeClass(hidenodes[i],"visible");
		dojo.addClass(hidenodes[i],"hidden");
	}
	
	for(i = 0; i < shownodes.length; i++) {
		dojo.removeClass(shownodes[i],"hidden");
		dojo.addClass(shownodes[i],"visible");
	}
}


/*
This functoin pans the map so that the infowindow fits on the map
*/
function setInfoWindowPosition(iwidth, iheight) {
	ipoint = map.infoWindow.coords; // relative to map which is offsetParent of infoWindow
	ix = ipoint.x;
	iy = ipoint.y;
	iheight = iheight + 44  + 10;
	iwidth = iwidth + 15;
	margin = 10;
	mheight = map.height;
	mwidth = map.width;
	
	//count offsetY
	var offsetY = 0; //in screen pixels
	if(map.infoWindow.anchor === "lowerleft" || 
		map.infoWindow.anchor === "lowerright") {
		
		if(mheight < (iy + iheight)) {
			offsetY = mheight - (iheight + iy + 2*margin);
		}
	} else if(map.infoWindow.anchor === "upperleft" ||
			map.infoWindow.anchor === "upperright") {
		if((iy - iheight) < 0) {
			offsetY = iheight - iy;
		}
	}
	
	//count offsetX
	var offsetX = 0; //in screen pixels
	if(map.infoWindow.anchor === "upperright" || 
		map.infoWindow.anchor === "lowerright") {
		
		if(mwidth < (ix + iwidth)) {
			offsetX = mwidth - (ix + iwidth + 2*margin);
		}
		
	} else if(map.infoWindow.anchor === "upperleft" ||
			map.infoWindow.anchor === "lowerleft") {
			
		if((ix - iwidth) < 0) {
			offsetX = iwidth - ix;
		}
	}
	//count new map extent
	var mapScaleX = (map.extent.ymax - map.extent.ymin) / mheight;
	var mapScaleY = (map.extent.xmax - map.extent.xmin) / mwidth;
	map.setExtent(map.extent.offset(offsetX * mapScaleX, offsetY * mapScaleY));
	return;
}

/*
 This function creates widgets for infoWindow using default definitions
 */
function createInfo() {
    /*
    var node = dojo.query("script", "map_infowindow");
    var widgetdef = eval(node[0].innerHTML);
    */
    var widgetdef = default_info_widgets;
    if(widgetdef !== undefined && widgetdef !== null) {
        try {
            destroyWidgets(widgetdef); // make sure the widgets is not created twice
            createWidgets(widgetdef);
        } catch(ex) {
            console.debug('exeption: ' + ex);
            return ex;
        }
    }
    
    //This is graphics infoWindow
    //Set previously saved values and other handling of graphics infotemplate
    if(lastClickedGraphic !== undefined && lastClickedGraphic !== null) {
        setValues('info_form', lastClickedGraphic.attributes);
        var cate = categories[lastClickedGraphic.attributes.category];
        var infoT = infotemplates[cate.infotemplatename];
        //map.infoWindow.setContent();
        map.infoWindow.resize(infoT.infoWidth, infoT.infoHeight);
        setInfoWindowPosition(infoT.infoWidth, infoT.infoHeight);
        lastClickedGraphic = null;
    }
}

/*
 *This function disables mouseevents on all graphicsLayers
 */
function disableAllMouseEvents() {
    for(var i = 0; i < map.graphicsLayerIds.length; i++) {
        map.getLayer(map.graphicsLayerIds[i]).disableMouseEvents();
    }
}

/*
 *This function enables mouseevents on all graphicsLayers
 */
function enableAllMouseEvents() {
    for(var i = 0; i < map.graphicsLayerIds.length; i++) {
        map.getLayer(map.graphicsLayerIds[i]).enableMouseEvents();
    }
}
/*
button pool class

this object takes care of buttons so that only one button at a time in the same pool can be activated.
*/
dojo.declare("ButtonPool", null, 
	{
	"activeButton": null,
	
	"activate": function(button) {
			if(this.activeButton !== null) {
				this.activeButton.deactivate();
			}
			this.activeButton = button;
			this.activeButton.activate();
            disableAllMouseEvents();
		},
	"deactivate": function(button) {
            button.deactivate();
            this.activeButton.deactivate();
			this.activeButton = null;
            enableAllMouseEvents();
		}
	}
);

function save_graphic_handle(response) {
    //set graphicID to returned id
    try {
        console.log(response.response.id);
        console.log(response.response.properties.category);
        console.log(response.response.properties.graphicId);
        console.log(categories[response.response.properties.category].graphicsLayer.graphics);
        var graphs = categories[response.response.properties.category].graphicsLayer.graphics;
        for(var i = 0; i < graphs.length; i++) {
            if(graphs[i].attributes.graphicId == 0) {
                graphs[i].attributes.graphicId = response.response.id;
                graphs[i].id = response.response.id;
            }           
        }
        
    } catch(ex) {
    }
}


var pool = new ButtonPool();

/*
Category class
*/
dojo.declare("Category", null,
	{
	"renderer": "", // the name of the renderer to use for the graphic
	"name": "", //name that is displayed
	"id": "", //id of category
	"description": "", //description of category
	"maxAmount": -1, //-1 means infinite
	"graphicsLayer": null, //the layer where to draw the graphics
	"graphics": [], //used to save graphics and wait until map loaded to add them
	"displayOnPan": true, //this is default esri but should be changed in IE to false
	"visible": true, //default value from esri layers
	"infotemplatename": "", //the name of the infotemplate

	/*
	constructor, takes as arguments any json that 
	fits in the previous values
	*/
	"constructor": function(args) {
			dojo.safeMixin(this, args);	

			if(dojo.isIE) {
			    this.displayOnPan = false;
			}

			this.graphicsLayer = new esri.layers.GraphicsLayer({"id": this.id,
                                                                            "displayOnPan": this.displayOnPan});
			this.graphicsLayer.setRenderer(renderers[this.renderer]);
			
			//add listeners to the graphicsLayer
			dojo.connect(this.graphicsLayer, "onClick", getClickedGraphic);
			
			//when graphic is clicked set the correct infowindow position
			//dojo.connect(this.graphicsLayer, "onClick", function(event) {this.clickevent = event;});
		},
		
	/*
	Shows all the featured of this category on the map given.
	*/
	"show": function() {
			this.graphicsLayer.show();
		},
	/*
	this funciton hides all the features of this category on the map given.
	*/
	"hide": function() {
			this.graphicsLayer.hide();
	    },

    /*
    This function returns the boolean value of true
    if maxAmount has been reached and false if not
    */
    "hasMaxAmount": function() {
        return this.graphicsLayer.graphics.length >= this.maxAmount && this.maxAmount > 0;
    },
    /*
     *Helper function to get graphic
    */
   "getGraphicById": function(graphicId) {
            for(var i = 0; i < this.graphicsLayer.graphics.length; i++) {
                if(this.graphicsLayer.graphics[i].attributes.graphicId === graphicId) {
                   return this.graphicsLayer.graphics[i];
                }
            }
            return false;
    },
        
    "addGraphic": function(graphic) {		
    
        // check if this.graphicsLayer is added to the map
		//TOISTOA POISTA TÄMÄ TAI PARANNA JOTENKIN
		var found = false;
		for(var i = 0; i < map.graphicsLayerIds.length; i++) {
			if(map.graphicsLayerIds[i] === this.id) {

				found = true;
            }
		}
		//not found then add it to the map
		if(!found) {
			map.addLayer(this.graphicsLayer);
		}
        this.graphicsLayer.addGraphic(graphic);
        
        graphic.setInfoTemplate(new esri.InfoTemplate(this.name, infotemplates[this.infotemplatename].confirm));
        
    },

    /*
	When adding a geometry it has to be confirmed and properties will be added to it to create a feature
	*/
	"addGeometry": function(geometry) {
		var graphic = new esri.Graphic({});
		graphic.setGeometry(geometry);

		//graphic ID should be unique for all the graphics
		var attr = {"category": this.id,
					"graphicId": graphicId};
		graphicId--;
		
		graphic.setAttributes(attr);
		
		graphic.setInfoTemplate(new esri.InfoTemplate(this.name, infotemplates[this.infotemplatename].confirm));

		//remove this later, make the renderers work,,
		//graphic.setSymbol(drawTool.markerSymbol);
                
		// check if this.graphicsLayer is added to the map
		var found = false;
		for(var i = 0; i < map.graphicsLayerIds.length; i++) {
			if(map.graphicsLayerIds[i] === this.id) {
				found = true;
			}
		}
		//not found then add it to the map
		if(!found) {
			map.addLayer(this.graphicsLayer);
		}

		//map.graphics.setRenderer(renderers.notConfirmed);
		this.graphicsLayer.add(graphic);
		//map.graphics.add(graphic);

		

		//set the infowindow content
		map.infoWindow.setTitle(graphic.getTitle());
		map.infoWindow.setContent(graphic.getContent());
		
		//show the infowindow
		var p;
		if(geometry.type === "point") {
			p = map.toScreen(geometry);
		} else if (geometry.type === "polyline") {
			var index = geometry.paths[0].length - 1;
			p = map.toScreen(geometry.getPoint(0,index));
		} else if (geometry.type === "polygon") {
			var ind = geometry.rings[0].length - 2;
			p = map.toScreen(geometry.getPoint(0,ind));
		}
		//set size for infowindow
		map.infoWindow.resize(infotemplates[this.infotemplatename].confirmWidth,
							infotemplates[this.infotemplatename].confirmHeight);
		map.infoWindow.show(p,map.getInfoWindowAnchor(p));

        //Parse for dijit.widgets
        //createWidgets(extractJsonFromInfotemplate(graphic.getContent()));

		//set the correct infowindow position
		setInfoWindowPosition(infotemplates[this.infotemplatename].confirmWidth,
							infotemplates[this.infotemplatename].confirmHeight);
	},


	"removeGraphic": function(graphicId) {
        var id;
        
		for(var i = 0; i < this.graphicsLayer.graphics.length; i++) {
                    if(this.graphicsLayer.graphics[i].attributes.graphicId === graphicId) {
                        id = this.graphicsLayer.graphics[i].id;
                        this.graphicsLayer.remove(this.graphicsLayer.graphics[i]);
                        break;
                    }
		}

		if(id !== undefined) {
            remove_graphic(id);
        }
	},

	"removeUnconfirmed": function() {
            for(var i = 0; i < this.graphicsLayer.graphics.length; i++) {
                    if(this.graphicsLayer.graphics[i].attributes.graphicId < 0) {
                        this.graphicsLayer.remove(this.graphicsLayer.graphics[i]);
                        }
                }
        },
        
    "getInfoValues": function(nodeId, graphicId) {
        // console.log("getInfoValues");
        // Taken from submitForm
        var form = dojo.byId(nodeId);

        if(form === undefined && form === null) {
	    return false;
        }

        //check validitiy and submit if basic
        var formdijit = dijit.byId(nodeId);
        if(formdijit !== undefined && formdijit !== null) {
            if(!formdijit.validate()) {
                return false;
            }
        }
        var val = getValues(form);
        if(formdijit !== undefined && formdijit !== null) {
            formdijit.destroyRecursive();
        }
        // save the values in the graphics attributes
        this.getGraphicById(graphicId).setAttributes(dojo.mixin(this.getGraphicById(graphicId).attributes,val));
        
        // Set infotemplate to 'info'
        this.getGraphicById(graphicId).setInfoTemplate(new esri.InfoTemplate(this.name, infotemplates[this.infotemplatename].info));

        //save the graphic which also sync the graphicId with server
        save_graphic(this.getGraphicById(graphicId), save_graphic_handle);

        //make the graphic confirmed by changing the graphicId to positive integer
        this.getGraphicById(graphicId).attributes.graphicId = 0;

        return true;
    }
}
);

/*Transforms the argGIS graphic object to geojson feature object and creates geojson_feature */
function save_graphic(graphic,callback_function) {
    console.log("DEPRACATED save_graphic");
    var properties=graphic.attributes;
    var geojson_feature={};
    geojson_feature.type="Feature";
    geojson_feature.properties=properties;
    geojson_feature.geometry={};
    
    if(graphic.geometry.type==="polyline") {
        geojson_feature.geometry.type="LineString";
        geojson_feature.geometry.coordinates=graphic.geometry.paths[0];
    }
    else if(graphic.geometry.type==="point") {
        geojson_feature.geometry.type="Point";
        geojson_feature.geometry.coordinates=[graphic.geometry.x,graphic.geometry.y];
    }
    else if(graphic.geometry.type==="polygon") {
        geojson_feature.geometry.type="Polygon";
        geojson_feature.geometry.coordinates=graphic.geometry.rings;
    }
    if(graphic.id!==undefined&&graphic.id!==null) {
        geojson_feature.id=graphic.id;
    }
    
    geojson_feature.geometry.crs={
        "type":"EPSG",
        "properties":{
            "code":graphic.geometry.spatialReference.wkid
        }
    };
    
    if(graphic.id!==undefined&&graphic.id!==null) {
        gnt.geo.update_feature(geojson_feature,callback_function);
    }
    else{
        gnt.geo.create_feature(geojson_feature,callback_function);
    }
}

/*Creates a feature object having feature type and calls geonition-api delete_feature */
function remove_graphic(feature_id,callback_function){
    console.log("DEPRACATED remove_graphic");
    var feature={
        'type':'Feature',
        'id':feature_id
    };
    gnt.geo.delete_feature(feature,callback_function);
}

/*Localization fix mostly for the tooltip */
var translateEvent;

function translate(node) {

        if(node === undefined) {
            return;
            }
        if(node.innerHTML === "Click to add a point") {
            if(djConfig.locale === "sv") {
                node.innerHTML = "Klicka på kartan för att lägga till platsen";
                }
            else if(djConfig.locale === "fi") {
                node.innerHTML = "Lisää paikka napsauttamalla karttaa";
                }
            }
        else if(node.innerHTML === "Click to start drawing") {
            if(djConfig.locale === "sv") {
                node.innerHTML = "Klicka på kartan för att börja rita";
                }
            else if(djConfig.locale === "fi") {
                node.innerHTML = "Aloita piirtäminen napsauttamalla karttaa";
                }
            }
        else if(node.innerHTML === "Click to continue drawing") {
            if(djConfig.locale === "sv") {
                node.innerHTML = "Klicka på kartan för att fortsätta rita";
                }
            else if(djConfig.locale === "fi") {
                node.innerHTML = "Napsauta karttaa jatkaaksesi piirtoa";
                }
            }
        else if(node.innerHTML === "Double-click to complete") {
            if(djConfig.locale === "sv") {
                node.innerHTML = "Sluta rita med en dubbelklick";
                }
            else if(djConfig.locale === "fi") {
                node.innerHTML = "Lopeta piirto kaksoisklikkauksella";
                }
            }
            
    }


function disable_all_graphicslayers_mouseevents() {
    for(var i = 0; i < map.graphics.length; i++) {
        map.graphics[i].disableMouseEvents();
    }
}

function enable_all_graphicslayers_mouseevents() {
    for(var i = 0; i < map.graphics.length; i++) {
        map.graphics[i].enableMouseEvents();
    }
}
/*
button widget class  to handle the html of every button widget made..
*/
dojo.declare("ButtonWidget", null,
	{
	"pool": null,
	"id": "", // the css id for this widget
	"categoryid": "", // the category id this buttons belongs to
	"infotemplate": "", // the infomtemplate used with this widget to confirm a graphic
	"infotemplatename": "", //the name of the infotemplate
	"confirmEvent": null,
	
	"constructor": function(args) {
			dojo.safeMixin(this, args);
			this.pool = pool;
			dojo.connect(dojo.byId(this.id), "onmousedown", this, "onmousedown");
		},
	
	"onmousedown": function(event) {
            if(categories[this.categoryid].hasMaxAmount()) {
                //ratkaisu pitäisi olla parempi. tällä hetkellä kuitenkin rajoitettu on vain koti
                if(djConfig.locale === 'fi') {
                    alert("Olet jo paikantanut kodin");
                } else if(djConfig.locale === 'sv') {
                    alert("Ni har redan märkt ut ert hem");
                }
                return;
                }
			if(dojo.hasClass(this.id, "active")) {
				this.pool.deactivate(this);
			} else {
				dojo.addClass(this.id, "active");
				this.pool.activate(this);
			}
	},
	"activate": function() {
			if(djConfig.isDebug) {
				console.log("activate button");
			}

			disable_all_graphicslayers_mouseevents();
            
			if(categories[this.categoryid].type.toLowerCase() === "point") {
				drawTool.activate(esri.toolbars.Draw.POINT);
				translate(dojo.query("div.tooltip")[0]);
			} else if(categories[this.categoryid].type.toLowerCase() === "polyline") {
				drawTool.activate(esri.toolbars.Draw.POLYLINE);
				translate(dojo.query("div.tooltip")[0]);
                translateEvent = dojo.connect(map, "onClick", function(event) {
                    var tooltip = dojo.query("div.tooltip")[0];
                    translate(tooltip);
                });
			} else if(categories[this.categoryid].type.toLowerCase() === "polygon") {
				drawTool.activate(esri.toolbars.Draw.POLYGON);
                translate(dojo.query("div.tooltip")[0]);
                translateEvent = dojo.connect(map, "onClick", function(event) {
                    var tooltip = dojo.query("div.tooltip")[0];
                    translate(tooltip);
                });
			}
			this.confirmEvent = dojo.connect(drawTool, "onDrawEnd", this, "confirm");

		},
	"deactivate": function() {

            enable_all_graphicslayers_mouseevents();
            
            drawTool.deactivate();
			try {
                dojo.removeClass(this.id, "active");
            }
            catch(ex) {
                console.debug("ID: " + this.id + " not found");
            }

			if(this.confirmEvent !== null) {
				dojo.disconnect(this.confirmEvent);
				this.confirmEvent = null;
			}
		},
	"confirm": function(geometry) {

            //geometry.setSpatialReference(new esri.SpatialReference({"wkid:" }))
            geometry.setSpatialReference(map.spatialReference);
            categories[this.categoryid].addGeometry(geometry);
            this.pool.deactivate(this);

		},
    "destroy": function() {
            if(djConfig.isDebug) {
                console.log("buttonWidget destroy");
            }
        }
	}
);


function show_all_graphics_layers() {
    for(var i = 0; i < map.graphicsLayerIds.length; i++) {
        var gl = map.getLayer(map.graphicsLayerIds[i]);
        gl.show();
    }
}

function register_handle(data, textStatus, jqXHR) {
    if(textStatus === 'success') {
        status_code = jqXHR.status;
        message = jQuery.parseJSON(data);
    }
    else {
        status_code = data.status;
        message = jQuery.parseJSON(data.responseText);
    }
    if(status_code === 201) {
        //send the remaining PROFILE_VALUES to server
        //TODO: make sure the update person checks if the email address is unique.
        gnt.opensocial_people.update_person('@me', PROFILE_VALUES, reload_function);
        //gnt.email_rest.save_email(PROFILE_VALUES['email'], reload_function);
       
    } else if (status_code === 400) {
        alert(message.msg);
    } else if (status_code === 409) {
        dijit.byId("username").focus();
        dijit.byId("username").displayMessage(message.msg);
        dijit.byId("username").state = "Error";
        dijit.byId("username")._setStateClass();
    }
}

function reload_function(response_obj) {
    window.location.reload();
}
function login_handle(data, textStatus, jqXHR) {
    if(textStatus === 'success') {
        status_code = jqXHR.status;
        message = jQuery.parseJSON(data);
    }
    else {
        status_code = data.status;
        message = jQuery.parseJSON(data.responseText);
    }
    if(status_code === 200) {
        window.location.reload();
    } else if (status_code === 400) {
        //this should be checked at the JavaScript level
    } else if (status_code === 401) {
        dijit.byId("login-password-input").focus();
        dijit.byId("login-password-input").displayMessage(message.msg);
        dijit.byId("login-password-input").state = "Error";
        dijit.byId("login-password-input")._setStateClass();
    }
}
function logout_handle(data, textStatus, jqXHR) {
    if(textStatus === 'success') {
        status_code = jqXHR.status;
        message = jQuery.parseJSON(data);
    }
    else {
        status_code = data.status;
        message = jQuery.parseJSON(data.responseText);
    }
    var response = data;
    if(status_code === 200) {
        window.location.reload();
    } else if (status_code === 400) {
        alert(message.msg);
    }
}
function new_password_handle(data, textStatus, jqXHR) {
    if(textStatus === 'success') {
        status_code = jqXHR.status;
        message = jQuery.parseJSON(data);
    }
    else {
        status_code = data.status;
        message = jQuery.parseJSON(data.responseText);
    }
    var widget;
    if(status_code === 200) {
        setContent('<p>' + message.msg + '</p>', 'popup-content');
//        alert(message);
    } else if (status_code === 400) {
        widget = dijit.byId("new_password_email");
        widget.focus();
        widget.displayMessage(message.msg);
        widget.state = "Error";
        widget._setStateClass();
    } else if (status_code === 404) {
        widget = dijit.byId("new_password_email");
        widget.focus();
        widget.displayMessage(message.msg);
        widget.state = "Error";
        widget._setStateClass();
    }
}

function change_password_handle(data, textStatus, jqXHR) {
    if(textStatus === 'success') {
        status_code = jqXHR.status;
        message = jQuery.parseJSON(data);
    }
    else {
        status_code = data.status;
        message = jQuery.parseJSON(data.responseText);
    }
    var widget;
    if(status_code === 200) {
        setContent('<p>' + message.msg + '</p>', 'change_password');
        //alert(message);
    } else if (status_code === 401) {
        widget = dijit.byId("old_password");
        widget.focus();
        widget.displayMessage(message.msg);
        widget.state = "Error";
        widget._setStateClass();
    } else if (status_code === 400) {
        widget = dijit.byId("new_password");
        widget.focus();
        widget.displayMessage(message.msg);
        widget.state = "Error";
        widget._setStateClass();
    }
}
