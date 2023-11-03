/**
 * Afficher les points importés et où cliqués dans la map
 */

function displayPoints(){

    // Définition du layer
    points_layer = new ol.layer.Vector({});
    points_source = new ol.source.Vector({});

    // Définition des variables pour traiter les points selon leur type
    let points_type_couleur = {};
    let points_type_variable = ['1','2','3','4','5','6','7','8','9','10','11','12'];

    // Parcours de l'objet pour déterminer les couleurs par types
    for (let i=0; i<points_global['features'].length; i++){
        const point = points_global['features'][i];
        const point_type = point['properties']['date'];

        // Si le type n'est pas présent dans l'objet "points_type_couleur"
        if (Object.keys(points_type_couleur).includes(point_type) === false){

            // On contrôle qu'il existe encore des couleurs de disponibles
            if (points_type_variable.length >= 1){
                // On ajoute le type dans l'object
                points_type_couleur[point_type] = points_type_variable[0]
                points_type_variable.splice(0, 1);
            }
            else {
                console.log("Pas de couleur disponible : ",point_type);
            }
        }
    }

    // Parcours de l'objet pour afficher les points
    for (let i=0; i<points_global['features'].length; i++){
        const point = points_global['features'][i];
        //console.log(type_color[ points_type_couleur[point['properties']['type']] ])
        
        // Creation du feature
        const point_feature = new ol.Feature({
            geometry: new ol.geom.Point( 
                point['geometry']['coordinates']
            ),
            name: point['properties']['id'],
            properties: point['properties'],
        });

        // Ajout du feature dans la source du levelling
        levelling_source.addFeature(point_feature);

        // Ajout du feature dans la source des points
        point_feature.setStyle( new ol.style.Style({
            text: new ol.style.Text({
                text: point['properties']['id'],
                textAlign: "center",
                textBaseline: "middle",
                font: "bold 14px Calibri",
                fill: new ol.style.Fill({
                    color: "#000000" //noir
                }),
                stroke: new ol.style.Stroke({
                    color: "#ffffff", //blanc
                    width: 3
                }),
                offsetX: 15.0,
                offsetY: -10.0,
                rotation: 0
            }),
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: String(type_color[ points_type_couleur[point['properties']['date']] ]),
                }),
                stroke: new ol.style.Stroke({
                    color: String(type_color[ points_type_couleur[point['properties']['date']] ]),
                    width: 1,
                }),
            })
        }));
        points_source.addFeature(point_feature);
    };

    // Ajout de la source dans le layer
    points_layer.setSource(points_source);
    points_layer.setZIndex(99);
    map.addLayer(points_layer);
    displayLayers('points');
    displayPointsLegend(points_type_couleur);
}