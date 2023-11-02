//--------------- Affichage un point -----------------  
let source_pts = new ol.source.Vector({});
let vectorPointsLayer = new ol.layer.Vector({
    source: source_pts,
    style : style_points
    });
map.addLayer(vectorPointsLayer);


function affichagePoints(points_global){
    /** Affichage des points sur map
     * 
     * @param {object}  objet points global
     * @returns none
     * 
     */

    map.removeLayer(vectorPointsLayer); // Supprime la couche
    // On rinitialise la couche
    vectorPointsLayer = new ol.layer.Vector({});
    source_pts1 = new ol.source.Vector({});

    for (let i = 0; i < points_global['features'].length ; i ++ ){
        point_temp = new ol.geom.Point(points_global['features'][i]['geometry']['coordinates']);
        
        feature_temp = new ol.Feature({
            id: points_global['features'][i]['properties']['id'],
            geometry: point_temp,
            });
        feature_temp.setStyle(style_points);
        source_pts1.addFeature(feature_temp);  
        vectorPointsLayer.setSource(source_pts1);
        vectorPointsLayer.setZIndex(99);
     }
    map.addLayer(vectorPointsLayer);
};