function levelling_treatment(list_features){

    // Parcours de la liste des features (lignes)
    list_features.forEach(function (feature){

        // Récupérer les différentes informations
        const feature_id = feature.getId();

        // on vérifie si le cheminement n'est pas déjà enregistré
        if (!(feature_id in cheminement)){

            const feature_coord = feature.getGeometry().getCoordinates();

            // Créer le tableau (liste) des stations et visées
            let array_sta_vis = [];
            
            // Variables pour comparer et trouver les stations / visees, ...
            let station = false;
            let station_coordinate = false;
            let visee = false;
            let distance = 0.0;

            // Parcours des coordonnées du cheminement
            feature_coord.forEach( function(coordinate){

                let point_in_koo = false;

                // Parcours des points importés pour connaître le matricule
                points_global["features"].forEach( function(element){

                    // Si le point cliqué est présent le fichier KOO
                    if (coordinate[0] === element['geometry']['coordinates'][0] &&
                        coordinate[1] === element['geometry']['coordinates'][1]){

                        // Le point est present dans le koo
                        point_in_koo = true;
                        
                        // Si aucune station n'est enregistre, notre point devient une station
                        if (station === false){ 
                            station = element['properties']['id'] ;
                            station_coordinate = element['geometry']['coordinates'];
                        }

                        // Si la station est déjà enregistré
                        else if (station !== false){

                            // si la visée n'est pas enregistré, cela devient alors une visée
                            if (visee === false && station !== false){

                                // On calcule alors la distance 
                                const dE = station_coordinate[0] - element['geometry']['coordinates'][0];
                                const dN = station_coordinate[1] - element['geometry']['coordinates'][1];
                                distance += Math.sqrt( dE*dE + dN*dN );
                                station_coordinate = element['geometry']['coordinates'];

                                // Récupérer la visée
                                visee = element['properties']['id'];

                                // ajoute le cheminement au list
                                array_sta_vis.push({ 'station':station, 'visee':visee, 'distance':distance, 'sigma':0.2 });

                                station = visee;
                                station_coordinate = element['geometry']['coordinates'];
                                visee = false;
                                distance = 0;
                            }
                        }
                    }
                })

                // Si le point n'est pas présent dans les points importés ou enregistrés
                if (point_in_koo === false){
                    // On considère donc que c'est un point intermédiaire
                    const dE = station_coordinate[0] - coordinate[0];
                    const dN = station_coordinate[1] - coordinate[1];
                    distance += Math.sqrt( dE*dE + dN*dN );
                    station_coordinate = coordinate;
                }

            });
            cheminement[feature_id] = array_sta_vis
            let distance_totale = 0;
            for (let i=0; i<array_sta_vis.length; i++){
                distance_totale += array_sta_vis[i]['distance']
            };
            levelling_create_row(feature_id, array_sta_vis.length+1, distance_totale);
        }
    });
}