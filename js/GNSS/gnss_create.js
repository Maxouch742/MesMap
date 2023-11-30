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
            type: 'MultiPoint',
            style: new ol.style.Style({
                image: new ol.style.RegularShape({
                    stroke: new ol.style.Stroke({ 
                        color: 'red',
                        width: 2,
                    }),
                    points: 4,
                    radius: 20,
                    angle: Math.PI / 4,
                }),
            })
        });
        map.addInteraction(gnss_draw);
        gnss_snap = new ol.interaction.Snap({
            source: gnss_source
        });
        map.addInteraction(gnss_snap);
        
    }
    else {
        //---- changer l'intitulé du bouton
        document.getElementById('html_GNSSCreate').innerText = 'Ajouter un cheminement';
        gnss_create_button = true;

        //---- supprimer le bouton supplémentaire
        document.getElementById('gnss_buttonAddSession').innerHTML = '';

        //---- Récupérer les features présents dans le layer
        let list_features_gnss = [];
        gnss_source.forEachFeature( function(feature){

            if (feature.getGeometry().getType() === 'MultiPoint'){

                if (feature.getId() === undefined){
                    feature.setId("Session"+String(gnss_id));
                    gnss_id++;
                };

                list_features_gnss.push(feature);
            }
        });
        gnss_treatment(list_features_gnss, gnss_id-1);
    }
}