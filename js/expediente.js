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
    
}

function guardarExpediente() {
    let listaHma = document.getElementsByName('hma');
    let hma = '';
    listaHma.forEach(element => {
        if (element.checked) {
            hma+=element.id.replace('hma-','')+','    
        }
    });
    console.log(hma);

    let listaHoa = document.getElementsByName('hoa');
    let hoa = '';
    listaHoa.forEach(element => {
        if (element.checked) {
            hoa+=element.id.replace('hoa-','')+','    
        }
    });
    console.log(hoa);

    let listaOclusion = document.getElementsByName('oclusion');
    let oclusion = '';
    listaOclusion.forEach(element => {
        if (element.checked) {
            oclusion+=element.id.replace('oclusion-','')+','    
        }
    });
    console.log(oclusion);

    let fila = document.getElementById('tabla-hoa').getElementsByTagName('tr');
    let tabla_hoa = [[],[],[],[],[],];
    let dolor_dentario = '';
    for (let i = 0; i < fila.length; i++) {
        let tds = fila[i].getElementsByTagName('td');
        //console.log(tds[0].textContent);
        //console.log(tabla_hoa[i]);
        for (let n = 1; n < tds.length; n++) {
            tabla_hoa[i].push(tds[n].textContent);
            if (n == (tds.length-1)) {
                dolor_dentario+= tds[n].textContent+';';    
            } else {
                dolor_dentario+= tds[n].textContent+',';
            }
            
        }
    }
    //console.log(tabla_hoa);
    console.log(dolor_dentario);
    //console.log(document.getElementsByName('ordenes')[0].checked);
    //console.log(document.getElementsByName('hma'));
    //console.log(document.getElementsByName('hoa'));
    //console.log(document.getElementsByName('oclusion'));

    let mc = document.getElementById('mc').value;
    //console.log(mc);
    let hpe = document.getElementById('hpe').value;
    //console.log(hpe);
    let hma_comentarios = document.getElementById('hma-comentarios').value;
    //console.log(hma_comentarios);
    let hoa_comentarios = document.getElementById('hoa-comentarios').value;
    //console.log(hoa_comentarios);
    let habitos = document.getElementById('habitos').value;
    //console.log(habitos);
    let roentgenologica = document.getElementById('roentgenologica').value;
    //console.log(roentgenologica);
    let precauciones = document.getElementById('precauciones').value;
    //console.log(precauciones);
    let evaluacion = document.getElementById('evaluacion').value;
    //console.log(evaluacion);
    let oclusion_descripcion = document.getElementById('oclusion-descripcion').value;
    //console.log(oclusion_descripcion);
    //let roentoenogramas = oclusion.getElementById('roentoenogramas').value;
    //console.log(roentoenogramas);
    //let opciones_descripcion = document.getElementById('opciones-descripcion').value;
    //console.log(opciones_descripcion);
    //let consulta_descripcion = document.getElementById('consulta-descripcion').value;
    //console.log(consulta_descripcion);
    //let estudios_especiales = document.getElementById('estudios-especiales').value;
    //console.log(estudios_especiales);
    let equipo_diagnostico = document.getElementById('equipo-diagnostico').value;
    //console.log(equipo_diagnostico);

    let expediente = {
        evaluacion_clinica:  mc,
        roentgenologia:  roentgenologica,
        precauciones:  precauciones,
        equipo_diagnostico:  equipo_diagnostico,
        habitos:  habitos,
        diagnostico:  "diagnostico",
        oclusion:  oclusion,
        oclusion_comentario:  oclusion_descripcion,
        hma:  hma,
        hma_comentario:  hma_comentarios,
        hoa:  hoa,
        hoa_comentario:  hoa_comentarios,
        dolor_dentario:  dolor_dentario,
        idpaciente:  2,
    }
    console.log(JSON.stringify(expediente));
    let data = JSON.stringify(expediente)

    $.ajax({
        type: 'POST',
        url: dominio + 'Expediente/crear',
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: data,
        success: function (data) {
           console.log(data)
        }
      })
}

$('#registroExpediente').on('click', function () {
    guardarExpediente()
})