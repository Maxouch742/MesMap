//--------------- Suppression station / session -----------------  

function colorActiveLine(num_ligne_sta, nom_tbl) {
    /** Modifier la couleur de la ligne selectionner du tableau observation ou station / session
     * 
     * @param {number} num_ligne_sta numero de la ligne selectionner du tableau
     * @param {string} nom_tbl nom du tableau ou on a selectionner la ligne   
     * @returns nothing
     * 
     */

    // Met la ligne selectionner en rouge
    let nbr_ligne_tbl = document.getElementById(nom_tbl).rows.length;
    for (let i = 0; i < nbr_ligne_tbl; i++ ){
        if (nom_tbl === 'tblSt_gnss'){
            // Tbl gnss session --> chaque ligne a une couleur differente en fonction d une liste predefinis
            document.getElementById(nom_tbl).getElementsByTagName('tr')[i].style.background = listColorSession[i];
            }
        else{
            document.getElementById(nom_tbl).getElementsByTagName('tr')[i].style.background = 'rgb(220,220,220)';
            };
        if (i == num_ligne_sta){
            document.getElementById(nom_tbl).getElementsByTagName('tr')[i].style.background = '#f00';            
            };
    };};
    
function inittable() {
    console.log('fct inittable')
    if (!(document.createElement && document.getElementsByTagName)) return;
    let nav = document.getElementById('tblSt_' + methode);
    let rows = nav.getElementsByTagName('tr');
    for (let i=0;i<rows .length;i++){
        console.log(rows[i])
        rows[i].onclick = TonmouseClickStation;
        };
};

window.onload = function() {
    inittable();
    };

function TonmouseClickStation(){
    /** Recupere la ligne selectionner du tableau des stations 
     * 
     * @returns nothing
     * 
     */

    
    // ce que tu doit faire quand on click sur une ligne du tableau
    tblStation = document.getElementById('tblSt_' + methode);
    tblStation.onclick=e=>{
        if (!e.target.matches('td')) return

        let eTD = e.target
        , eTR = eTD.parentNode;

        console.log(`Ligne= ${eTR.rowIndex}, colonne= ${eTD.cellIndex}, contenu= ${eTD.textContent}`); 
        num_ligne_sta = `${eTR.rowIndex}` -1; 
        colorActiveLine(num_ligne_sta, 'tblSt_' + methode);

        // Active bouton delete --> force uitlisateur a ne pas supprimer derniere ligne pour terrestre et nivellement
        if (methode === 'terrestre' | methode === 'nivellement' ){
            let temporaire = tblStation.rows.length - 1;
            if (num_ligne_sta === temporaire){
                document.getElementById('deleteSt_' + methode).disabled = 'disabled';       
                }
            else{
                document.getElementById('deleteSt_' + methode).removeAttribute('disabled');      
                };            
        };
        // Peut supprimer la dernier ligne de gnss
        if (methode === 'gnss'){
            document.getElementById('deleteSt_' + methode).removeAttribute('disabled') ; 
        };

        return num_ligne_sta
        };};



function deleteObsSta(){
    /** Suppression une station
     *  
     * @returns nothing
     * 
     */

    let long = dico_mes[methode]['features'].length ;
    delete dico_mes[methode]['features'][num_ligne_sta];
    numeroIndiceTbl(dico_mes, num_ligne_sta, long, methode) ;
    affiStationTbl(dico_mes, methode);

    // On redesactive le bouton delete (besoin de d abord cliquer sur une ligne pour activer bouton)
    document.getElementById('deleteSt_' + methode).disabled = 'disabled';

    // Suppresion des obs du tbl afficher --> suprimer station donc plus d'obs qui va avec  
    delteTBL('tblObs_' + methode);
    affichageVisee(dico_mes) ;   
    // affichCheckboxlayer(dico_mes)    // Mis a jour tbl checbox layer
    };

function numeroIndiceTbl(dico_mes, i, long, methode_type){
    /** Modifier les numeros indices de objet dico_mes pour observations
     * 
     * @param {object} dico_mes objet des observations
     * @param {number} i ligne du tableau station selectionner
     * @param {number} long longueur du tableau station
     * @returns nothing
     * 
     */

    // Renumerote les indices pour ne pas avoir un saut de la station supprimer
    for(i; i < dico_mes[methode_type]['features'].length -1 ;i++){
        dico_mes[methode_type]['features'][i] = dico_mes[methode_type]['features'][i + 1];
        if (methode_type === 'gnss'){
            // Mis a jour num session pour commencer a 0 à X
            dico_mes[methode_type]['features'][i]['properties']['num'] = i;
        }}
    // Supprime la derniere obs pour ne pas avoir a double
    delete dico_mes[methode_type]['features'][i];
    // on lui fixe une longueur de dico
    dico_mes[methode_type]['features'].length = long-1 ;
    };
