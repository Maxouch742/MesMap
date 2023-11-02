//--------------- Modifier la visibilite d une couche sur la map -----------------  
 
function changeLayerVisibilityDistances() {
    /** Changer la visibiliter de la couche des distances
     * 
     * @returns nothing
     * 
     */
    
    if (document.getElementById("checkboxDistances").checked === false) {
        distanceLayer.setVisible(false);
        };
    if (document.getElementById("checkboxDistances").checked === true) {
        distanceLayer.setVisible(true);
        }; 
};


function changeLayerVisibilityDirections() {
    /** Changer la visibiliter de la couche des directions
     * 
     * @returns nothing
     * 
     */
    if (document.getElementById("checkboxDirections").checked === false) {
        directionLayer.setVisible(false);
     };
    if (document.getElementById("checkboxDirections").checked === true) {
        directionLayer.setVisible(true);
        };
};


function changeLayerVisibilityPoint() {
    /** Changer la visibiliter de la couche des points
     * 
     * @returns nothing
     * 
     */
    if (document.getElementById("checkboxPoints").checked === false) {
        vectorPointsLayer.setVisible(false);
        };
    if (document.getElementById("checkboxPoints").checked === true) {
        vectorPointsLayer.setVisible(true);
        };
};

function changeLayerVisibilityGnss() {
    /** Changer la visibiliter de la couche des GNSS
     * 
     * @returns nothing
     * 
     */
    if (document.getElementById("checkboxGnss").checked === false) {
        gnssLayer.setVisible(false);
        };
    if (document.getElementById("checkboxGnss").checked === true) {
        gnssLayer.setVisible(true);
        }; 
};

function changeLayerVisibilityNivellement() {
    /** Changer la visibiliter de la couche des nivellements
     * 
     * @returns nothing
     * 
     */
    if (document.getElementById("checkboxNivellement").checked === false) {
        NivellementLayer.setVisible(false);
        };
    if (document.getElementById("checkboxNivellement").checked === true) {
        NivellementLayer.setVisible(true);
        };
};