// Layer
ts_source = new ol.source.Vector({
    wrapX: false
});
ts_layer = new ol.layer.Vector({
    title: 'Total Station',
    source: ts_source,
    style: new ol.style.Style({
        image: new ol.style.RegularShape({
            stroke: new ol.style.Stroke({ 
                color: 'blue',
                width: 2,
            }),
            points: 3,
            radius: 20,
            angle: Math.PI / 3,
        }),
    })
});
map.addLayer(ts_layer);

// Variables globales
ts_create_button = true;
let ts_draw, ts_snap;
ts_id = 1;
ts_cheminement = {}

/*
// Permet de modifier les choses existantes dans le layer
const modify = new ol.interaction.Modify({
    source: levelling_source
});
map.addInteraction(modify);*/