function getJsonMap(table, myFeat, callback){
    var dados = { callback: 'MapJson', callback_action: 'getRes', tbName: table, my: myFeat }
    
    $.post('ajax/MapJson.ajax.php', dados, function (data) {
        if (data.ResultJson) {
            if(table == "tb_places") callback(data.ResultJson, data.PlacesDuplicated);
            else callback(data.ResultJson);
        }
    }, 'json');
}

var bases, placesDuplicated, places, myplaces, street, map;
getJsonMap('tb_street', false,  function(streets){
    street = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(streets)
    });
    getJsonMap('tb_places', false, function(place, duplicated){
        placesDuplicated = duplicated;
        places = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(place)
        });
        getJsonMap('tb_places', true, function(myplace, duplicated){
            myplaces = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(myplace)
            });

            bases = new ol.layer.Group({
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.TileWMS({
                            url: 'http://www.terrama2.dpi.inpe.br/geoserver/ows',
                            params: {'LAYERS': 'pauliceia:saraBrasil', 'TILED': true},
                            serverType: 'geoserver'
                        }),
                        visible: true,
                        name: 'sara'
                    }),
                    new ol.layer.Vector({
                        source: street,
                        visible: true,
                        name: 'street',
                        style: styleStreet
                    }),
                    new ol.layer.Vector({   
                        source: places,
                        visible: false,
                        name: 'places',
                        style: stylePlaces
                    }),
                    new ol.layer.Vector({   
                        source: myplaces,
                        visible: true,
                        name: 'myplaces',
                        style: styleMyPlaces
                    }),
                ],
                visible: true,
                name: 'bases'
            });

            var openstreetmap = new ol.layer.Tile({
                source: new ol.source.OSM(),
                visible: true,
                name: 'openstreetmap'
            });

            rendMap(bases, openstreetmap);
            colorDuplicPlaces(placesDuplicated);
            actActions();
            actPoint();
            actLine();
        });
    });
});
