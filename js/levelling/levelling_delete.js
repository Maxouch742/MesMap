function levelling_delete(row_html){

    // Supprimer le feature du layer
    const list_feature = levelling_source.getFeatures();
    list_feature.forEach(function (feature){
        if (feature.getId() === row_html.id){
            levelling_source.removeFeature(feature);
        }
    });

    // Supprimer la ligne du tableau
    list_row = document.getElementById('levelling_tbody').rows;
    for (let i=0; i<list_row.length; i++){
        const rowCheminement = list_row[i];
        if (rowCheminement.id === row_html.id){
            rowCheminement.parentNode.removeChild(rowCheminement);
        }
    }
}