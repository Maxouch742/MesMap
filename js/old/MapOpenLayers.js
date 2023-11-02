//--------------- Initialisation map avec les fond de la map  ----------------- 

// Projection suisse
const projection = new ol.proj.Projection({
    code: "EPSG:2056",
    units: "m"
});

// Fond WMTS CN a echelle dynamique
const carteNationale = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: "https://wms.geo.admin.ch/",
        params: { layers: "ch.swisstopo.pixelkarte-farbe" },
        attributions: ["&copy; <a href=\"https://www.geo.admin.ch/fr/home.html\">WMTS CarteNationale / geo.admin.ch</a>"]
    }),
    opacity: 0.5
});

// Fond SwissALTI3D relief multidirectionnel a echelle dynamique
const SwissSURFACE3D = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: "https://wms.geo.admin.ch/",
        params: { layers: "ch.swisstopo.swisssurface3d-reliefschattierung-multidirektional" },
        attributions: ["&copy; <a href=\"https://www.geo.admin.ch/fr/home.html\">WMTS Relief multidir. issu de SwissSURFACE3D / geo.admin.ch</a>"]
    }),
    opacity: 0.5
});

// MO noir et blanc
const MO_nb = new ol.layer.Tile({
    id: "background-layer",
    source: new ol.source.TileWMS({
        url: `https://geodienste.ch/db/av_0/fra?`,
        params: { 'LAYERS': 'LCSF,LCSFPROJ,Conduites,SOLI,SOSF,SOPT,Adresses_des_batiments,Nomenclature,Biens_fonds,Biens_fonds_projetes,Limites_territoriales', 'TILED': true },
        attributions: [ "Fond de plan &copy; <a href=\"https://geodienste.ch\">geodienste</a>" ],
    }),
    zIndex: -99,
    opacity: 0.5
});

// swissimage
const swissimage = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: "https://wms.geo.admin.ch/",
        params: { layers: "ch.swisstopo.swissimage" },
        attributions: ["&copy; <a href=\"https://www.geo.admin.ch/fr/home.html\">WMTS swissimage / geo.admin.ch</a>"]
    }),
    opacity: 0.5
});

// Ajout de la Map
map = new ol.Map({
    target: "map",
    layers: [carteNationale],
    // overlays: [popup],
    view: new ol.View({
        center: [2660000, 1190000], // c'est en suisse
        projection: projection,
        zoom: 8,
        extent: [232e4,93e4,30e5,145e4]}),
    // controls: ol.control.defaults.defaults({ "attribution": false }),

});
//     map.addControl(new ol.control.CanvasTitle({ 
//         title: '', 
//         visible: false,
//         style: new ol.style.Style({ text: new ol.style.Text({ font: '20px "Lucida Grande",Verdana,Geneva,Lucida,Arial,Helvetica,sans-serif'}) })
// map.addControl(new ol.control.CanvasAttribution({ canvas: true }));

// }));






