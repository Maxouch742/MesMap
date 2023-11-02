//--------------- Deplacer un point sur la map -----------------

// Initialiser variable pour activier ou desactiver icone deplacer
temp_deplacer = false ;

map.on('click', function (evt) {
    /** Recuperer le numero point du point selectionner
     * 
     * @returns nothing
     * 
     */

    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        document.getElementById('deplacerPt').removeAttribute('disabled');
        document.getElementById('deletePt').removeAttribute('disabled');
         
        pt_feature = feature.getProperties()['id'];
        console.log(feature.getProperties()['id']);
        value_input_pt(pt_feature);
        return pt_feature
      });
    });

map.on('click', function(evt) {
    /** Modifier coord d un point
     * 
     * @returns nothing
     * 
     */

    let pointCoordinates = evt.coordinate;

    if (temp_deplacer == true){

        for (let i = 0; i < points_global['features'].length ; i ++ ){
            let pt_dico = points_global['features'][i]['properties']['id'];
            if (pt_dico === pt_feature){
                // Met a jour le dico points_global
                points_global['features'][i]['geometry']['coordinates'][0] = pointCoordinates[0]; // Est
                points_global['features'][i]['geometry']['coordinates'][1] = pointCoordinates[1]; // Nord
                console.log('Coord du pt ', pt_dico, 'ont ete modifier' );  

                // Envoire URL API height
                updateUrl(newUrl = 'https://api3.geo.admin.ch/rest/services/height');
                const h_pomise = getHeight(pointCoordinates[1],pointCoordinates[0]); // Recupere hauteur
                h_pomise.then(function cont(result) {
                    points_global['features'][i]['properties']['h'] = parseFloat(result)
                    console.log('altitude du pt ', pt_dico, 'ont ete modifier' )
                    });
            }}; 
        document.getElementById('deplacerPt').disabled = 'disabled' ;
        affichagePoints(points_global);
        temp_deplacer = false  ;
        affichageVisee(dico_mes);
    };});

function deplacerPt(){
    /** Activation de icone deplacer
     * 
     * @returns nothing
     * 
     */

    temp_deplacer = true;
    console.log('bouton deplacer active');
    };

