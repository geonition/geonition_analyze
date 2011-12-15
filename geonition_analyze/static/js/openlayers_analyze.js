var map;
var cacheLayer;
var layerInfo = {};


//get the layerInfo from esri mapserver
$.ajax({
    url: 'http://pehmogis.tkk.fi/ArcGIS/rest/services/suomi/MapServer?f=json',
    method: 'GET',
    dataType: 'jsonp',
    success: function(data) {
        layerInfo = data;
    }
})

function init(){
    //wait for the layerinfo to load
    if(layerInfo['currentVersion'] === undefined) {
        var t = setTimeout(function(){init();}, 1000);
        return;
    }
    
    //Max extent from layerInfo above            
    var layerMaxExtent = new OpenLayers.Bounds(
        layerInfo.fullExtent.xmin, 
        layerInfo.fullExtent.ymin, 
        layerInfo.fullExtent.xmax, 
        layerInfo.fullExtent.ymax  
    );
    
    var resolutions = [];
    for (var i=0; i<layerInfo.tileInfo.lods.length; i++) {
        resolutions.push(layerInfo.tileInfo.lods[i].resolution);
    }
    var startBounds = new OpenLayers.Bounds(
	229672,
        7006000,
	226002,
	7013000
    );
    
    map = new OpenLayers.Map('map', {
        maxExtent: layerMaxExtent,
        StartBounds: startBounds,
        units: (layerInfo.units == "esriFeet") ? 'ft' : 'm',
        resolutions: resolutions,
        tileSize: new OpenLayers.Size(layerInfo.tileInfo.cols,
                                      layerInfo.tileInfo.rows),                
        projection: 'EPSG:' + layerInfo.spatialReference.wkid
    });

    cacheLayer = new OpenLayers.Layer.ArcGISCache(
        "Suomi map",
        "http://pehmogis.tkk.fi/ArcGIS/rest/services/suomi/MapServer", {
        isBaseLayer: true,

        //From layerInfo above                        
        resolutions: resolutions,                        
        tileSize: new OpenLayers.Size(layerInfo.tileInfo.cols,
                                      layerInfo.tileInfo.rows),                        
        tileOrigin: new OpenLayers.LonLat(layerInfo.tileInfo.origin.x ,
                                          layerInfo.tileInfo.origin.y),                        
        maxExtent: layerMaxExtent,                        
        projection: 'EPSG:' + layerInfo.spatialReference.wkid
    });    
    
    
    map.addLayers([cacheLayer]);
    
    map.addControl(new OpenLayers.Control.MousePosition() );
    
    map.zoomToExtent(startBounds);
}


//add the events to the document
$(document).ready(
    init()
);