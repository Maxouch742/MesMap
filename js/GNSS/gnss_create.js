function gnss_create(){

    map.removeInteraction(gnss_draw);
    map.removeInteraction(gnss_snap);

    // L'utilisateur souhaite ajouter un cheminement
    if (gnss_create_button === true){
        
        //TODO: vérifier si des points sont déjà présents sur la map

        // changer l'intitulé du bouton
        document.getElementById('html_GNSSCreate').innerText = 'Fin de l\'ajout';
        gnss_create_button = false;

        //---- Ajouter un nouveau bouton
        const button = document.createElement('button');
        button.setAttribute('id', 'html_GNSSAddSession');
        button.setAttribute('onclick', 'gnss_addSession()');
        button.innerHTML = 'Add session';
        document.getElementById('gnss_buttonAddSession').appendChild(button);
        
        //---- Dessin des carrés
        gnss_draw = new ol.interaction.Draw({
            source: gnss_source,
            type: 'Point',
            style: new ol.style.Style({
                image: new ol.style.RegularShape({
                    /*fill: new ol.style.Fill({ 
                        color: 'red'
                    }),*/
                    stroke: new ol.style.Stroke({ 
                        color: 'red',
                        width: 2,
                    }),
                    points: 4,
                    radius: 10,
                    angle: Math.PI / 4,
                }),
            })
        });
        map.addInteraction(gnss_draw);
        gnss_snap = new ol.interaction.Snap({
            source: gnss_source
        });
        map.addInteraction(gnss_snap);

        //---- Ajoutez un gestionnaire d'événements pour cliquer sur la carte
        /*map.on('click', function (event) {
            // Récupérez les coordonnées du clic
            const coordinates = event.coordinate;
            console.log(coordinates);

            // Créez un point avec les coordonnées
            const point_gnss = new ol.Feature({
                geom: new ol.geom.Point( event.coordinate ),
                style: new ol.style.Style({
                    image: new ol.style.RegularShape({
                        fill: new ol.style.Fill({ 
                            color: 'red'
                        }),
                        stroke: new ol.style.Stroke({ 
                            color: 'red'
                        }),
                        points: 4,
                        radius: 20,
                        angle: Math.PI / 4,
                    }),
                })
            });
            gnss_source.addFeature( point_gnss );
            console.log(point_gnss);

        });
        */

        //TODO: copier le feature dans le layer GNSS et ne pas toucher au point
        
        
        
        

    }
    else {
        // changer l'intitulé du bouton
        document.getElementById('html_GNSSCreate').innerText = 'Ajouter un cheminement';
        gnss_create_button = true;

        // supprimer le bouton supplémentaire
        document.getElementById('gnss_buttonAddSession').innerHTML = '';

    }
}