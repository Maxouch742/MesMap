/** Import du fichier de point (extension .KOO) selon format LTOP
 * 
 * 
 */

document.getElementById('importFileSelect_KOO').onchange = function(){

    /*TODO: 
    -------
    vérifier si le dico est vide. 
    S'il n'est pas vide:
    --> on le vide et on remplace ?
    --> on ajoute au dico déjà rempli ?
    */ 

   
    // Lecture du fichier
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function(progressEvent){    
       
        // Contenu du fichier ASCII
        const fileContentArray = this.result.split(/\r\n|\n/);

        // Parcours des lignes du fichier ASCII
        for(let i = 0; i < fileContentArray.length-1; i++){

            // On récupère la ligne en cours
            let line = fileContentArray[i];

            /* Si la ligne ne commence par une suite de caractère précis, on parse la ligne du point
               PK: coordonnées planes, altitudes sur le géoïde
               PE: coordonnées planes, altitudes sur l'ellipsoïde
            */
            if (line.slice(0,4) != "$$PK" && line.slice(0,4) != "$$PE" && line.slice(0,1) != ";" ){

                // Nom du point et controle
                const punkt = line.slice(0, 10).trim();
                if (punkt != ''){
                    
                    const type_pt = line.slice(10,14).trim();    // Type de point
                    const date_pt = line.slice(14,22).trim();    // Date du point
                    const ordre   = line.slice(23,26).trim();    // Ordre du point, canton
                    const carte   = line.slice(26,32).trim();    // Carte
                    
                    // Coordonnée y du point (axe Est) (selon LTOP, page 55 du manuel FR)
                    let y = NaN;
                    element = line.slice(32,44).trim();
                    if (element != ''){
                        y = Number(element);
                    };
        
                    // Coordonnée x du point (axe Nord) (selon LTOP, page 55 du manuel FR)
                    let x = NaN;
                    element = line.slice(44,56).trim();
                    if (element != ''){
                        x = Number(element);
                    };
        
                    // Provenance des coordonnées
                    let provYX = line.slice(56,60).trim();
        
                    // Altitude usuelle (ou orthométrique) (selon LTOP, page 55 du manuel FR)
                    let h = NaN;
                    element = line.slice(60,70).trim();
                    if (element != ''){
                        h = Number(element)
                    };
        
                    let provH = line.slice(70,74).trim();    // Provenance de l'altitude
                    let codeCoor = line.slice(74,76).trim(); // Code des coordonnées
                    
                    // Cote du geoide (valeur N)
                    let N = NaN;
                    element = line.slice(76,84).trim();
                    if (element != ''){
                        N = Number(element);
                    };
        
                    let provN = line.slice(84,88).trim();   // Provenance de la cote du geoide
                    let ellip = line.slice(88,90).trim();   // Code de l'ellipsoide 
                    
                    // Composante E-O déviation verticale
                    let eta = NaN;
                    element = line.slice(90,96).trim();
                    if (element != ''){
                        eta = Number(element);
                    };
        
                    // Composante N-S déviation verticale
                    let xi = NaN;
                    element = line.slice(96,102).trim();
                    if (element != ''){
                        xi = Number(element);
                    };
        
                    // Provenance de déviation de la verticale
                    let provEtaXi = line.slice(103,106).trim();
                    
                    // Déviation de la verticale ETA0 au niveau de la mer
                    let eta0 = NaN;
                    element = line.slice(106,112).trim();
                    if (element != ''){
                        eta0 = Number(element);
                    };
        
                    // Deviation de la verticale XI0 au niveau de la mer
                    let xi0 = NaN;
                    element = line.slice(112,118).trim();
                    if (element != ''){
                        xi0 = Number(element);
                    };
        
                    let provEta0Xi0 = line.slice(118,122).trim();     // Provenance déviation verticale au niveau de la mer
                    let raumtri = line.slice(122,126).trim();         // Code point pour RAUMTRI
                    let numCont = line.slice(126, 129).trim();        // Numérotation continue pour GPS-Software
                    let flag = line.slice(129,131).trim();            // Flag pour GPS
                    let numSessionGPS = line.slice(131, 135).trim();  // Numéro de session GNSS
                    let numZone = line.slice(135,138).trim();         // Numero de zone pour les projections Lambert ou Gauss-Krüger
                    let comm = line.slice(138.160).trim();            // Commentaires
                    
                    
                    point_temp = {
                        "type":"Feature",
                        "geometry":{
                            "type":"Point",
                            "coordinates":[y, x]
                        },
                        "properties":{
                            'id':punkt,
                            'type':type_pt,
                            'date':date_pt,
                            'ordre':ordre,
                            'carte':carte,
                            'prov_YX':provYX,    
                            'h':h,
                            'prov_H':provH,
                            'N':N,
                            'prov_N':provN,
                            'code_ellip':ellip,
                            'eta':eta,
                            'xi':xi,
                            'prov_EtaXi':provEtaXi,
                            'eta0':eta0,
                            'xi0':xi0,
                            'prov_Eta0Xi0':provEta0Xi0,
                            'RAUMTRI':raumtri,
                            'num_GPS_Software':numCont,
                            'flag_GPS':flag,
                            'num_session_GNSS':numSessionGPS,
                            'numZone':numZone,
                            'commentaire':comm
                        }
                    }
                    points_global["features"].push(point_temp);
                };
            };
        };
        displayPoints();
    };

    // Lecture du fichier
    reader.readAsText(file);
    };