//--------------- Ajouter des points manuellement par l utilisateur -----------------

let vectorPointsTempLayer = new ol.layer.Vector({});

// Variable gloable temporaire pour ne pas pouvoir cliquer sur la map si on a pas cliquer sur "+"
temp_addPoint = false;  // Ne permet pas ajouter deux stations a la suite sans cliquer sur "+"

// Ajouter point lors clic souris sur map
map.on('click', function(evt) {
    if (temp_addPoint == true){
        map.removeLayer(vectorPointsTempLayer);
        let pointCoordinates = evt.coordinate;
           
        // recreer un layer complet pour le point temporaire ajouter manuellement      
        let feature_temp = new ol.Feature({
            id : noPoint(), // Recupere numero station
            geometry: new ol.geom.Point(pointCoordinates), 
        });

        feature_temp.setStyle(style_points_temp);
        source_point_temp = new ol.source.Vector({});
        source_point_temp.addFeature(feature_temp);
        vectorPointsTempLayer.setSource(source_point_temp);
        map.addLayer(vectorPointsTempLayer);
        return temp_addPoint // Value booeleans
    };});

function noPoint() {
    /** Recuperer l input numero du point
     *  
     * @returns {string} numero du point 
     * 
     */
        
    num_point = this.value;
    num_point = document.getElementById('numPt').value;
    return num_point;
    };
    

function checNumPts() {
    /** Ctrl qu un pt n est pas deja dans l'objet "points_global"
     * 
     * @returns {number} retour 0 si numero point est deja utiliser 
     * 
     */

    for (i = 0; i < points_global['features'].length; i++) {
        
        let num_dico = points_global['features'][i]['properties']['id'];
        let num_avoir = noPoint();

        if(num_avoir === num_dico){
            window.alert('Numéro de point est dejà utilisé');
            let num_value = 0;// pas valide numero deja utilise
            return num_value; 
            };
    };
};

function addPoint(){
    /** Modifier etat du bouton pour valider le nouveau point (bouton : validation - vue) 
     * 
     * @returns nothing
     * 
     */

    // Desactiver bouton "Delete" si en est entrain d'ajouter un points
    document.getElementById('deletePt').disabled = 'disabled'; 

    let num_value = checNumPts(); // Return 0 --> pt deja utiliser
    // Check si num pt ok ou non
    if(num_value === 0){
        temp_addPoint = false;  
        }

    else{
        temp_addPoint = true;
        let  var_element  = document.getElementById('validatePt');
        var_element.removeAttribute('disabled');
        };
    };

function validatePoint(){
    /** Quand valide station je stocke le point dans "points_global" et affiche map
     * 
     * @returns nothing
     * 
     */
   
    // Remove le layer temporaire pour le vider (n'affiche plus sur la carte)
    map.removeLayer(vectorPointsTempLayer);
         
    // ajouter le style
    source = vectorPointsTempLayer.getSource();
    feature = source.getFeatures()[0];

    // Rinitialise variables a false
    temp_addPoint = false; 

    let y = feature.getGeometry()['flatCoordinates'][0]; // Est
    let x = feature.getGeometry()['flatCoordinates'][1]; // Nord
    
    // Envoire URL API height
    updateUrl(newUrl = 'https://api3.geo.admin.ch/rest/services/height');
    const h_pomise = getHeight(x,y); // Recupere hauteur
    h_pomise.then(function cont(result) {
        let objet_point_temp = {
            "type":"Feature",
            "geometry":{
                "type":"Point",
                "coordinates":[y, x]
            },
            "properties":{
                'id':num_point,
                'type':'',
                'commentaire':'',
                'h': parseFloat(result), // En float,
            }
        }

        points_global["features"].push(objet_point_temp);

        affichagePoints(points_global);

        // Desactiver bouton validation apres avoir valider
        document.getElementById('validatePt').disabled = 'disabled';
    });
};



