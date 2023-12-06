function MES_export(){

    // Date
    const date = new Date();
    let currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let currentHour = `${date.getHours()}h${date.getMinutes()}min${date.getSeconds()}`;

    // Création du contenu du fichier
    let text = `$$ME Preanalyse -- Exporté le ${currentDate} à ${currentHour}\n`;

    //--- Nivellement
    console.log('levelling_cheminement', levelling_cheminement);
    if (Object.keys(levelling_cheminement).length != 0){
        text += "**------- NIVELLEMENT -------\n"
        for (const [key, value] of Object.entries(levelling_cheminement)){
            // Ligne de commentaire avec le nom du cheminement 
            text += `**---- ${key}\n`;
            
            // Ajout des dénivelées
            for (let i=0; i<value.length; i++){
                const denivelee = value[i];

                const station = createString_right(denivelee['station']);
                const visee = createString_right(denivelee['visee'], 10);
                const sigma = denivelee['distance']/1000.0 * denivelee['sigma'];

                text += `ST${station}\n`;
                text += `DH${visee}                  0.0000 ${sigma.toFixed(2)}\n`; 
            }
        }
    }

    //---- GNSS
    if (Object.keys(gnss_cheminement).length != 0){
        text += "**------- GNSS -------\n"
        for (const [key, value] of Object.entries(gnss_cheminement)){
            // Ligne de commentaire avec le nom de la session
            text += `*** ${key}\n`;

            // Création du nom de la session
            const id = createString_right(key, 10);
            text += `SL${id}                             ${value['parameter']}\n`;
            
            // Ajout des observations
            for (let i=0; i<value['observation'].length; i++){
                const point = value['observation'][i];
                const point_id = createString_right(point['point'], 10);
                
                //TODO
                //const point_y = createNumber_left(point['LY'], 12);
                //const point_x = createNumber_left(point['LX'], 12);
                //const point_h = createNumber_left(point['LH'], 12);
                //const point_y_sigma = createNumber_left(point['sigma_Y'], 5, 2);
                //const point_x_sigma = createNumber_left(point['sigma_X'], 5, 2);
                //const point_h_sigma = createNumber_left(point['sigma_H'], 5, 2);

                // Ajout des observations
                text += `LY${point_id}                  0.0000 ${point['sigma_Y'].toFixed(2)}\n`; 
                text += `LX${point_id}                  0.0000 ${point['sigma_X'].toFixed(2)}\n`;  
                text += `LH${point_id}                  0.0000 ${point['sigma_H'].toFixed(2)}\n`; 
   
            }
        }
    }


    // Générer le fichier
    let filename = `preanalyse_${currentDate}_${currentHour}.mes`;
    let blob = new Blob([text], {type:'text/plain'});
    let link = document.createElement("a");
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
    }, 100);
}