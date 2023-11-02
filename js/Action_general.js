//--------------- Fonction a utiliser pour station et observation -----------------  

function deleteDisabled(i, element_id){
    /** Supprimer desactivation / disabled
     * 
     * @param {string} i            numero de la ligne du tableau
     * @param {string} element_id   Supprimer disabled une checkbox ex. 'Map_nivellement_' 
     * @returns nothing
     * 
     */

    let  var_element  = document.getElementById(element_id + i);
    var_element.removeAttribute('disabled');
    };

function recupIDLien(id_lien){
    /** Recupere la methode du tableau en cours
     * 
     * @param {string} id_lien  id de l element ex. Obs_terrestre_0
     * @return {string}         nom de la methode ex. gnss, terrestre ou nivellement
     * 
     */

    methode = id_lien.split('#')[1]; // Modifie variable global
    return methode;
    };

function changementMethode(){
    /** Passer onglet methode a un autre exemple du GNSS au terrestre et vice versa
     * 
     * @returns nothing
     * 
     */

    affiStationTbl(dico_mes, methode); // Affiche tbl de la methode choisi
    delteTBL('tblObs_' + methode);
    };

function delteTBL(tableID){
    /** Supprimer un tableau station / session ou observation
     * 
     * @param {string} tableID id du tableau ex. 'tblSt_terrestre' ou 'tblObs_terrestre'
     * @returns nothing
     * 
     */

    let id_tableID = document.getElementById(tableID);
    // Vider tbl 
    for (let compteur_row=id_tableID.rows.length -1; compteur_row != -1; compteur_row--){
        id_tableID.deleteRow(-1);
        };
    console.log('TBL ', id_tableID, ' vider' );
    }; 