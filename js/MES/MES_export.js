function MES_export(){

    // Date
    const date = new Date();
    let currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let currentHour = `${date.getHours()}h${date.getMinutes()}min${date.getSeconds()}`;

    // Création du contenu du fichier
    let text = `$$ME Preanalyse -- Exporté le ${currentDate} à ${currentHour}\n`;

    //--- Nivellement
    text += "******* NIVELLEMENT\n"
    console.log(cheminement);
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