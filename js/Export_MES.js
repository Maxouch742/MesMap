//--------------- Export fichier observation .MES / .mes -----------------

function export_MES(dico_mes){
    /** Export en format MES selon format LTOP
     * 
     * @param {object} dico_mes objet des obersvations de points
     * @returns txt
     * 
     */

    let text = "$$ME Observation - Preanalyse \n";

    // ------------------ Partie terrestre ------------------ 
    let count_terrestre = dico_mes['terrestre']['features'].length; // Nbr de station
    if (count_terrestre > 0){
        for (let i=0; i < count_terrestre; i++){ // Pour chaque station
            let numSta = dico_mes['terrestre']['features'][i]['properties']['num'];
            if (typeof(dico_mes['terrestre']['features'][i]['properties']['visee']) === 'object'){

            
            let countObs = dico_mes['terrestre']['features'][i]['properties']['visee']['features'].length; // Nbr obs par station
            text += 'ST' + numSta + "\n";
            for (let k=0; k <countObs; k++){
                if(dico_mes['terrestre']['features'][i]['properties']['visee']['features'][k]['properties']['DS'] == 0 ){
                    let type = 'DS';    
                    let num = dico_mes['terrestre']['features'][i]['properties']['visee']['features'][k]['properties']['num'] ;
                    let espace1 = ' ';
                    for (let j = num.length;j<10-1;j++){
                        espace1 += ' ';
                        };
                    text += type + num + espace1 + '                 0.00000'+ "\n" ;                   
                };
                if(dico_mes['terrestre']['features'][i]['properties']['visee']['features'][k]['properties']['ZD'] == 0 ){
                    let type = 'ZD';
                    let num = dico_mes['terrestre']['features'][i]['properties']['visee']['features'][k]['properties']['num'] ;
                    let espace1 = ' ';
                    for (let j = num.length;j<10-1;j++){
                        espace1 += ' ';
                    };
                    text += type + num + espace1 + '                 0.00000'+ "\n";
                };
                if(dico_mes['terrestre']['features'][i]['properties']['visee']['features'][k]['properties']['RI'] == 0 ){
                    let type = 'RI';
                    let num = dico_mes['terrestre']['features'][i]['properties']['visee']['features'][k]['properties']['num']; 
                    let espace1 = ' ';
                    for (let j = num.length;j<10-1;j++){
                        espace1 += ' ';
                        };
                    text += type + num + espace1 + '                 0.00000'+ "\n";
                }; };           
        };};};

    // ------------------ Partie GNSS ------------------ 
    let countSession = dico_mes['gnss']['features'].length; // Nbr de session
    if (countSession > 0){
        for (let i=0; i < countSession; i++){ // Pour chaque session
            if (typeof(dico_mes['gnss']['features'][i]['properties']['visee']) === 'object'){
            let numSess = dico_mes['gnss']['features'][i]['properties']['num'];
            let countObs = dico_mes['gnss']['features'][i]['properties']['visee']['features'].length; // Nbr obs par session
            text += 'SL' + numSess + "\n";
            for (let k=0; k <countObs; k++){
                if(dico_mes['gnss']['features'][i]['properties']['visee']['features'][k]['properties']['LX'] == 0 ){
                    let type = 'LX';
                    let num = dico_mes['gnss']['features'][i]['properties']['visee']['features'][k]['properties']['num']; 
                    let espace1 = ' ';
                    for (let j = num.length;j<10-1;j++){
                        espace1 += ' ';
                        }
                    text += type + num + espace1 + '                 0.00000'+ "\n";
                };
                if(dico_mes['gnss']['features'][i]['properties']['visee']['features'][k]['properties']['LY'] == 0 ){
                    let type = 'LY';
                    let num = dico_mes['gnss']['features'][i]['properties']['visee']['features'][k]['properties']['num']; 
                    let espace1 = ' ';
                    for (let j = num.length;j<10-1;j++){
                        espace1 += ' ';
                        }
                    text += type + num + espace1 + '                 0.00000'+ "\n";
                };
                if(dico_mes['gnss']['features'][i]['properties']['visee']['features'][k]['properties']['LH'] == 0 ){
                    let type = 'LH';
                    let num = dico_mes['gnss']['features'][i]['properties']['visee']['features'][k]['properties']['num']; 
                    let espace1 = ' ';
                    for (let j = num.length;j<10-1;j++){
                        espace1 += ' ';
                        }
                    text += type + num + espace1 + '                 0.00000'+ "\n";
                };         
            };};};};

     // ------------------ Partie Nivellement ------------------ 
     let countNivellement = dico_mes['nivellement']['features'].length; // Nbr de station
     if (countNivellement > 0){
         for (let i=0; i < countNivellement; i++){ // Pour chaque session
            if (typeof(dico_mes['nivellement']['features'][i]['properties']['visee']) === 'object'){
             let numSess = dico_mes['nivellement']['features'][i]['properties']['num'];
             let countObs = dico_mes['nivellement']['features'][i]['properties']['visee']['features'].length; // Nbr obs par session
             text += 'ST' + numSess + "\n";
             for (let k=0; k <countObs; k++){
                 if(dico_mes['nivellement']['features'][i]['properties']['visee']['features'][k]['properties']['DH'] == 0 ){
                     let type = 'DH';
                     let num = dico_mes['nivellement']['features'][i]['properties']['visee']['features'][k]['properties']['num']; 
                     let espace1 = ' ';
                     for (let j = num.length;j<10-1;j++){
                         espace1 += ' ';
                     }
                     text += type + num + espace1 + '                 0.00000'+ "\n";
                 };
        };};};};
    
     // ------------------ Ecriture fichier ------------------ 
    let filename = "OBSERVATION.mes";
    let blob = new Blob([text], {type:'text/plain'});
    let link = document.createElement("a");
    link.download = filename;
    //link.innerHTML = "Download File";
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
    }, 100);
};