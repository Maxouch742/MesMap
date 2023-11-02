//--------------- Style geometrie points -----------------

const style_points = function (feature) {
    /** Style point valider pour point ajouter manuellement par utilsiateur 
     *  
     * @param {object} feature    feature 
     * @returns {object} style du label point ajout manuellement
     * 
     */
    const style_label = new ol.style.Style({
            image: new ol.style.Icon({
                src: './img/icon_redTriangle.png',
                scale: '0.04',}),

            text: new ol.style.Text({
                text : feature.get('id'),
                textAlign: "center",
                textBaseline: "middle",
                font: "bold 17px Abadi",
                placement: 'point',
                fill: new ol.style.Fill({color: 'black'}),
                stroke: new ol.style.Stroke({color: 'black'}),
                offsetX: 20.0,
                offsetY: -10.0,
                rotation: 0
                }),            
        });
        return style_label
    };

const style_points_temp = function (feature) {
    /** Style point temporaire pour point ajouter manuellement par utilsiateur (point a pas ete valider par utilisateur)
     *  
     * @param {object} feature    feature vide
     * @returns {object} style du label point temporaire ajout manuellement
     * 
     */

    const style_label = new ol.style.Style({
            image: new ol.style.Icon({
                src: './img/redDot_icon.png',
                scale: '0.005',}),

            text: new ol.style.Text({
                text : feature.get('id'),
                textAlign: "center",
                textBaseline: "middle",
                font: "bold 14px Calibri",
                fill: new ol.style.Fill({
                color: "red"
                }),
                stroke: new ol.style.Stroke({
                color: "#ffffff", width: 3
                }),
                offsetX: 20.0,
                offsetY: -10.0,
                rotation: 0
                }),            
        });
        return style_label
};