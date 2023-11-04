// Layer and source
levelling_source = new ol.source.Vector({
    wrapX: false
});
levelling_layer = new ol.layer.Vector({
    title: 'Nivellement',
    source: levelling_source,
    style: {
        'stroke-color': '#000000',
        'stroke-width': 2,
        'stroke-lineDash': [10, 10],
    }
});
map.addLayer(levelling_layer);

// Variables globales
levelling_create_button = true;
let levelling_draw, levelling_snap;
levelling_id = 1;
cheminement = {}

/*
// Permet de modifier les choses existantes dans le layer
const modify = new ol.interaction.Modify({
    source: levelling_source
});
map.addInteraction(modify);*/