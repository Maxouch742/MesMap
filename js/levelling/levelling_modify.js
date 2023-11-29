function levelling_modify(id){

    //TODO : créer la modale
    console.log("Changer les paramètres du cheminement");

    // Param
    const numero_cheminement = '001';

    $('#modalCheminement').modal({
        show: true,
        keyboard: true,
    });
    
    //-------- Création de la boîte de dialogue
    /*const div = document.createElement('div');
    div.setAttribute('class', 'modal fade');
    div.setAttribute('id', 'exampleModal');
    div.setAttribute('tabindex', '-1');
    div.setAttribute('aria-labelledby', 'exampleModalLabel');
    div.setAttribute('aria-hidden', 'true');

    const div2 = document.createElement('div');
    div2.setAttribute('class', "modal-dialog");
    div.appendChild(div2);

    const div3 = document.createElement('div');
    div3.setAttribute('class', "modal-content");
    div2.appendChild(div3);

    const div4 = document.createElement('div');
    div4.setAttribute('class', "modal-header");
    div3.appendChild(div4);

    const h1 = document.createElement('h1');
    h1.setAttribute('class', "modal-title fs-5");
    h1.setAttribute('id', "exampleModalLabel");
    h1.innerHTML = `Cheminement : <span style='font-weight: bold ;'>${numero_cheminement}</span>`;
    div4.appendChild(h1);

    const button = document.createElement('button');
    button.setAttribute('type', "button");
    button.setAttribute('class', "btn-close");
    button.setAttribute('data-bs-dismiss', "modal");
    button.setAttribute('aria-label', "Close");
    div4.appendChild(button);

    const div4_1 = document.createElement('div');
    div4_1.setAttribute('class', "modal-body");
    div3.appendChild(div4_1);

    const div5_1 = document.createElement('div');
    div5_1.setAttribute('class', "row border-bottom mb-2");
    div4_1.appendChild(div5_1);

    const div6_1 = document.createElement('div');
    div6_1.setAttribute('class', "col-6");
    div6_1.innerHTML = `Précision <span style="font-weight:bold;">en mm</span> (pour 1km)`;
    div5_1.appendChild(div6_1);

    const div7_1 = document.createElement('div');
    div7_1.setAttribute('class', "col-6");
    div7_1.innerHTML = `input type="number" name="number" step="any" value="0.2"/>`;
    div5_1.appendChild(div6_1);

    const div8_1 = document.createElement('div');
    div8_1.setAttribute('class', "row m-2");
    div4_1.appendChild(div8_1);

    const h4 = document.createElement('h4');
    h4.innerHTML = `Points mesurés :`;
    div8_1.appendChild(h4);

    const table = document.createElement('table');
    table.setAttribute('class', 'table table-striped');
    div8_1.appendChild(table);

    const thead = document.createElement('thead');
    table.appendChild(thead);
    const tr = document.createElement('tr');
    thead.appendChild(tr);

    const th1 = document.createElement('th');
    th1.innerHTML = 'Id';
    tr.appendChild(th1);
    const th2 = document.createElement('th');
    th2.innerHTML = 'Altitude';
    tr.appendChild(th2);
    const th3 = document.createElement('th');
    th3.innerHTML = 'Dis [m]';
    tr.appendChild(th3);
    const th4 = document.createElement('th');
    tr.appendChild(th4);
    
    const tbody = document.createElement('tbody');
    table.appendChild(thead);
    const tr2 = document.createElement('tr');
    table.appendChild(tr2);
    const th10 = document.createElement('th');
    th10.setAttribute('scope', 'row');
    th10.innerHTML = '01';
    tr2.appendChild(th10);
    const th20 = document.createElement('th');
    th20.innerHTML = '500.0';
    tr2.appendChild(th20);
    const th30 = document.createElement('th');
    th30.innerHTML = '';
    tr2.appendChild(th30);
    const th40 = document.createElement('th');
    th40.innerHTML = `<button class="btn" onclick=""><i class="bi bi-trash3"></i></button>`  //TODO: créer la fonction pour supprimer le point du cheminement
    tr2.appendChild(th40);
    //
    const tr3 = document.createElement('tr');
    table.appendChild(tr3);
    const th100 = document.createElement('th');
    th100.setAttribute('scope', 'row');
    th100.innerHTML = '02';
    tr3.appendChild(th100);
    const th200 = document.createElement('th');
    th200.innerHTML = '534.0';
    tr3.appendChild(th200);
    const th300 = document.createElement('th');
    th300.innerHTML = '100.03';
    tr3.appendChild(th300);
    const th400 = document.createElement('th');
    th400.innerHTML = `<button class="btn" onclick=""><i class="bi bi-trash3"></i></button>`  //TODO: créer la fonction pour supprimer le point du cheminement
    tr3.appendChild(th400);


                   /* <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Sauvegarder</button>
                    </div>
                </div>
            </div>
        </div>*/
}