//--------------- Affichage tableau observation -----------------

function addligneObs(k, methode_type){
    /** Ajouter une ligne a la fin du tableau observation
     *  
     * @param {number} k                   longueur du tableau observation 
     * @param {string} methode_type        nom methode en cours 
     * 
     * @returns nothing
     * 
     */
    let tableID = document.getElementById('tblObs_' + methode_type);
    let tr = document.createElement('tr'); 
    
    let td = document.createElement('td');  
    let select_0 = document.createElement("select");
    select_0.id = 'Obs_' + methode_type  + '_' + k;
    select_0.name = 'numObs_'+ methode_type  + '_' +  + k;
    select_0.className = 'select';
    select_0.onclick = function(){recoverObs(points_global, this)};

    if (methode_type === 'terrestre' | methode_type === 'gnss'){
        td.classList.add('row_ligne');
        }
    if (methode_type === 'nivellement'){
        td.classList.add('row_ligne3');
        }
    td.appendChild(select_0);
    tr.appendChild(td);

    if (methode_type === 'terrestre' | methode_type === 'gnss'){
        let td3 = document.createElement('td');
        if (methode_type === 'terrestre'){
            typ0 = addcheckbox('RI', methode_type);
            }
        if (methode_type === 'gnss'){
            typ0 = addcheckbox('LX', methode_type);
            }
        td3.classList.add('row_ligne2');
        td3.appendChild(typ0);
        tr.appendChild(td3);
    
        let td4 = document.createElement('td');
        if (methode_type === 'terrestre'){
            typ1 = addcheckbox('DS', methode_type);
            }
        if (methode_type === 'gnss'){
            typ1 = addcheckbox('LY', methode_type);
         }
        td4.classList.add('row_ligne2');
        td4.appendChild(typ1);
        tr.appendChild(td4);
    
        let td5 = document.createElement('td');
        if (methode_type === 'terrestre'){
            typ2 = addcheckbox('ZD', methode_type);
            }
        if (methode_type === 'gnss'){
            typ2 = addcheckbox('LH', methode_type);
            }
        td5.classList.add('row_ligne2');
        td5.appendChild(typ2);
        tr.appendChild(td5);
    }

    // Ajouter un evenement -> les nouvelles ligne creer herite pas des evements. On doit leur assigner evenement
    // permet au clique sur ligne tbl recuperer indice du tbl 
    // https://www.pierre-giraud.com/javascript-apprendre-coder-cours/addeventlistener-gestion-evenement/
    tr.addEventListener('click', function(){inittableObs()});
    tableID.appendChild(tr);
    };

function afficheTblObs(dico_mes, valeur, methode_type){
    /** Afficher tableau observation
     * 
     * @param {object} dico_mes objet des observations
     * @param {string} valeur id ligne du tableau Station / Session dont radio activer ex. St_gnss_0
     * @param {string} methode_type nom methode en cours
     * 
     * @returns nothing
     * 
     */

    i = valeur.split('_')[2];
    delteTBL('tblObs_' + methode_type);             

    // Rentre dans condition si il y a qqch dans visee    
    if (dico_mes[methode_type]['features'][i]['properties']['visee'] !== ''){
        console.log('il y a qqch dans visee');
        for (let k = 0; k < dico_mes[methode_type]['features'][i]['properties']['visee']['features'].length; k++){
            addligneObs(k, methode_type);

            // Affiche par defaut valeur pt dans liste deroulante 
            let select_0 = document.getElementById("Obs_" + methode_type  + '_' + k);
            let option = document.createElement("option");
            option.text = dico_mes[methode_type]['features'][i]['properties']['visee']['features'][k]['properties']['num'];
            option.selected = true ;
            select_0.appendChild(option);

            if (methode_type === 'terrestre'){
                champ_0 = 'RI';
                champ_1 = 'DS';
                champ_2 = 'ZD';
                };

            if (methode_type === 'gnss'){
                champ_0 = 'LX';
                champ_1 = 'LY';
                champ_2 = 'LH';
                };

            if (methode_type === 'terrestre' | methode_type === 'gnss'){
                check = dico_mes[methode_type]['features'][i]['properties']['visee']['features'][k]['properties'][champ_0]
                if (check === 0){
                    typ0.checked = true; 
                    console.log(0);
                    }
                else{
                    typ0.checked = false; 
                    console.log(1);
                    };

                check = dico_mes[methode_type]['features'][i]['properties']['visee']['features'][k]['properties'][champ_1];
                if (check === 0){
                    typ1.checked = true ;
                    }
                else{
                    typ1.checked = false ;
                    };
    
                check = dico_mes[methode_type]['features'][i]['properties']['visee']['features'][k]['properties'][champ_2];
                if (check === 0){
                    typ2.checked = true ;
                    }
                else{
                    typ2.checked = false ;
                    };

                deleteDisabled(k, champ_0 + '_');
                deleteDisabled(k, champ_1 + '_');
                deleteDisabled(k, champ_2 + '_');
            };
            console.log('fin iteration', k);     
        };
        addligneObs(document.getElementById("tblObs_" + methode_type).rows.length, methode_type);        
    }
    
    else{
        // Cas si on a pas encore choisi observation (choisi que sation) 
        // Apres avoir choisi station et activier chekbox on voit la possibiliter select un point observation
        console.log('il y a rien dans la visee');
        let x = 0;
        addligneObs(x, methode_type);
    };
};