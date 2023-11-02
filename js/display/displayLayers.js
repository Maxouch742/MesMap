function displayLayers(item){

    switch(item) {
        case 'points':
            if (document.getElementById('checkBoxPoints').checked === false){
                points_layer.setVisible(false);
            }
            else {
                points_layer.setVisible(true);
            }
            break;
    }

}