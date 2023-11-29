function levelling_create_row(id_chem, nbre_points, distance_totale) {
    
    const tbody = document.getElementById('levelling_tbody');
    
    // Création de la ligne
    const tr = document.createElement('tr');
    tr.id = id_chem;

    // Création des cellules
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.innerText = id_chem

    const td1 = document.createElement('td');
    td1.innerText = nbre_points;

    const td2 = document.createElement('td');
    td2.innerText = distance_totale.toFixed(2);
    
    const td3 = document.createElement('td');
    const buttonModify = document.createElement('button');
    buttonModify.setAttribute('class', 'btn');
    buttonModify.setAttribute('data-toggle', 'modal');
    buttonModify.setAttribute('data-target', '#modalCheminement');
    buttonModify.setAttribute('onclick', `levelling_modify(${id_chem})`);
    const iconModify = document.createElement('i');
    iconModify.setAttribute('class', 'bi bi-gear');
    buttonModify.appendChild(iconModify);
    td3.appendChild(buttonModify);

    const buttonDelete = document.createElement('button');
    buttonDelete.setAttribute('class', 'btn');
    buttonDelete.setAttribute('onclick', `levelling_delete(${id_chem})`);
    const iconDelete = document.createElement('i');
    iconDelete.setAttribute('class', 'bi bi-trash3');
    buttonDelete.appendChild(iconDelete);
    td3.appendChild(buttonDelete);

    // Ajout des cellules dans la ligne
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    // Ajout de la ligne dans le tableau
    tbody.appendChild(tr);
}