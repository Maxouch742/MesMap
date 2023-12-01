function MES_export(){

    // Date
    const date = new Date();
    let currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let currentHour = `${date.getHours()}h${date.getMinutes()}min${date.getSeconds()}`;

    // Création du contenu du fichier
    let text = `$$ME Preanalyse -- Exporté le ${currentDate} à ${currentHour}\n`;

    //--- Nivellement
    console.log(cheminement);
    if (cheminement != {}){
        text += "**------- NIVELLEMENT -------**\n"
        for (const [key, value] of Object.entries(cheminement)){
            // Ligne de commentaire avec le nom du cheminement 
            text += `*** ${key}\n`;
            
            // Ajout des dénivelées
            for (let i=0; i<value.length; i++){
                const denivelee = value[i];

                let visee = denivelee['visee']
                if (visee.length > 10){
                    visee = visee.substring(0, 10);
                }
                else if (visee.length < 10){
                    for (let j=visee.length; j<11; j++){
                        visee += ' ';
                    }
                }

                const sigma = denivelee['distance']/1000.0 * denivelee['sigma'];

                text += `ST${denivelee['station']}\n`;
                text += `DH${visee}                  0.0000 ${sigma.toFixed(2)}\n`; 
            }
        }
    }

    //---- GNSS
    if (gnss_cheminement != {}){
        text += "**------- GNSS -------**\n"
        for (const [key, value] of Object.entries(gnss_cheminement)){
            // Ligne de commentaire avec le nom de la session
            let id = key;
            
            text += `*** ${key}\n`;
            // Création du nom de la session
            if (id.length > 10){
                id = id.substring(0, 10);
            } else if (id.length < 10){
                for (let i=id.length; i<11; i++){
                    id += ' ';
                }
            }
            text += `SL${id}         ${value['parameter']}\n`;
            
            // Ajout des observations
            for (let i=0; i<value['observation'].length; i++){
                const point = value['observation'][i];
                let point_id = point['point'];

                // Création du nom de point pour l'identifiant
                if (point_id.length > 10){
                    point_id = point_id.substring(0, 10);
                } else if (point_id.length < 10){
                    for (let i=point_id.length; i<11; i++){
                        point_id += ' ';
                    }
                }

                // Ajout des observations
                text += `LY${point_id}      ${point['LY']}${point['sigma_Y']}\n`;
                text += `LX${point_id}      ${point['LY']}${point['sigma_X']}\n`;
                text += `LH${point_id}      ${point['LH']}${point['sigma_H']}\n`;
   
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