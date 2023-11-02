//--------------- Recuperer element station / session -----------------

function recoverStation(points_global, baliseStation_id){
    /** Recupere depuis points_global les numeros de stations possible
     * 
     * @param {object} points_global    objet des points
     * @param {object} baliseStation_id nom id de la balise pour la station exemple : 'St_terrestre_0'
     * @returns nothing
     * 
     */
    
    if (Object.keys(points_global).length == 0 ){
        // Regarde si pas de points se trouve dans points_global --> Liste deroulante vide
        }
    
    else{
        // Parcourir la liste des stations
        // https://www.techiedelight.com/fr/dynamically-create-drop-down-list-javascript/
    
        let var_id = baliseStation_id.id; // Recuperer id : St_gnss_0
        let i = var_id.split('_')[2]; // Avoir numero de id : St_gnss_0
         let selectElmt = document.getElementById(var_id);

        // Supprime tous les éléments de la lise deroulante pour la remettre a 0
        if (methode === 'terrestre' | methode === 'nivellement'){
            let options = document.querySelectorAll('#St_' + methode + '_' + i + ' option');
            // Recuperer element selectionner une liste
            let var_select = document.getElementById('St_' + methode + '_' + i ).value  ;
            options.forEach(o => o.remove());
            // Parcourir liste et ajouter les options
            for (let j = 0; j < points_global.features.length; j++){
                    let val = points_global.features[j].properties.id ;
                    let option = document.createElement("option");
                    option.value = val ;
                    option.text = val.charAt(0).toUpperCase() + val.slice(1);
                    if (val=== var_select){
                        option.selected = true;
                        };
                        selectElmt.appendChild(option);
                };

                // Recuperer index du numero station choisi dans liste deroulante
                let indexselectionnee = selectElmt.selectedIndex;
                valeurselectionnee = selectElmt[indexselectionnee].value; 
            };
                           
        if (dico_mes[methode]['features'][i]  === undefined){
            // Si station_output n a pas de station enregistre a indice i (indice tbl) alors on lui cree un dico a l interieur pour la station
            // Cree un dico partiel
            let st_pt = {'properties':
                    {
                'num' :valeurselectionnee, 
                'visee':'', // Mis '' car pouvoir utiliser dans AfficahgeTbl condition
                'check':0,
                    }
                };
            
            dico_mes[methode]['features'][i] = st_pt; // Ajouter dico partiel dans un dico en fct indice
            addligneSt(document.getElementById("tblSt_" + methode).rows.length, methode); // Ajoute ligne automatique quand ligne remplis
            }

        else{
            // Si station_output a une station enregistrer a indice i (indice tbl) alors on change juste la valeur de la station
            // On change numero station du dico de base
            dico_mes[methode]['features'][i]['properties']['num'] = valeurselectionnee;
            };
               
        // Supprimer disabled --> donner possibiliter cocher / decocher radio et checkbox
        deleteDisabled(i, 'Activate_' + methode + '_' ) ;
        deleteDisabled(i, 'Map_' + methode + '_' ) ;

        affichageVisee(dico_mes) ;   // Met a jout automatique affichage visee quand on change num point 
    };
};

function activateStation(){
    /** Rassemble les fonctions pour quand j active une station sa m affiche les observations qui sont associer
     * 
     * @returns nothing
     * 
     */

    valeur = iactivateRadio()
    let u = valeur.split('_')[2]
    console.log(methode, u)
    // Quand radio active --> affiche dans tbl obs num pt pour la radio active
    // if (methode === 'gnss' & (dico_mes['gnss']['features'].length === 0 || dico_mes['gnss']['features'][u]['properties']['visee'] == '')) {
    if (methode === 'gnss'){
        if(dico_mes['gnss']['features'].length === 0 || dico_mes['gnss']['features'][u]['properties']['visee'] == ''){
        // Cas ou dico tbl_obs_gnss est vide on ajoute une ligne au tbl_obs_gnss
        delteTBL('tblObs_' +  methode)
        addligneObs(0, methode);
        }
        else{
        afficheTblObs(dico_mes, valeur, methode)

        }
    }

        // }
    else {
        afficheTblObs(dico_mes, valeur, methode)
        }
    console.log('tbl afficher');
};

function iactivateRadio(){
    /** Retourne la checkbox active quand je coche une checbox
     * 
     * @returns {string}    Ex. CheckST_terrestre_0
     * 
     */

    let radios = document.getElementsByName('flexRadioDefault');
    let valeur;
    for(var i = 0; i <= radios.length; i++){
        if(radios[i].checked){
        valeur = radios[i].id;
        return valeur 
        }
    };
};

function addSession(){
    /** Ajouter une ligne de session au gnss
     * 
     * @returns nothing
     * 
     */

    let u = document.getElementById('tblSt_gnss').rows.length;
    addligneSt(u, methode);
    deleteDisabled(u, 'Map_' + 'gnss' + '_' );
};

       