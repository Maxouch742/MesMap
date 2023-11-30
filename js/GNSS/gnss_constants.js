// Layer
gnss_source = new ol.source.Vector({
    wrapX: false
});
gnss_layer = new ol.layer.Vector({
    title: 'GNSS',
    source: gnss_source,
    style: new ol.style.Style({
        image: new ol.style.RegularShape({
            stroke: new ol.style.Stroke({ 
                color: 'black',
                width: 2,
            }),
            points: 4,
            radius: 20,
            angle: Math.PI / 4,
        }),
    })
});
map.addLayer(gnss_layer);

// Variables globales
gnss_create_button = true;
let gnss_draw, gnss_snap;
gnss_id = 1;
gnss_cheminement = {}

/*
// Permet de modifier les choses existantes dans le layer
const modify = new ol.interaction.Modify({
    source: levelling_source
});
map.addInteraction(modify);*/