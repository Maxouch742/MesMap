// Layer and source
levelling_source = new ol.source.Vector({
    wrapX: false
});
levelling_layer = new ol.layer.Vector({
    title: 'Nivellement',
    source: levelling_source,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#000000',  //couleur: noire
            width: 2,
            lineDash: [10,10],
        })
    })
});
map.addLayer(levelling_layer);

// Variables globales
levelling_create_button = true;
let levelling_draw, levelling_snap;
levelling_id = 1;
levelling_cheminement = {}

/*
// Permet de modifier les choses existantes dans le layer
const modify = new ol.interaction.Modify({
    source: levelling_source
});
map.addInteraction(modify);*/