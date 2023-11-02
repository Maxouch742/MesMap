//--------------- changer la carte de fond -----------------  

function changeBackground(layer) {
    /** Changer le fond de carte
     * 
     * @param {string} layer    nom du layer
     * @returns nothing
     * 
     */
    
    // Désactivation des couches
    map.removeLayer(carteNationale);
    map.removeLayer(SwissSURFACE3D);
    map.removeLayer(MO_nb);
    map.removeLayer(swissimage);
    
    // Ajout du layer choisi par l'utilisateur
    switch (layer){
        case 'CN' :
            map.addLayer(carteNationale);
            break;
        case 'swissImage' :
            map.addLayer(swissImage);
            break;
        case 'swissSurface3D' :
            map.addLayer(SwissSURFACE3D);
            break;
        case 'MO' :
            map.addLayer(MO_nb);
            break;
        case 'swissimage' :
            map.addLayer(swissimage);
            break;
    }};