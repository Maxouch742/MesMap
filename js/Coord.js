//--------------- Affichage coord sur map -----------------  

const mousePositionControl = new ol.control.MousePosition({
    projection: "EPSG:2056",
    coordinateFormat: ol.coordinate.createStringXY(2)
  });
map.addControl(mousePositionControl);

