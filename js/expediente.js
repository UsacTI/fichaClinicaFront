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

function loadData(id) {
    $.ajax({
        type: 'GET',
        url: dominio + `expediente/search/${id}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        //data: data,
        success: function (data) {
            console.log(data)
            let expediente = data['expediente'];
            document.getElementById('mc').value = expediente['mc'];
            document.getElementById('hpe').value = expediente['hpe'];
            let hma = String(expediente['hma']).split(',');
            let listaHma = document.getElementsByName('hma');
            document.getElementById('hma-comentarios').value = expediente['hma_comentario'];
            hma.forEach(element => {
               //console.log(element);
                listaHma.forEach(item => {
                    let idHMA = String(item.id).replace('hma-','');
                    if (Number(element) == Number(idHMA)) {
                        //console.log(idHMA);
                        item.checked = true;
                    }
                });
            });
            let hoa = String(expediente['hoa']).split(',');
            let listaHoa = document.getElementsByName('hoa');
            document.getElementById('hoa-comentarios').value = expediente['hoa_comentario'];
            hoa.forEach(element => {
                listaHoa.forEach(item => {
                    let idHMA = String(item.id).replace('hoa-','');
                    if (Number(element) == Number(idHMA)) {
                        item.checked = true;
                    }
                });
            });
            let lista_dolor  = expediente['dolor_dentario'];
            let dolor_dentario = [];
            let columna = [];
            for (let i = 0; i < lista_dolor.length; i++) {
                //console.log(lista_dolor[i]);
                if (lista_dolor[i] === ',') {
                    columna.push(lista_dolor[i-1])
                }else if (lista_dolor[i] === ';') {
                    dolor_dentario.push(columna);
                    columna = [];
                }
            }
            console.log(dolor_dentario);
            let fila = document.getElementById('tabla-hoa').getElementsByTagName('tr');
            for (let i = 0; i < fila.length; i++) {
                let tds = fila[i].getElementsByTagName('td');
                for (let n = 1; n < tds.length; n++) {
                    tds[n].textContent = dolor_dentario[i][n-1];
                }
            }

            document.getElementById('habitos').value = expediente['habitos'];
            document.getElementById('roentgenologica').value = expediente['roentgenologia'];
            document.getElementById('precauciones').value = expediente['precauciones'];
            document.getElementById('evaluacion').value = expediente['evaluacion_clinica'];

            let oclusion = String(expediente['oclusion']).split(',');
            let listaOclusion = document.getElementsByName('oclusion');
            document.getElementById('oclusion-descripcion').value = expediente['oclusion_comentario'];
            oclusion.forEach(element => {
                listaOclusion.forEach(item => {
                    let idOclusion = String(item.id).replace('oclusion-','');
                    if (Number(element) == Number(idOclusion)) {
                        item.checked = true;
                    }
                });
            });

            let roentoenogramas = String(expediente['roentoenogramas']).split(',');
            let lista_ordenes_roen = document.getElementsByName('ordenes-roen');
            document.getElementById('roentoenogramas-descripcion').value = expediente['oclusion_comentario'];
            roentoenogramas.forEach(element => {
                lista_ordenes_roen.forEach(item => {
                    let idOrdenes = String(item.id).replace('orden-','');
                    if (Number(element) == Number(idOrdenes)) {
                        item.checked = true;
                    }
                });
            });
            let opciones = String(expediente['opciones']).split(',');
            let lista_opciones = document.getElementsByName('opciones');
            document.getElementById('opciones-descripcion').value = expediente['opciones_descripcion'];
            opciones.forEach(element => {
                lista_opciones.forEach(item => {
                    let idOpcion = String(item.id).replace('op-','');
                    if (Number(element) == Number(idOpcion)) {
                        item.checked = true;
                    }
                });
            });
            document.getElementById('consulta-descripcion').value = expediente['consulta'];
            if (expediente['consulta'] != '') {
                document.getElementById('consulta').checked = true;
            }
            document.getElementById('estudios-especiales').value = expediente['estudios_especiales'];
            if (expediente['estudios_especiales'] != '') {
                document.getElementById('estudios').checked = true;
            }
            document.getElementById('equipo-diagnostico').value = expediente['equipo_diagnostico'];
            }
        })
}
var idExpediente = 0;

$(document).ready(function() {
    loadHMA();
    loadHOA();
    const urlParams = new URLSearchParams(window.location.search)
    //idExpediente = urlParams.get('id');
    //console.log("expedientID expediente" +expedienteId);
    idExpediente = expedienteId;
    //console.log("id expediente es" + expedienteId);
    loadData(idExpediente);
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
    //console.log(hma);

    let listaHoa = document.getElementsByName('hoa');
    let hoa = '';
    listaHoa.forEach(element => {
        if (element.checked) {
            hoa+=element.id.replace('hoa-','')+','
        }
    });
    //console.log(hoa);

    let listaOclusion = document.getElementsByName('oclusion');
    let oclusion = '';
    listaOclusion.forEach(element => {
        if (element.checked) {
            oclusion+=element.id.replace('oclusion-','')+','
        }
    });
    //console.log(oclusion);

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
    //console.log(dolor_dentario);
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
    let lista_ordenes_roen = document.getElementsByName('ordenes-roen');
    let roentoenogramas = '';
    lista_ordenes_roen.forEach(element => {
        if (element.checked) {
            roentoenogramas+=element.id.replace('orden-','')+','
        }
    });
    //console.log(ordenes_roen);
    let roentoenogramas_descripcion = document.getElementById('roentoenogramas-descripcion').value;
    //console.log(roentoenogramas);
    let lista_opciones = document.getElementsByName('opciones');
    let opciones = '';
    lista_opciones.forEach(element => {
        if (element.checked) {
            opciones+=element.id.replace('op-','')+','
        }
    });
    let opciones_descripcion = document.getElementById('opciones-descripcion').value;
    //console.log(opciones_descripcion);
    let consulta_descripcion = document.getElementById('consulta-descripcion').value;
    //console.log(consulta_descripcion);
    let estudios_especiales = document.getElementById('estudios-especiales').value;
    //console.log(estudios_especiales);
    let equipo_diagnostico = document.getElementById('equipo-diagnostico').value;
    //console.log(equipo_diagnostico);

    let expediente = {
        mc: mc,
        hpe: hpe,
        hma:  hma,
        hma_comentario:  hma_comentarios,
        hoa:  hoa,
        hoa_comentario:  hoa_comentarios,
        dolor_dentario:  dolor_dentario,
        habitos:  habitos,
        roentgenologia:  roentgenologica,
        precauciones:  precauciones,
        evaluacion_clinica:  evaluacion,
        oclusion:  oclusion,
        oclusion_comentario:  oclusion_descripcion,
        roentoenogramas: roentoenogramas,
        roentoenogramas_descripcion: roentoenogramas_descripcion,
        opciones: opciones,
        opciones_descripcion: opciones_descripcion,
        consulta: consulta_descripcion,
        estudios_especiales: estudios_especiales,
        equipo_diagnostico:  equipo_diagnostico,
        diagnostico:  "",
        idpaciente:  2,
    }
    //console.log(JSON.stringify(expediente));
    let data = JSON.stringify(expediente)

    $.ajax({
        type: 'PUT',
        url: dominio + `expediente/update/${idExpediente}`,
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

function goToPlanTratamiento() {
    //location.href = `./planTratamiento.html?id=${idExpediente}`;
    $('#contenido').load("planTratamiento.html");
}

function goToRadiografia() {
    $('#contenido').load("radiografia.html");
}

$('#registroExpediente').on('click', function () {
    guardarExpediente()
})
