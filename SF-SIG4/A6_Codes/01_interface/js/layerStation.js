//--------------- Checkbox Layer station  ----------------- 
var_check = true ; // Variable global de si on active ou desactive les checklayer

function addCheckboxlayer(i, methode_type){
    /** Ajouter la checkbox de la station pour activer la station sur la map
     * 
     * @param {number} i longueur du tableau station / session
     * @param {string} methode_type nom methode 
     * @returns typObs_0 element checkbox map
     * 
     */

    let typObs_0 = document.createElement("input");
    typObs_0.type = 'checkbox';
    typObs_0.id = 'Map_' + methode_type +'_' + i;
    typObs_0.name = 'Map_' + methode_type +'_' + i;
    typObs_0.disabled = 'disabled';
    typObs_0.checked = true; // Par defaut coche activer
    typObs_0.onclick = function(){etatCheck(this)};
    return typObs_0;
};

function etatCheck(id_check){
    /** Activer / Desactiver checkbox en fct valeur dans vraiable check du dico_mes si 1 ou 0
     * 
     * @param {object} id_check object de element du check de la map pour une sttaion / session
     * @returns nothing
     * 
     */

    let j = id_check.id.split('_')[2];
    if (id_check.checked === false){
        dico_mes[methode]['features'][j]['properties']['check'] = 1;
    };
    if (id_check.checked === true){
        dico_mes[methode]['features'][j]['properties']['check'] = 0;
    };
    affichageVisee(dico_mes);
    };

function allDeSelectCheck(dico_mes){
    /** Activer / Desactiver toute les checkbox de station de la map
     * 
     * @param {object} dico_mes object ou on a les observations
     * @returns nothing
     * 
     */
    console.log('bouton cliquer');
    for(let i = 0; i < dico_mes[methode]['features'].length ;i++){
        if (var_check === true){
            dico_mes[methode]['features'][i]['properties']['check'] = 1;
            document.getElementById('Map_' + methode +'_' + i).checked = false;
        }
        else {
            dico_mes[methode]['features'][i]['properties']['check'] = 0
            console.log(document.getElementById('Map_' + methode +'_' + i));
            document.getElementById('Map_' + methode +'_' + i).checked = true;  
        };};

    if (var_check === true){
        var_check = false;
        }
    else {
        var_check = true ;
        };
    affichageVisee(dico_mes); 
    };

function addAttribut(dico_mes){
    /** Ajoute attribut check = 0 pour chaque station 
     * 
     * @param {object} dico_mes object ou on a les observations
     * @returns nothing
     * 
     */

    for(i; i < dico_mes[methode]['features'].length ;i++){
        dico_mes[methode]['features'][i]['properties']['check'] = 0;
        };
};

