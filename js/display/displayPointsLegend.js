function displayPointsLegend(object_correspondance){

    const object_correspondance_len = Object.keys(object_correspondance).length;
    
    // S'il y a plus d'un type dans le dictionnaire
    if (object_correspondance_len >= 1){

        // Suppression de la balise existante
        const parent = document.getElementById('html_displayPoints');
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        // Ajout des radiobuttons
        Object.entries(object_correspondance).forEach(entry => {
            const [key, value] = entry;
            const div = document.createElement('div');
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="checkBoxPoints" name="${key}" value="${type_color[value]}" onchange="displayPointsType(this)" checked>
                             <label for="checkBoxPoints">
                             <i class='bi bi-circle-fill' style='color:${type_color[value]}'></i>
                             ${key}
                             </label>`;
            parent.appendChild(div);
        })

    }
}