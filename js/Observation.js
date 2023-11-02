//--------------- Recuperer element observation -----------------

function recoverObs(points_global, baliseObs_id){
    /** Recupere depuis points_global les numeros de stations possible
     * 
     * @param {object} points_global    objet de points
     * @param {object} baliseObs_id        nom id de la balise observation exemple : 'obsselect_terrestre_0' de points
     * @returns nothing
     * 
     */

    if (Object.keys(points_global).length == 0 ){
        // Regarde si pas de points se trouve dans points_global --> Liste deroulante vide
        }

    else{
        // Parcourir la liste des stations
        // https://www.techiedelight.com/fr/dynamically-create-drop-down-list-javascript/

        let valeur = iactivateRadio();
        valeur = valeur.split('_')[2];

        let var_id = baliseObs_id.id; // Recuperer id 
        let i = var_id.split('_')[2];
        let selectElmt = document.getElementById(var_id);

        // Supprime tous les éléments de la lise deroulante pour la remettre a 0
        let options = document.querySelectorAll('#Obs_' + methode + '_' + i + ' option');
        // Recuperer element selectionner une liste
        let var_select_obs = document.getElementById('Obs_' + methode + '_' + i).value;
        options.forEach(o => o.remove());

        numSta = dico_mes[methode]['features'][valeur]['properties']['num'];
        // Parcours la liste points_global pour ajouter dans la liste deroulante
        for (let j = 0; j < points_global.features.length; j++){
            let val = points_global.features[j].properties.id ;
            // Ajoute tout les numero de points_global sauf le numero station dans liste 
            if(numSta !== val){
                let option = document.createElement("option");
                option.value = val ;
                option.text = val.charAt(0).toUpperCase() + val.slice(1);
                if (val=== var_select_obs){
                    option.selected = true;
                    };

                    selectElmt.appendChild(option);
            };
        };
        // Recuperer index du numero station choisi dans liste deroulante
        let indexselectionnee = selectElmt.selectedIndex;
        valeurselectionnee = selectElmt[indexselectionnee].value ;


        if (dico_mes[methode]['features'][valeur]['properties']['visee'] === '' || dico_mes[methode]['features'][valeur]['properties']['visee']['features'][i] === undefined){
            if (dico_mes[methode]['features'][valeur]['properties']['visee'] === ''){
                // Si station_output n a pas de station enregistre a indice i (indice tbl) alors on lui cree un dico a l interieur pour la station
                obs_obj = {
                    'features':[]
                    }};

            if (methode === 'terrestre'){
                console.log('on a du terrestre')
                obs_pt =  {'properties':
                        {
                    'num' :valeurselectionnee,
                    'RI': 1,
                    'DS': 1,
                    'ZD': 1,
                        }
                    }};

            if (methode === 'gnss'){
                console.log('on a du gnss')
                // Par defaut mesure en LX, LY, LH --> Rare autrement
                obs_pt =  {'properties':
                        {
                    'num' :valeurselectionnee,
                    'LX': 0,
                    'LY': 0,
                    'LH': 0,
                        }
                    }};
            if (methode === 'nivellement'){
                console.log('on a du nivellement')
                // Par defaut mesure en LX, LY, LH --> Rare autrement
                obs_pt =  {'properties':
                        {
                    'num' :valeurselectionnee,
                    'DH': 0,
                        }
                    }};

            if (dico_mes[methode]['features'][valeur]['properties']['visee'] === ''){
                // Ajouter dico partiel dans un dico en fct indice
                obs_obj['features'][i] = obs_pt;
                dico_mes[methode]['features'][valeur]['properties']['visee'] = obs_obj;
                }                
            else{
                dico_mes[methode]['features'][valeur]['properties']['visee']['features'][i] = obs_pt;
                };
            addligneObs(document.getElementById("tblObs_" + methode).rows.length, methode);
        }
    
        else{
            // Si station_output a une station enregistrer a indice i (indice tbl) alors on change juste la valeur de la station
            // Change numero station du dico de base
            dico_mes[methode]['features'][valeur]['properties']['visee']['features'][i]['properties']['num'] = valeurselectionnee;
            };
            
        if (methode === 'terrestre'){
            deleteDisabled(i, 'RI_');
            deleteDisabled(i, 'DS_');
            deleteDisabled(i, 'ZD_');   
            };

        if (methode === 'gnss'){
            // Mettre de base coche active pour obs gnss --> rare de pas activer les 3
            document.getElementById('LX_' + i).checked = true;
            document.getElementById('LY_' + i).checked = true;
            document.getElementById('LH_' + i).checked = true;
            
            deleteDisabled(i, 'LX_');
            deleteDisabled(i, 'LY_');
            deleteDisabled(i, 'LH_') ; 
            }

        affichageVisee(dico_mes);// Met a jout automatique affichage visee quand change num point   
    };
};

function addcheckbox(type, methode_type){
    /** Permettre ajouter une checkbox
     * 
     * @param {string} type    ex : 'RI' ou 'DP' ou 'ZD' ou 'LX' ou 'LY' ou 'LH' ou 'DH'
     * @param {string} methode_type        'terrestre' ou 'gnss' ou 'nivellement'
     * @returns {object} element checkbox
     * 
     */

    let typObs_0 = document.createElement("input");
    let i = document.getElementById("tblObs_" + methode_type).rows.length ;

    typObs_0.type = 'checkbox';
    typObs_0.id = type +'_' + i ;
    typObs_0.name = type +'_' + i ;
    typObs_0.disabled = 'disabled';
    typObs_0.onclick = function(){recup_check(this)};
    return typObs_0
    }
    ;
function recup_check(baliseType_id){
    /** Recuperer si checkbox est activer ou non
     * 
     * @param {object} baliseType_id        nom id de la balise exemple : 'obsselect_terrestre_0'
     * @returns nothing
     * 
     */

    let var_id = baliseType_id.id;
    let selectElmt = document.getElementById(var_id);
    check = selectElmt.checked;

    type = var_id.split('_')[0];
    let j = var_id.split('_')[1];

    valeur = iactivateRadio();
    valeur = valeur.split('_')[2];

    if (check){
        // Si case coche = true --> ajouter dans dico RI
        dico_mes[methode]['features'][valeur]['properties']['visee']['features'][j]['properties'][type] = 0 ;// Valeur active
        console.log('value active', type);
        }
    else{
        // Si case pas coche = false --> enlever du dico RI
        dico_mes[methode]['features'][valeur]['properties']['visee']['features'][j]['properties'][type] = 1;
        };
    affichageVisee(dico_mes);// Met a jout automatique affichage visee quand change num point 
    };




