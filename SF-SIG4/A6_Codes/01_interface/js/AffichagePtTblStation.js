//--------------- Affichage tableau station / session -----------------

function addligneSt(u, methode_type){
    /** Ajouter une ligne a la fin du tableau station / session
     * 
     * @param {number} u        longueur du tableau station / session 
     * @param {string} methode_type  nom de la methode  
     * @returns nothing
     * 
     */

    let tableID = document.getElementById('tblSt_' + methode_type);
    
    let tr = document.createElement('tr'); // Ajouter une ligne au tableau 
    if (methode_type === 'terrestre' | methode_type === 'nivellement'){
        // Ajouter un menu deroulant pour numero station 
        let td = document.createElement('td'); // Ajouter une cellule
        let select_0 = document.createElement("select");
        select_0.id = 'St_' + methode_type + '_' + u;
        select_0.name = 'numSt_' + u;
        select_0.className = 'select';
        select_0.onclick = function(){recoverStation(points_global, this)};
        td.classList.add('row_ligne');
        td.appendChild(select_0);
        tr.appendChild(td);
    };

    if (methode_type === 'gnss'){
        // Ne pas ajouter menu deroulant pour session GNSS mais numero session
        let td = document.createElement('td'); // Ajouter une cellule
        var nouveauTexte = document.createTextNode(u); // Num session commence a 
        console.log(u)
        td.classList.add('row_ligne');
        td.appendChild(nouveauTexte);
        tr.appendChild(td);

        // Condition indice doit etre < listColorSession.length si non a pas de couleur designer donc on recommence indice couleur a 0
        let indice = u;
        if (u > listColorSession.length){
            indice = indice - listColorSession.length;
        };
        tr.style.backgroundColor = listColorSession[indice];

        if (dico_mes['gnss']['features'][u] === undefined){
            // Ajoute a objet dico_mes objet de session vide 
            let st_pt = {'properties': {
                'num' : u ,
                'visee':'', // Mis '' --> Dans AfficahgeTbl condition
                'check': 0   
            }};
            dico_mes['gnss']['features'][u] = st_pt;    // Ajouter dico partiel dans un dico en fct indice  
        };
    };

    // Ajouter radio pour activer station / session
    let td2 = document.createElement('td');
    let radio = document.createElement("input");
    radio.type = 'radio';
    radio.name = 'flexRadioDefault';
    radio.id = 'Activate_' + methode_type + '_' + u;
    if(methode_type === 'terrestre' | methode_type === 'nivellement'){
        radio.disabled = 'disabled'; // Bouton radio inselectionnable
        }
    radio.onclick = function(){activateStation()};
    td2.appendChild(radio);
    td2.classList.add('row_ligne1');
    tr.appendChild(td2);
    
    // Ajout check pour activer sur la map la station
    let td4 = document.createElement('td');
    typ5 = addCheckboxlayer(u, methode_type);
    td4.appendChild(typ5);
    td4.classList.add('row_ligne1');
    tr.appendChild(td4);

    tr.addEventListener('click', function(){inittable()});
    tableID.appendChild(tr);
    };
    
function affiStationTbl(dico_mes, methode_type){
    /** Afficher le tableau des stations / sessions
     * 
     * @param {object} dico_mes  objet des observations
     * @returns nothing
     * 
     */

    delteTBL('tblSt_' +  methode_type);

    for (let i=0; i < dico_mes[methode_type]['features'].length; i ++ ){
        addligneSt(i, methode_type);

        if (methode_type === 'terrestre' | methode_type === 'nivellement'){
            let select_0 = document.getElementById("St_" + methode_type + '_' + i);
            // Affiche par defaut valeur pt dans liste deroulante 
            let option = document.createElement("option");
            option.text = dico_mes[methode_type]['features'][i]['properties']['num'];
            option.selected = true ;
            select_0.appendChild(option);
            deleteDisabled(i, 'Activate_' + methode_type + '_'); // Bouton radio inselectionnable --> Est selectionnable car a un numero predefini
            };
        
        check = dico_mes[methode_type]['features'][i]['properties']['check'];
        if (check === 0){
            typ5.checked = true 
            }
        else{
            typ5.checked = false 
            };
        deleteDisabled(i, 'Map_' + methode_type + '_' );

        };

    if (methode_type === 'terrestre' | methode_type === 'nivellement'){
        // Ajoute une ligne supll si terrestre 
        // Pas pour gnss car bouton "+ Session"
        addligneSt(document.getElementById("tblSt_" + methode_type).rows.length, methode_type);
    };};


