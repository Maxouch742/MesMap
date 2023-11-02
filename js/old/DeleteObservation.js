//--------------- Suppression une observation du tableau observation -----------------  

function inittableObs() {

    if (!(document.createElement && document.getElementsByTagName)) return;

    var nav = document.getElementById('tblObs_' + methode);
    var rows = nav.getElementsByTagName('tr');

    for (var i=0;i<rows .length;i++){
        rows[i].onclick = TonmouseClickObs;
        };
    };


function TonmouseClickObs(){
    /** Recuperation de la ligne selectionner et la mettre dans une autre couleur
     * 
     * @returns num_ligne_obs numero de la ligne selectionner
     * 
     */

    // ce qu on doit faire quand on click sur une ligne du tableau
    let tblObs = document.getElementById('tblObs_' + methode);

    tblObs.onclick=e=>{
        if (!e.target.matches('td')) return
    
        let eTD = e.target
        , eTR = eTD.parentNode;

        num_ligne_obs = `${eTR.rowIndex}` -1 ;
        colorActiveLine(num_ligne_obs, 'tblObs_' + methode);
        
        // Active bouton delete --> force uitlisateur a ne pas supprimer derniere ligne
        let temporaire = tblObs.rows.length - 1
        if (num_ligne_obs === temporaire){
            document.getElementById('deleteObs_' + methode).disabled = 'disabled';
            }

        else{
            document.getElementById('deleteObs_' + methode).removeAttribute('disabled'); 
            };

        return num_ligne_obs
    };};


function numeroIndiceTblObs(dico_mes, j, long, valeur, methode_type){
    /** Modifier les numeros indices de objet dico_mes pour observations
     * 
     * @param {object} dico_mes objet des observations
     * @param {number} j ligne du tableau observation selectionner
     * @param {number} long longueur du tableau observation
     * @param {string} valeur objet des observations
     * @param {string} methode_type nom de la methode 
     * 
     * @returns nothing
     * 
     */
    
    // Renumerote les indices pour ne pas avoir un saut de la station supprimer    
     for(j; j < dico_mes[methode_type]['features'][valeur]['properties']['visee']['features'].length -1 ;j++){       
        dico_mes[methode_type]['features'][valeur]['properties']['visee']['features'][j] = dico_mes[methode_type]['features'][valeur]['properties']['visee']['features'][j+1];
        };
    // Supprime la derniere obs pour ne pas avoir a double dans objet
    delete  dico_mes[methode_type]['features'][valeur]['properties']['visee']['features'][j];
    // on lui fixe une longueur de dico 
    dico_mes[methode_type]['features'][valeur]['properties']['visee']['features'].length = long-1; 
    };

function deleteObs(){
    /** Suppression observation dans objet dico_mes 
     * 
     * @returns nothing
     * 
     */

    let valeur = iactivateRadio()
    let valeur_i = valeur.split('_')[2]
    let longVis = dico_mes[methode]['features'][valeur_i]['properties']['visee']['features'].length; 
    delete dico_mes[methode]['features'][valeur_i]['properties']['visee']['features'][num_ligne_obs];

    numeroIndiceTblObs(dico_mes, num_ligne_obs, longVis, valeur_i, methode); 
    afficheTblObs(dico_mes, valeur, methode);

    document.getElementById('deleteObs_' + methode).disabled = 'disabled';
    affichageVisee(dico_mes);
    };