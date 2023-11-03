function levelling_create(){

    map.removeInteraction(levelling_draw);
    map.removeInteraction(levelling_snap);

    //TODO: ajouter les points dans la même couche

    // L'utilisateur souhaite ajouter un cheminement
    if (levelling_create_button === true){

        // changer l'intitulé du bouton
        document.getElementById('html_levellingCreate').innerText = 'Fin de l\'ajout';
        levelling_create_button = false;

        // Dessin 
        levelling_draw = new ol.interaction.Draw({
            source: levelling_source,
            type: 'LineString',
        });
        map.addInteraction(levelling_draw);
        levelling_snap = new ol.interaction.Snap({ source: levelling_source });
        map.addInteraction(levelling_snap);

    }
    // L'utilisateur souhaite arrêter le dessin sur la carte
    else if (levelling_create_button === false){

        // changer l'intitulé du bouton
        document.getElementById('html_levellingCreate').innerText = 'Ajouter un cheminement';
        levelling_create_button = true;
    }
}