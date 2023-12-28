function levelling_modify(row_html){

    // Affihcer la fenêtre modale
    $('#modalCheminement').modal('show');

    //-- Modifier les différentes informations contenues dans la modale
    const id_chem = row_html.id;
    const cheminement = levelling_cheminement[id_chem];
    console.log(cheminement);

    // Modifier les titres
    document.getElementById("levellingModal_ChemID").innerText = id_chem;

    // Afficher les points mesurés
    const tbody = document.getElementById('levellingModal_tablePoints_tbody');

    for (let i=0; i<cheminement.length; i++){
        let tr = document.createElement('tr');
        tr.setAttribute('id',id_chem+cheminement[i]['station']);

        const td_station = document.createElement('td');
        td_station.innerHTML = cheminement[i]['station'];
        tr.appendChild(td_station);
        
        const td_visee = document.createElement('td');
        td_visee.innerHTML = cheminement[i]['visee'];
        tr.appendChild(td_visee);

        const td_distance = document.createElement('td');
        td_distance.innerHTML = cheminement[i]['distance'].toFixed(2);
        tr.appendChild(td_distance);

        const td_sigma = document.createElement('td');
        td_sigma.innerHTML = cheminement[i]['sigma'].toFixed(2);
        tr.appendChild(td_sigma);

        const td_sigma_final = document.createElement('td');
        const sigma_final = cheminement[i]['distance']/1000 * cheminement[i]['sigma'];
        td_sigma_final.innerHTML = sigma_final.toFixed(2);
        tr.appendChild(td_sigma_final);

        const td_button = document.createElement('td');
        td_button.innerHTML = '<button class="btn" onclick="levelling_delete_popup()"><i class="bi bi-trash3"></i></button>';
        tr.appendChild(td_button);

        tbody.appendChild(tr);

    }
}