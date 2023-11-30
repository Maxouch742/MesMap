/**
 * 
 * @param {int} gnss_id : identifiant unique de la session gnss 
 * @param {array} observation : liste des points mesurés dans la session
 */

function gnss_create_row(gnss_id, observation){

    const tbody = document.getElementById('gnss_tbody');
    
    // Création de la ligne
    const tr = document.createElement('tr');
    tr.id = gnss_id;

    // Création des cellules
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.innerText = "Session"+String(gnss_id);

    const td1 = document.createElement('td');
    td1.innerText = observation.length;
    
    const td3 = document.createElement('td');
    const buttonModify = document.createElement('button');
    buttonModify.setAttribute('class', 'btn');
    buttonModify.setAttribute('data-toggle', 'modal');
    buttonModify.setAttribute('data-target', '#modalCheminement');
    buttonModify.setAttribute('onclick', `levelling_modify(${gnss_id})`);   //TODO: changer fonction et paramètres
    const iconModify = document.createElement('i');
    iconModify.setAttribute('class', 'bi bi-gear');
    buttonModify.appendChild(iconModify);
    td3.appendChild(buttonModify);

    const buttonDelete = document.createElement('button');
    buttonDelete.setAttribute('class', 'btn');
    buttonDelete.setAttribute('onclick', `levelling_delete(${gnss_id})`);  //TODO: changer fonction et paramètres
    const iconDelete = document.createElement('i');
    iconDelete.setAttribute('class', 'bi bi-trash3');
    buttonDelete.appendChild(iconDelete);
    td3.appendChild(buttonDelete);

    // Ajout des cellules dans la ligne
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td3);

    // Ajout de la ligne dans le tableau
    tbody.appendChild(tr);
    
}