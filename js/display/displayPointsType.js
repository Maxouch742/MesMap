function displayPointsType(item){

    const type = item.name;
    const type_color = item.value;
    const check = item.checked;

    // Savoir si on veut afficher ou non les types de points
    // (false: on veut désafficher / true: on veut afficher le point)
    if (check === false){

        // Parcourir la liste des points
        points_layer.getSource().getFeatures().forEach(function (feature){
            if (type === feature.getProperties().properties.date){
                feature.setStyle( undefined );
            }
        })
    }
    else if (check === true){

        // Parcourir la liste des points
        points_layer.getSource().getFeatures().forEach(function (feature){
            if (type === feature.getProperties().properties.date){
                feature.setStyle( new ol.style.Style({
                    text: new ol.style.Text({
                        text: feature.getProperties().name,
                        textAlign: "center",
                        textBaseline: "middle",
                        font: "bold 14px Calibri",
                        fill: new ol.style.Fill({
                            color: "#000000" //noir
                        }),
                        stroke: new ol.style.Stroke({
                            color: "#ffffff", //blanc
                            width: 3
                        }),
                        offsetX: 15.0,
                        offsetY: -10.0,
                        rotation: 0
                    }),
                    image: new ol.style.Circle({
                        radius: 6,
                        fill: new ol.style.Fill({
                            color: type_color,
                        }),
                        stroke: new ol.style.Stroke({
                            color: type_color,
                            width: 1,
                        }),
                    })
                }))
            }
        })
    }


}