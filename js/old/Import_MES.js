// Création de l'objet qui contiendra tous les observations
dico_mes = {
    'terrestre':{
        'features': []
        },
    'gnss':{
        'features': []
        },
    'nivellement':{
        'features': []
        },    
}

methode ='terrestre' // Variable global

//--------------- IMPORTER UN FICHIER MES (APPEL LORSQUE CLIQUE SUR LE BOUTON)  ----------------- 
document.getElementById('importFileSelect_MES').onchange = function(){
     /** Import en format MES selon format LTOP
      * 
     */

    // Lecture du fichier
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function(progressEvent){  
        const fileContentArray = this.result.split(/\r\n|\n/);
        let index_ST_terrestre = -1; 
        let index_SL = -1; 
        let index_ST_nivellement = -1;
        
        for(let i = 0; i < fileContentArray.length-1; i++){

            let line = fileContentArray[i];
            let line1 = fileContentArray[i + 1]; // Differencier si nivellement ou terrestre en regardant ce qu on a comme obs dans la station

            if (line.slice(0,4) != "$$ME" && line.slice(0,4) != "$$ME" && line.slice(0,2) != "**" ){  // PK : Coordonnées planes, altitudes sur le géoïde

                // Nom du point et controle
                let typ = line.slice(0, 2).trim(); // DP, RI, ZD, DH, LX, LY, LH,...
                let punkt = line.slice(2, 10).trim(); // Num pt de obs

                let typ1 = line1.slice(0, 2).trim(); // Regarder si obs nivellement ou terrestre

                if (punkt != ''){
                    
                    if(typ === 'ST' | typ === 'SL'){
                        let points = {'properties':
                        {  'num' :punkt,
                            'visee': {'features':[]},
                            'check': 0,
                            }};

                        if (typ === 'ST'){
                            if (typ1 === 'DH'){
                                dico_mes['nivellement']['features'].push(points);
                                console.log('A cree une station nivellement')
                                index_ST_nivellement += 1 
                                };
                            if (typ1 === 'RI' | typ1 === 'ZD' | typ1 === 'DS'){                             
                                dico_mes['terrestre']['features'].push(points);
                                console.log('A cree une station terrestre');
                                index_ST_terrestre += 1; 
                                };
                            };

                        if (typ === 'SL'){
                            dico_mes['gnss']['features'].push(points);
                            console.log('A cree une station gnss');
                            index_SL += 1; 
                            };                           
                        };
                    
                    let var_temporaire = true; // Permet de soit creer une obs de station ou changer un element de obs

                    if(typ === 'RI' | typ === 'ZD' | typ === 'DS'){

                        for (let j = 0; j < dico_mes['terrestre']['features'][index_ST_terrestre]['properties']['visee']['features'].length;j++){                           
                            if (dico_mes['terrestre']['features'][index_ST_terrestre]['properties']['visee']['features'][j]['properties']['num'] === punkt){
                                console.log('A changer un element une obs');
                                if (typ === 'RI'){
                                    dico_mes['terrestre']['features'][index_ST_terrestre]['properties']['visee']['features'][j]['properties']['RI'] = 0 ;
                                    };
                                if (typ === 'ZD'){
                                    dico_mes['terrestre']['features'][index_ST_terrestre]['properties']['visee']['features'][j]['properties']['ZD'] = 0 ;
                                    };    
                                if (typ === 'DS'){
                                    dico_mes['terrestre']['features'][index_ST_terrestre]['properties']['visee']['features'][j]['properties']['DS'] = 0 ;
                                    };
                                var_temporaire = false;
                            }};
                        
                        if (var_temporaire === true){
                            let j = dico_mes['terrestre']['features'][index_ST_terrestre]['properties']['visee']['features'].length;
                            console.log('A cree une observation a une station');

                            let obs_pt =  {'properties':
                                        {
                                    'num' :punkt,
                                    'S' : '', 
                                    'RI': 1,
                                    'DS': 1,
                                    'ZD': 1
                                        }
                                    };

                            dico_mes['terrestre']['features'][index_ST_terrestre]['properties']['visee']['features'][j] = obs_pt

                            if (typ === 'RI'){
                                dico_mes['terrestre']['features'][index_ST_terrestre]['properties']['visee']['features'][j]['properties']['RI'] = 0; 
                                };

                            if (typ === 'ZD'){
                                dico_mes['terrestre']['features'][index_ST_terrestre]['properties']['visee']['features'][j]['properties']['ZD'] = 0 ;
                                };

                            if (typ === 'DS'){
                                dico_mes['terrestre']['features'][index_ST_terrestre]['properties']['visee']['features'][j]['properties']['DS'] = 0; 
                                };
                            }};


                    if(typ === 'LX' | typ === 'LY' | typ === 'LH'){

                        for (let j = 0; j < dico_mes['gnss']['features'][index_SL]['properties']['visee']['features'].length;j++){                           
                            
                            if (dico_mes['gnss']['features'][index_SL]['properties']['visee']['features'][j]['properties']['num'] === punkt){
                                console.log('A changer un element une obs');
                                if (typ === 'LX'){
                                    dico_mes['gnss']['features'][index_SL]['properties']['visee']['features'][j]['properties']['LX'] = 0 ;
                                    };
    
                                if (typ === 'LY'){
                                    dico_mes['gnss']['features'][index_SL]['properties']['visee']['features'][j]['properties']['LY'] = 0 ;
                                    };
    
                                if (typ === 'LH'){
                                    dico_mes['gnss']['features'][index_SL]['properties']['visee']['features'][j]['properties']['LH'] = 0 ;
                                    };
                                var_temporaire = false;
                            }};
                            
                        if (var_temporaire === true){
                            let j = dico_mes['gnss']['features'][index_SL]['properties']['visee']['features'].length
                            console.log('A cree une observation a une station gnss');

                            let obs_pt =  {'properties':
                                        {
                                    'num' :punkt,
                                    'LX': 1,
                                    'LY': 1,
                                    'LH': 1,
                                        }
                                    };
    
                            dico_mes['gnss']['features'][index_SL]['properties']['visee']['features'][j] = obs_pt;

                            if (typ === 'LX'){
                                dico_mes['gnss']['features'][index_SL]['properties']['visee']['features'][j]['properties']['LX'] = 0 ;
                                };

                            if (typ === 'LY'){
                                dico_mes['gnss']['features'][index_SL]['properties']['visee']['features'][j]['properties']['LY'] = 0; 
                                };

                            if (typ === 'LH'){
                                dico_mes['gnss']['features'][index_SL]['properties']['visee']['features'][j]['properties']['LH'] = 0; 
                                };
                            };};

                    if(typ === 'DH'){
                            
                        for (let j = 0; j < dico_mes['nivellement']['features'][index_ST_nivellement]['properties']['visee']['features'].length;j++){                           
                            
                            if (dico_mes['nivellement']['features'][index_ST_nivellement]['properties']['visee']['features'][j]['properties']['num'] === punkt){
                                console.log('A changer un element une obs');
                                if (typ === 'DH'){
                                    dico_mes['nivellement']['features'][index_ST_nivellement]['properties']['visee']['features'][j]['properties']['DH'] = 0 
                                    };
                                var_temporaire = false;
                            };};
                        
                        if (var_temporaire === true){
                            let j = dico_mes['nivellement']['features'][index_ST_nivellement]['properties']['visee']['features'].length
                            console.log('A cree une observation a une station');

                            let obs_pt =  {'properties':
                                        {
                                    'num' :punkt,
                                    'DH': 1,
                                        }
                                    };

                            dico_mes['nivellement']['features'][index_ST_nivellement]['properties']['visee']['features'][j] = obs_pt;

                            if (typ === 'DH'){
                                dico_mes['nivellement']['features'][index_ST_nivellement]['properties']['visee']['features'][j]['properties']['DH'] = 0 ;
                                };
                    };};};                   
                };
            };

    affiStationTbl(dico_mes, methode);
    affichageVisee(dico_mes);
    }
    reader.readAsText(file);
};
