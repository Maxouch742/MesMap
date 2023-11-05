function MES_export(){

    // Création du contenu du fichier
    let text = "$$ME Preanalyse \n"; //TODO: ajouter la date et l'heure de création du fichier

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

            const sigma = denivelee['distance']/1000.0 * 0.2;

            text += `ST${denivelee['station']}\n`;
            text += `DH${visee}                  0.0000 ${sigma.toFixed(2)}\n`; 
        }

    }


    // Générer le fichier
    let filename = "preanalyse.mes";
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