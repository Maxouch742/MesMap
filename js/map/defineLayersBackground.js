background_CN = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        projection: 'EPSG:2056',
        url: "https://wms.geo.admin.ch/",
        params: { 
            layers: "ch.swisstopo.pixelkarte-farbe" 
        },
        attributions: [
            "&copy; <a href=\"https://www.geo.admin.ch/fr/home.html\">WMTS CarteNationale / geo.admin.ch</a>"
        ]
    }),
    opacity: 0.2
});

// swissimage
swissimage = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: "https://wms.geo.admin.ch/",
        params: { 
            layers: "ch.swisstopo.swissimage" 
        },
        attributions: [
            "&copy; <a href=\"https://www.geo.admin.ch/fr/home.html\">WMTS swissimage / geo.admin.ch</a>"
        ]
    }),
    opacity: 0.5
});