function levelling_create_row(id_chem, nbre_points) {
    
    const tbody = document.getElementById('levelling_tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `<th scope="row">${id_chem}</th>` + 
                   `<td>${nbre_points}</td>` + 
                   `<td>0.2</td>` + 
                   `<td><button type="button" class="btn" id="${id_chem}"><i class="bi bi-gear"></i></button></td>` +
                   `<td><button type="button" class="btn  id="${id_chem}"><i class="bi bi-trash3"></i></button></td>`;
    tbody.appendChild(tr);
}