//--------------- Suppression un point -----------------  

function value_input_pt(pt_feature){
    /** Modifier la valeur dans le champ input
     * 
     * @param {object} pt_feature        numero du points
     * @returns {string}  numero du point selectionner  
     * 
     */
    num_point = pt_feature;
    document.getElementById('numPt').value = num_point; 
    return num_point; 
    };


function deletePoint(){
    /** Supprimer point selectionner (celui qui est afficher dans zone input)
     * 
     * @returns none
     * 
     */

    // Suppression du points dans objets points_global
    let long = points_global['features'].length;
    for (let i = 0; i < points_global['features'].length; i++) {
        if (points_global['features'][i]['properties']['id'] === num_point){
            delete points_global['features'][i]; 
            num_i = i;
        };
    };

    // Mise a jour index 
    numeroIndicePts(points_global, num_i, long);

    // Supprimer obs avec ce numero de station / obs 
    list_methode = ['terrestre', 'nivellement', 'gnss'];

    // Suppression station qui a ce point
    for (let j = 0; j < list_methode.length; j++){
        let temp_methode = list_methode[j];
        if(temp_methode != 'gnss' ){
            let i = 0;
            let num_ligne_sta = 99999;
            for (i; i < dico_mes[temp_methode]['features'].length ; i++){
                console.log(i)
                if (dico_mes[temp_methode]['features'][i]['properties']['num'] === num_point){
                    delete dico_mes[temp_methode]['features'][i]; 
                    num_ligne_sta = i;
                } 
                console.log(num_ligne_sta)
                let long_sta = dico_mes[temp_methode]['features'].length;
                console.log('lon',long_sta )
                if (num_ligne_sta !== 99999){
                    console.log('methode')
                    numeroIndiceTbl(dico_mes, num_ligne_sta, long_sta, temp_methode) ;
                    num_ligne_sta = 99999 // Rinitialise variable
                    console.log(dico_mes[temp_methode]['features'])
                    i = -1 // Forcer la boucle a se rinitialiser (on recommence a parcourir l objet des stations)
            }
        }}};

    // Supprime observation qui a ce point
    for (let j = 0; j < list_methode.length; j++){
        let temp_methode = list_methode[j];
        for (let i = 0; i < dico_mes[temp_methode]['features'].length ; i++){
            let long_obs = dico_mes[temp_methode]['features'][i]['properties']['visee']['features'].length;
            let num_ligne_obs= 99999;
            for (let k = 0; k < dico_mes[temp_methode]['features'][i]['properties']['visee']['features'].length ; k++){
                if (dico_mes[temp_methode]['features'][i]['properties']['visee']['features'][k]['properties']['num'] === num_point){
                    delete dico_mes[temp_methode]['features'][i]['properties']['visee']['features'][k];     
                    num_ligne_obs = k;
                };};
            
            if (num_ligne_obs !== 99999){
                numeroIndiceTblObs(dico_mes, num_ligne_obs, long_obs, i, temp_methode);
        };};};

    // Si on a un dico de session / station vide il le supprime 
    CheckLength(list_methode);

    affiStationTbl(dico_mes, methode); // Mis a jour tableau station
    delteTBL('tblObs_' + methode);
    affichagePoints(points_global); // Mis a jour point map
    affichageVisee(dico_mes); // Mis a jour visee map
    document.getElementById('deletePt').disabled = 'disabled' ;
    }


function CheckLength(list_methode){
    /** Suprrime session / station si on a pas de visee / point dans une session / station
     * 
     * @returns none
     * 
     */
    for (let j = 0; j < list_methode.length; j++ ){
        x =  list_methode[j];
        let long_sta =dico_mes[x]['features'].length ;
        for (let i = 0; i < dico_mes[x]['features'].length ; i++){
            if (dico_mes[x]['features'][i]['properties']['visee']['features'].length === 0){
                console.log(x, i)
                delete dico_mes[x]['features'][i];
                numeroIndiceTbl(dico_mes, i, long_sta, x);
            };
        };
    };
};

function numeroIndicePts(points_global, i, long){
    /** Modifier les numeros indices de objet points_global
     * 
     * @param {object} points_global objet des observations
     * @param {number} i indice object du points_global selectionner
     * @param {number} long longueur object points_global
     * @returns nothing
     * 
     */

    // Renumerote les indices pour ne pas avoir un saut de la station supprimer
    for(i; i < long ;i++){
        points_global['features'][i] = points_global['features'][i + 1];
    }
    // Supprime la derniere obs pour ne pas avoir a double
    delete points_global['features'][i];
    // on lui fixe une longueur de dico 
    points_global['features'].length = long-1 ;
    };