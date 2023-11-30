/**
 * 
 * @param {array} list_session liste des points sélectionnés pour une session
 * @param {int} gnss_id identifiant unique de la session
 */
function gnss_treatment(list_session, gnss_id){

    // Data de la session
    const parameter = "++++";
    const observation = [];

    // Parcourir la liste des features
    list_session.forEach(function (feature){

        const feature_id = feature.getId();
        const feature_co = feature.getGeometry().getCoordinates()[0];

        // Parcours des points importés pour connaître le matricule
        points_global["features"].forEach( function(element){

            // Si le point cliqué est présent le fichier KOO
            if (feature_co[0] === element['geometry']['coordinates'][0] &&
                feature_co[1] === element['geometry']['coordinates'][1]){

                observation.push({
                    "point": element['properties']['id'],
                    "LY": element['geometry']['coordinates'][0],
                    "LX": element['geometry']['coordinates'][1],
                    "LH": element['properties']['h'],
                    "sigma_Y": 1.0,
                    "sigma_X": 1.0,
                    "sigma_H": 3.0
                });
            }
        })
    });

    // Ajout de la sesison dans l'objet général
    gnss_cheminement["Session"+String(gnss_id)] = {
        "parameter":parameter,
        "observation":observation
    }

    // Création de la ligne
    console.log(gnss_cheminement);
    gnss_create_row(gnss_id, observation);

}