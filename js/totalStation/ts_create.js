function ts_create(){

    map.removeInteraction(ts_draw);
    map.removeInteraction(ts_snap);

    // L'utilisateur souhaite ajouter un cheminement
    if (ts_create_button === true){
        
        //TODO: vérifier si des points sont déjà présents sur la map

        // changer l'intitulé du bouton
        document.getElementById('html_TSCreate').innerText = 'Fin de l\'ajout';
        ts_create_button = false;

        //---- Ajouter un nouveau bouton
        const button = document.createElement('button');
        button.setAttribute('id', 'html_TSAddStation');
        button.setAttribute('onclick', 'ts_addStation()');
        button.innerHTML = 'Add session';
        document.getElementById('ts_buttonAddStation').appendChild(button);
        
        //---- Dessin des carrés
        ts_draw = new ol.interaction.Draw({
            source: ts_source,
            type: 'MultiPoint',
            style: new ol.style.Style({
                image: new ol.style.RegularShape({
                    stroke: new ol.style.Stroke({ 
                        color: 'green',
                        width: 2,
                    }),
                    points: 3,
                    radius: 20,
                    angle: Math.PI / 3,
                }),
            })
        });
        map.addInteraction(ts_draw);
        ts_snap = new ol.interaction.Snap({
            source: ts_source
        });
        map.addInteraction(ts_snap);
        
    }
    else {
    }
}