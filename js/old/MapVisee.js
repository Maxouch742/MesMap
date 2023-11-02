//--------------- Affichage visee -----------------

let distanceLayer = new ol.layer.Vector({});
let directionLayer = new ol.layer.Vector({});
let gnssLayer = new ol.layer.Vector({});
let NivellementLayer = new ol.layer.Vector({});

listColorSession = ["#FF7C3F", "#00CEF7", "#3FFF67", "#6900F7", "#F700F6", "#F7F300", "#FFF33F", "#FF3FF0", "#FFC23F"];
Listradius = [0.10,0.13,0.16,0.19,0.22,0.25,0.28,0.31,0.33];
compteur_GNSS = 0
function affichageDistance(dico_mes){
    /** Creation layer distances
     * 
     * @param {object} dico_mes objet des obersvations de points
     * @returns nothing
     * 
     */

    // Supprime l'affichage pour la renitialiser    
    map.removeLayer(distanceLayer);

    // Recuperer noSta et noPt
    noPointsDistances = [];

    for (let i = 0; i < dico_mes['terrestre']['features'].length; i++){
        if (dico_mes['terrestre']['features'][i]['properties']['check'] === 0){
            let noSta = dico_mes['terrestre']['features'][i]['properties']['num'];
            
            if(typeof dico_mes['terrestre']['features'][i]['properties']['visee'] === 'object'){
                for (j = 0; j < dico_mes['terrestre']['features'][i]['properties']['visee']['features'].length; j++){
                    let obsType = dico_mes['terrestre']['features'][i]['properties']['visee']['features'][j]['properties']['DS'];
                    if (obsType === 0){
                        let noVis = dico_mes['terrestre']['features'][i]['properties']['visee']['features'][j]['properties']['num'];
                        if (dico_mes['terrestre']['features'][i]['properties']['visee']['features'][j]['properties']['RI'] === 0 ) {
                            RI = 0;// A une direction
                        }
                        else{
                            RI = 1;
                        };
                        noPointsDistances.push([noSta,noVis,RI]);   
                    };   
                };
            };
        };

    };

    // Récupérer les coord des St et Vis [E1,N1,E2,N2] - distances --> dans points_global
    geometryDistances = [];
    for (let i = 0; i < noPointsDistances.length; i++) {
        let noSt = noPointsDistances[i][0];
        let noVis = noPointsDistances[i][1];
        for (let k = 0; k < points_global['features'].length; k++){
            if (points_global['features'][k]['properties']['id'] === noSt){
                E_St = points_global['features'][k]['geometry']['coordinates'][0];
                N_St = points_global['features'][k]['geometry']['coordinates'][1];

                for (let j = 0; j < points_global['features'].length; j++){
                    if (points_global['features'][j]['properties']['id'] === noVis){
                        E_Vis = points_global['features'][j]['geometry']['coordinates'][0];
                        N_Vis = points_global['features'][j]['geometry']['coordinates'][1];
                    } ;
                };
            geometryDistances.push([E_St, N_St, E_Vis, N_Vis]);
            };
        };
    };
    
    // Création du layer distance
    distanceLayer = new ol.layer.Vector({});
  
    // création et ajout des lignes de distances sur la map - distances
    distanceLineSource = new ol.source.Vector({});

    for (let i = 0; i < geometryDistances.length; i++) {
        let coordArray_i = [[ geometryDistances[i][0], geometryDistances[i][1]] ,
                            [ geometryDistances[i][2], geometryDistances[i][3]] ];

        // calculs pour faire figurer les traits épais de 10% à 30% du vecteur
        let dE_inf = (coordArray_i[1][0] - coordArray_i[0][0])*0.1;
        let dE_sup = (coordArray_i[1][0] - coordArray_i[0][0])*0.2;
        let dN_inf = (coordArray_i[1][1] - coordArray_i[0][1])*0.1;
        let dN_sup = (coordArray_i[1][1] - coordArray_i[0][1])*0.2;
        let coordArray_i_epais = [ [dE_inf+coordArray_i[0][0] , dN_inf+coordArray_i[0][1]] ,
                                [dE_sup+coordArray_i[0][0] , dN_sup+coordArray_i[0][1]] ];
                                                        
        // Création de la feature pour la symbologie de distance
        featureDistanceEpais = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i_epais),
        });

        featureDistanceEpais.setStyle( new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '#000000', width: 5, lineCap: "square" })
            }));
        
        featureDistance = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i),
            });
  
        distanceStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '#000000', width: 2, opacity:'0', lineCap: "square" })
            });

        featureDistance.setStyle(distanceStyle);

        distanceLineSource.addFeature(featureDistance);
        distanceLineSource.addFeature(featureDistanceEpais);
        
        distanceLayer.setSource(distanceLineSource);
    }
    map.addLayer(distanceLayer);
    changeLayerVisibilityDistances();
    console.log("Distances have been added to map");
};

function affichageDirection(dico_mes){
    /** Creation layer direction
     * 
     * @param {object} dico_mes objet des obersvations de points
     * @returns nothing
     * 
     */
    // ----------------------------------   Direction ------------------------------------------------
    map.removeLayer(directionLayer);
    // Recuperer noSta et noPt
    noPointsDirection = [];
    for (let i = 0; i < dico_mes['terrestre']['features'].length; i++){
        if (dico_mes['terrestre']['features'][i]['properties']['check'] === 0){
            let noSta = dico_mes['terrestre']['features'][i]['properties']['num'];
            if(typeof dico_mes['terrestre']['features'][i]['properties']['visee'] === 'object'){ // CTRL qu on est pas dans une station avec aucune obs
                for (let j = 0; j < dico_mes['terrestre']['features'][i]['properties']['visee']['features'].length; j++){
                    obsType =dico_mes['terrestre']['features'][i]['properties']['visee']['features'][j]['properties']['RI'];
                    if (obsType === 0){
                        let noVis = dico_mes['terrestre']['features'][i]['properties']['visee']['features'][j]['properties']['num']  ;
                        noPointsDirection.push([noSta,noVis]);   
                    };   
                };
            };
        };
    };

    // Récupérer les coord des St et Vis [E1,N1,E2,N2] - distances --> dans points_global
    geometryDirections = [];
    for (let i = 0; i < noPointsDirection.length; i++) {
        noSt = noPointsDirection[i][0];
        noVis = noPointsDirection[i][1];
        for (let k = 0; k < points_global['features'].length; k++){
            if (points_global['features'][k]['properties']['id'] === noSt){
                E_St = points_global['features'][k]['geometry']['coordinates'][0];
                N_St = points_global['features'][k]['geometry']['coordinates'][1];

                for (j = 0; j < points_global['features'].length; j++){
                    if (points_global['features'][j]['properties']['id'] === noVis){
                        E_Vis = points_global['features'][j]['geometry']['coordinates'][0];
                        N_Vis = points_global['features'][j]['geometry']['coordinates'][1];
                    } ;
                };
                geometryDirections.push([E_St, N_St, E_Vis, N_Vis]);
            };
        };
    };
    // Création du layer distance
    directionLayer = new ol.layer.Vector({});
  
    // création et ajout des lignes de distances sur la map - distances
    directionLineSource = new ol.source.Vector({});

    for (let i = 0; i < geometryDirections.length; i++) {
        let coordArray_i = [[ geometryDirections[i][0], geometryDirections[i][1]] ,
                            [ geometryDirections[i][2], geometryDirections[i][3]] ];


        // Calculs pour faire figurer les traits pleins jusqu'à 70% de la visée
        let dE_sup = (coordArray_i[1][0] - coordArray_i[0][0])*0.7;
        let dN_sup = (coordArray_i[1][1] - coordArray_i[0][1])*0.7;
        let coordArray_i_plein = [ [dE_sup+coordArray_i[0][0],dN_sup+coordArray_i[0][1]] ,
                                [coordArray_i[0][0],coordArray_i[0][1]] ];

        // Création de la feature pour la symbologie de direction (trait plein)
        featureDirPlein = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i_plein),
        });

        featureDirPlein.setStyle( new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '##000000', width: 2 })
        }));

        // Ajout des features
        featureDirection = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i),
        });

        directionStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '#000000', width: 2, lineDash: [15,7]})
        });

        featureDirection.setStyle(directionStyle);
        directionLineSource.addFeature(featureDirection);
        directionLineSource.addFeature(featureDirPlein);
        directionLayer.setSource(directionLineSource);
    };
    map.addLayer(directionLayer);
    changeLayerVisibilityDirections();
    console.log("Direction have been added to map");
    };

function affichageGNSS(dico_mes){
    /** Creation layer gnss
     * 
     * @param {object} dico_mes objet des obersvations de points
     * @returns nothing
     * 
     */

    // ----------------------------------   GNSSection ------------------------------------------------
    map.removeLayer(gnssLayer);
    // Recuperer noSta et noPt
    noPointsGnss = [];
    listSession = [];
    for (let i = 0; i < dico_mes['gnss']['features'].length; i++){
        if (dico_mes['gnss']['features'][i]['properties']['check'] === 0){
            let noSession = dico_mes['gnss']['features'][i]['properties']['num'];
            if(typeof dico_mes['gnss']['features'][i]['properties']['visee'] === 'object'){ // CTRL qu on est pas dans une station avec aucune obs
                for (let j = 0; j < dico_mes['gnss']['features'][i]['properties']['visee']['features'].length; j++){
                    obsType0 =dico_mes['gnss']['features'][i]['properties']['visee']['features'][j]['properties']['LX'];
                    obsType1 =dico_mes['gnss']['features'][i]['properties']['visee']['features'][j]['properties']['LY'];
                    obsType2 =dico_mes['gnss']['features'][i]['properties']['visee']['features'][j]['properties']['LH'];
                    
                    if (obsType0 === 0 | obsType1 === 0 | obsType2 === 0){
                        let noPts = dico_mes['gnss']['features'][i]['properties']['visee']['features'][j]['properties']['num'];  
                        noPointsGnss.push([noSession,noPts]); 

                        // Ajoute noSession dans liste si elle est pas deja presente
                        if (listSession.includes(noSession) === false){
                            listSession.push(noSession);
                        }
                    };
                };
            };
        };
    };

    // Récupérer les coord des St et Vis [E1,N1,E2,N2] - distances --> dans points_global
    geometryGnss = [];
    
    for (let i = 0; i < noPointsGnss.length; i++) {
        noSession = noPointsGnss[i][0];
        noPts = noPointsGnss[i][1];

        for (let j = 0; j < points_global['features'].length; j++){
            if (points_global['features'][j]['properties']['id'] === noPts){
                E_Pt = points_global['features'][j]['geometry']['coordinates'][0];
                N_Pt = points_global['features'][j]['geometry']['coordinates'][1];
            };
        };
        geometryGnss.push([E_Pt, N_Pt]);
    };
            
    // Création du layer distance
    gnssLayer = new ol.layer.Vector({});

    // création et ajout des lignes de distances sur la map - distances
    gnssPtSource = new ol.source.Vector({});
    let indice = 0;
    for (let i = 0; i < noPointsGnss.length; i++) {
        let coordArray_i = [ geometryGnss[i][0], geometryGnss[i][1]];
        let num_sess = noPointsGnss[i][0];
        for (let k = 0; k < listSession.length; k++){
            if (listSession[k] === num_sess){
                indice = num_sess  // k -1 pour commencer a 0 (Rapel : num Session commence a 0, mais cliste couleur comme a 0)
                // Condition indice doit etre < listColorSession.length si non a pas de couleur designer
                if (indice > listColorSession.length){
                    console.log('depasser liste couleur gnss');
                    indice = indice - listColorSession.length;
                };
            };
        };
        // Création d'une Feature ol pour chaque point de la session GNSS et ajout à la source
        featurePointGnss = new ol.Feature({
            geometry: new ol.geom.Point(coordArray_i),
        });
        gnssStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                src: './img/Pentagon_blanc.png',
                scale: Listradius[indice],
                color: listColorSession[indice],
            })),
        });
        featurePointGnss.setStyle(gnssStyle);
        gnssPtSource.addFeature(featurePointGnss);
        gnssLayer.setSource(gnssPtSource);
    }
        
    map.addLayer(gnssLayer);
    changeLayerVisibilityGnss();
    console.log("Gnss have been added to map");
    };


function affichageNivellement(dico_mes){
    /** Creation layer nivellement 
     * 
     * @param {object} dico_mes objet des obersvations de points
     * @returns nothing
     * 
     */

    // ----------------------------------   Nivellement ------------------------------------------------
    map.removeLayer(NivellementLayer);
    // Recuperer noSta et noPt
    noPointsNiv = [];
    for (let i = 0; i < dico_mes['nivellement']['features'].length; i++){
        if (dico_mes['nivellement']['features'][i]['properties']['check'] === 0){
            // Recupere noStaVis si il y a des visee dans la station
            if (typeof(dico_mes['nivellement']['features'][i]['properties']['visee']) === 'object'){
                let noSta = dico_mes['nivellement']['features'][i]['properties']['num'];
                for (let j = 0; j < dico_mes['nivellement']['features'][i]['properties']['visee']['features'].length; j++){
                    let noVis = dico_mes['nivellement']['features'][i]['properties']['visee']['features'][j]['properties']['num'];
                    noPointsNiv.push([noSta,noVis]);  
                };
            };
        };
    };

    // Récupérer les coord des St et Vis [E1,N1,E2,N2] - distances --> dans points_global
    geometryNivellement = [];
    for (let i = 0; i < noPointsNiv.length; i++) {
        noSta = noPointsNiv[i][0];
        noVis = noPointsNiv[i][1];
        for (k = 0; k < points_global['features'].length; k++){
            if (points_global['features'][k]['properties']['id'] === noSta){
                E_St = points_global['features'][k]['geometry']['coordinates'][0];
                N_St = points_global['features'][k]['geometry']['coordinates'][1];

                for (let j = 0; j < points_global['features'].length; j++){
                    if (points_global['features'][j]['properties']['id'] === noVis){
                        E_Vis = points_global['features'][j]['geometry']['coordinates'][0];
                        N_Vis = points_global['features'][j]['geometry']['coordinates'][1];
                    }; 
                };
                geometryNivellement.push([E_St, N_St, E_Vis, N_Vis]);
            };
        };
    };

    // Création du layer distance
    NivellementLayer = new ol.layer.Vector({});
  
    // création et ajout des lignes de distances sur la map - distances
    NivellementLineSource = new ol.source.Vector({});

    for (i = 0; i < geometryNivellement.length; i++) {
        let coordArray_i = [[ geometryNivellement[i][0], geometryNivellement[i][1]] ,
                            [ geometryNivellement[i][2], geometryNivellement[i][3]] ];

        // Création de la feature pour la symbologie de direction (trait plein)
        featureNiv = new ol.Feature({
            geometry: new ol.geom.LineString(coordArray_i),
        });

        featureNivStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '#FF7C3F', width: 2 })
            }); 
      
        featureNiv.setStyle(featureNivStyle);
        NivellementLineSource.addFeature(featureNiv);
        NivellementLayer.setSource(NivellementLineSource);
    };
    map.addLayer(NivellementLayer);
    changeLayerVisibilityNivellement();
    console.log("Nivellement have been added to map");
    }

function affichageVisee(dico_mes){
    /** Affichages layer sur la map
     * 
     * @param {object} dico_mes objet des obersvations de points
     * @returns nothing
     * 
     */
    affichageDistance(dico_mes);
    affichageDirection(dico_mes);
    // Passer les points au dessus (ZIndex)
    distanceLayer.setZIndex(2);
    directionLayer.setZIndex(1);

    affichageGNSS(dico_mes);
    gnssLayer.setZIndex(3);

    affichageNivellement(dico_mes);
    NivellementLayer.setZIndex(4);
    };


