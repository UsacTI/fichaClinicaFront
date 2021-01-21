var hmas = [
    {idhma: 1, descripcion: "Enfermedad Cardiovascular"},
    {idhma: 2, descripcion: "Diabetes"},
    {idhma: 3, descripcion: "Problemas Endocrinos"},
    {idhma: 4, descripcion: "Problemas Renales"},
    {idhma: 5, descripcion: "Alergias"},
    {idhma: 6, descripcion: "Hepatitis"},
    {idhma: 7, descripcion: "Embarazo"},
    {idhma: 8, descripcion: "Convulsiones o desmayos"},
    {idhma: 9, descripcion: "Enfermedades Venéreas"},
    {idhma: 10, descripcion: "Fiebre Reumática"},
    {idhma: 11, descripcion: "Tuberculosis"},
    {idhma: 12, descripcion: "Hemorragias"},
    {idhma: 13, descripcion: "Discracias sanguineas"},
    {idhma: 14, descripcion: "Accidentes"},
    {idhma: 15, descripcion: "Otras enfermedades"},
    {idhma: 16, descripcion: "Medicación"}
]

var hoas = [
    {idhoa: 1, descripcion: "Hemorragia"},
    {idhoa: 2, descripcion: "Infecciones"},
    {idhoa: 3, descripcion: "Úlceras"},
    {idhoa: 4, descripcion: "Rección a la anestecia"},
    //{idhoa: 5, descripcion: "Dolor dentario"},
    {idhoa: 6, descripcion: "Otros"},
]


function loadHMA() {
    for (let i = 0; i < hmas.length; i++) {
        let columna = `
        
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="hma-${hmas[i]['idhma']}" name="hma">
                <label class="form-check-label" for="hma-${hmas[i]['idhma']}">
                ${hmas[i]['descripcion']}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="hma-${hmas[i+1]['idhma']}" name="hma">
                <label class="form-check-label" for="hma-${hmas[i+1]['idhma']}">
                ${hmas[i+1]['descripcion']}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="hma-${hmas[i+2]['idhma']}" name="hma">
                <label class="form-check-label" for="hma-${hmas[i+2]['idhma']}">
                ${hmas[i+2]['descripcion']}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="hma-${hmas[i+3]['idhma']}" name="hma">
                <label class="form-check-label" for="hma-${hmas[i+3]['idhma']}">
                ${hmas[i+3]['descripcion']}
                </label>
            </div>
        
        `;
        i+=3
        let newDiv = document.createElement('div');
        newDiv.className = "col-md-3 col-sm-4";
        newDiv.innerHTML = columna;
        document.getElementById('hma-seccion').appendChild(newDiv);
    }
}

function loadHOA() {
    for (let i = 0; i < hoas.length; i++) {
        let item = `
            
                <input class="form-check-input" type="checkbox" value="" id="hoa-${hoas[i]['idhoa']}" name="hoa">
                <label class="form-check-label" for="hoa-${hoas[i]['idhoa']}">
                ${hoas[i]['descripcion']}
                </label>
            
        `;
        let newDiv = document.createElement('div');
        newDiv.className = "form-check";
        newDiv.innerHTML = item;
        document.getElementById('hoa-items').appendChild(newDiv);
    }
}


$(document).ready(function() {
    loadHMA();
    loadHOA();
} )

function addColumn() {
    let newTd1 = document.createElement('td');
    let newTd2 = document.createElement('td');
    let newTd3 = document.createElement('td');
    let newTd4 = document.createElement('td');
    let newTd5 = document.createElement('td');
    newTd1.style = "width: 50px;";
    newTd2.style = "width: 50px;";
    newTd3.style = "width: 50px;";
    newTd4.style = "width: 50px;";
    newTd5.style = "width: 50px;";
    newTd1.contentEditable = "true";
    newTd2.contentEditable = "true";
    newTd3.contentEditable = "true";
    newTd4.contentEditable = "true";
    newTd5.contentEditable = "true";
    document.getElementById('id-pieza').appendChild(newTd1);
    document.getElementById('id-intensidad').appendChild(newTd2);
    document.getElementById('id-duracion').appendChild(newTd3);
    document.getElementById('id-inicio').appendChild(newTd4);
    document.getElementById('id-frecuencia').appendChild(newTd5);
    let fila = document.getElementById('tabla-hoa').getElementsByTagName('tr');
    let tabla_hoa = [[],[],[],[],[],];
    for (let i = 0; i < fila.length; i++) {
        let tds = fila[i].getElementsByTagName('td');
        //console.log(tds[0].textContent);
        console.log(tabla_hoa[i]);
        for (let n = 1; n < tds.length; n++) {
            tabla_hoa[i].push(tds[n].textContent);
        }
    }
    console.log(tabla_hoa);
    //console.log(document.getElementsByName('ordenes')[0].checked);
    //console.log(document.getElementsByName('hma'));
    //console.log(document.getElementsByName('hoa'));
    console.log(document.getElementsByName('oclusion'));
}