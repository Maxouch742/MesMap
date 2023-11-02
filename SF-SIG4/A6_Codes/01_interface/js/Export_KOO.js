//--------------- Export fichier coordonnee .KOO / .koo -----------------

// https://stackoverflow.com/questions/32326973/file-write-operation-in-javascript
function export_KOO(points_global){
    /** Export en format KOO selon format LTOP
     * 
     * @param {object} points_global objet des coordonnees de points
     * @returns file txt
     * 
     */

    let count = points_global['features'].length;
    let text = "$$PK Coordonnees - Preanalyse \n";
    for (i=0; i < count; i++){
        let num = points_global['features'][i]['properties']['id'];
        let y = points_global['features'][i]['geometry']['coordinates'][0];
        let x = points_global['features'][i]['geometry']['coordinates'][1];  
 
        let espace1 = ' ';
        for (j = num.length;j<10-1;j++){
            espace1 += ' '
        };

        let type_pt = "    "; // 4
        let date_pt = "        "; // 8
        let ordre = "   "; // 3
        let carte = "      "; // 6

        let espace2 = ' ';
        y = y.toFixed(0) +'.0000'; // 12
        for (j = y.length;j<12-1;j++){
            espace2 += ' ';
            };   

        x = x.toFixed(0) +'.0000'; // 12
        let espace3 = '';
        if(x.length ===! 12){
            espace3 += ' ';
            for (j = y.length;j<12-1;j++){
                espace3 += ' ';
            }};

        let provYX = "    "; // 4
        let espace4 = ' ';
        let h = points_global['features'][i]['properties']['h'];   

        if (h === '') { //10
            h = '         ';
        }
        else {
            h = h.toFixed(0) +'.0000' // 10
            for (j = h.length;j<10-1;j++){
                espace4 += ' ';
            }};
        text +=num + espace1 + type_pt + date_pt + ordre + carte + espace2 + y + espace3 + x + provYX + espace4 + h + "\n"; // toFixed pour arrondir
        };

    let filename = "POINTS.koo";
    let blob = new Blob([text], {type:'text/plain'});
    let link = document.createElement("a");
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
    }, 100);
};