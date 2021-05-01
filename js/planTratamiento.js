

var tratamientos = [];
//var idExpediente = 0;
var clasificaciones = [
    {text: 'Diagnóstico', value: 1, tratamientos: []},
    {text: 'Radiología', value: 2, tratamientos: []},
    {text: 'Periodoncia', value: 3, tratamientos: []},
    {text: 'Cirugía', value: 4, tratamientos: []},
    {text: 'Endodoncia', value: 5, tratamientos: []},
    {text: 'Operatoria', value: 6, tratamientos: []},
    {text: 'Restaurativa', value: 7, tratamientos: []},
    {text: 'Odontopediatría', value: 8, tratamientos: []}
]

var estadoExpediente = 0;


function loadClasificaciones() {
    clasificaciones.forEach(element => {
        let opcion = document.createElement('option');
        opcion.value = element.value;
        opcion.textContent = element.text;
        //console.log(opcion);
        document.getElementById('select-calsificacion').appendChild(opcion);
    });

    $.ajax({
        type: 'GET',
        url: dominio + `tratamiento/`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        //data: data,
        success: function (data) {
           //console.log(data)
           tratamientos = data['tratamiento'];
           //console.log(tratamientos);
           clasificaciones.forEach(clasificacion => {
                tratamientos.forEach(tratamiento => {
                   if (clasificacion.value == Number(tratamiento.clasificacion)) {
                        clasificacion.tratamientos.push(tratamiento)
                   }
               });
           });
           //console.log(clasificaciones);
        }
      })
}

function loadTratamiento(e){
    //console.log(e.value);
    $("#select-tratamiento").empty();
    let opcion = document.createElement('option');
    opcion.setAttribute('selected', true);
    opcion.text = '-- Seleccione un tratamiento --';
    document.getElementById('select-tratamiento').appendChild(opcion);
    clasificaciones.forEach(clasificacion => {
        if (e.value == clasificacion.value) {
            clasificacion.tratamientos.forEach(tratamiento => {
                let opcion = document.createElement('option');
                opcion.value = tratamiento.idtratamiento;
                opcion.textContent = tratamiento.descripcion;
                document.getElementById('select-tratamiento').appendChild(opcion);
            });

        }
    });
}

function loadOdontograma(odontograma) {
    console.log(odontograma);
    odontograma.forEach(pieza => {
        if (pieza.existencia == 1) {
            //console.log(pieza);
            //console.log(document.getElementById(`beweglichkeit_${pieza.pieza}_txt`));
            document.getElementById(`beweglichkeit_${pieza.pieza}_txt`).value = Number(pieza.movilidad);
            if (pieza.implante == 1) {
                switch (pieza.pieza) {
                    case 11:
                        toggle_implant_11();
                        break;
                    case 12:
                        toggle_implant_12();
                        break;
                    case 13:
                        toggle_implant_13();
                        break;
                    case 14:
                        toggle_implant_14();
                        break;
                    case 15:
                        toggle_implant_15();
                        break;
                    case 16:
                        toggle_implant_16();
                        break;
                    case 17:
                        toggle_implant_17();
                        break;
                    case 18:
                        toggle_implant_18();
                        break;
                }
            }
            if (pieza.pieza == 18 || pieza.pieza == 17 || pieza.pieza == 16) {
                if (pieza.furcacion != 0 && document.getElementById(`furkation_${pieza.pieza}_b_btn`).style.display != 'none') {
                    //console.log(`furkation_${pieza.furcacion}_${pieza.pieza}_b_tab`);
                    console.log(document.getElementById(`furkation_${pieza.furcacion}_${pieza.pieza}_b_tab`));
                    //document.getElementById(`furkation_${pieza.furcacion}_${pieza.pieza}_b_tab`).style.display = 'block';
                    switch (pieza.pieza) {
                        case 16:
                            for (let i = 0; i < pieza.furcacion; i++) {
                                toggle_furcation_16_b();    
                            }
                            for (let i = 0; i < pieza.furcacion_dp; i++) {
                                toggle_furcation_16_dp();
                            }
                            for (let i = 0; i < pieza.furcacion_mp; i++) {
                                toggle_furcation_16_mp();
                            }
                            break;
                        case 17:
                            for (let i = 0; i < pieza.furcacion; i++) {
                                toggle_furcation_17_b();    
                            }       
                            for (let i = 0; i < pieza.furcacion_dp; i++) {
                                toggle_furcation_17_dp();
                            }
                            for (let i = 0; i < pieza.furcacion_mp; i++) {
                                toggle_furcation_17_mp();
                            }
                            break;
                        case 18:
                            for (let i = 0; i < pieza.furcacion; i++) {
                                toggle_furcation_18_b();
                            }
                            for (let i = 0; i < pieza.furcacion_dp; i++) {
                                toggle_furcation_18_dp();
                            }
                            for (let i = 0; i < pieza.furcacion_mp; i++) {
                                toggle_furcation_18_mp();
                            }
                            break;
                    }
                }
            }else if(pieza.pieza == 14 && pieza.pieza == 24){
                if (pieza.furcacion_dp != 0 && document.getElementById(`furkation_${pieza.pieza}_dp_btn`).style.display != 'none') {
                    switch (pieza.pieza) {
                        case 14:
                            for (let i = 0; i < pieza.furcacion_dp; i++) {
                                toggle_furcation_14_dp();
                            }
                            for (let i = 0; i < pieza.furcacion_mp; i++) {
                                toggle_furcation_14_mp();
                            }       
                            break;
                        case 24:
                            for (let i = 0; i < pieza.furcacion_dp; i++) {
                                toggle_furcation_24_dp();
                            }
                            for (let i = 0; i < pieza.furcacion_mp; i++) {
                                toggle_furcation_24_mp();
                            }
                            break;
                    }
                }
            }
            insertSangradoPlaca(pieza);
            if (pieza.pieza >= 11 && pieza.pieza <= 18) {
                document.getElementById(`mg_${pieza.pieza}_db_txt`).value = pieza.margen_db;
                document.getElementById(`mg_${pieza.pieza}_b_txt`).value = pieza.margen_b;
                document.getElementById(`mg_${pieza.pieza}_mb_txt`).value = pieza.margen_mb;
                document.getElementById(`st_${pieza.pieza}_db_txt`).value = pieza.profundidad_db;
                document.getElementById(`st_${pieza.pieza}_b_txt`).value = pieza.profundidad_b;
                document.getElementById(`st_${pieza.pieza}_mb_txt`).value = pieza.profundidad_mb;
                document.getElementById(`mg_${pieza.pieza}_dp_txt`).value = pieza.margen_dp;
                document.getElementById(`mg_${pieza.pieza}_p_txt`).value = pieza.margen_p;
                document.getElementById(`mg_${pieza.pieza}_mp_txt`).value = pieza.margen_mp;
                document.getElementById(`st_${pieza.pieza}_dp_txt`).value = pieza.profundidad_dp;
                document.getElementById(`st_${pieza.pieza}_p_txt`).value = pieza.profundidad_p;
                document.getElementById(`st_${pieza.pieza}_mp_txt`).value = pieza.profundidad_mp;
                updateMargen(pieza);
            }
            
            
        }else{
            switch (pieza.pieza) {
                case 11:
                    toggle_tooth_11();        
                    break;
                case 12:
                    toggle_tooth_12();        
                    break;
                case 13:
                    toggle_tooth_13();        
                    break;
                case 14:
                    toggle_tooth_14();        
                    break;
                case 15:
                    toggle_tooth_15();        
                    break;
                case 16:
                    toggle_tooth_16();        
                    break;
                case 17:
                    toggle_tooth_17();        
                    break;
                case 18:
                    toggle_tooth_18();        
                    break;
            }
            calc();
        }    
    });
}

function updateMargen(pieza){
    switch (pieza.pieza) {
        case 11:
            change_probing_11();
            break;
        case 12:
            change_probing_12();
            break;
        case 13:
            change_probing_13();
            break;
        case 14:
            change_probing_14();
            break;
        case 15:
            change_probing_15();
            break;
        case 16:
            change_probing_16();
            break;
        case 17:
            change_probing_17();
            break;
        case 18:
            change_probing_18();
            break;
    }
}

function insertSangradoPlaca(pieza) {
    switch (pieza.pieza) {
        case 11:
            if (pieza.sangrado_db == 1) {toggle_BOP_11_db();} 
            if (pieza.sangrado_b == 1) {toggle_BOP_11_b();}
            if (pieza.sangrado_mb == 1) {toggle_BOP_11_mb();}
            calc();
            if (pieza.placa_db == 1) {toggle_PI_11_db();} 
            if (pieza.placa_b == 1) {toggle_PI_11_b();}
            if (pieza.placa_mb == 1) {toggle_PI_11_mb();}
            calc();
            if (pieza.placa_dp == 1) {toggle_PI_11_dp();} 
            if (pieza.placa_p == 1) {toggle_PI_11_p();}
            if (pieza.placa_mp == 1) {toggle_PI_11_mp();}
            calc();
            if (pieza.sangrado_dp == 1) {toggle_BOP_11_dp();} 
            if (pieza.sangrado_p == 1) {toggle_BOP_11_p();}
            if (pieza.sangrado_mp == 1) {toggle_BOP_11_mp();}
            calc();
            break;
        case 12:
            if (pieza.sangrado_db == 1) {toggle_BOP_12_db();} 
            if (pieza.sangrado_b == 1) {toggle_BOP_12_b();}
            if (pieza.sangrado_mb == 1) {toggle_BOP_12_mb();}
            calc();
            if (pieza.placa_db == 1) {toggle_PI_12_db();} 
            if (pieza.placa_b == 1) {toggle_PI_12_b();}
            if (pieza.placa_mb == 1) {toggle_PI_12_mb();}
            calc();
            if (pieza.placa_dp == 1) {toggle_PI_12_dp();} 
            if (pieza.placa_p == 1) {toggle_PI_12_p();}
            if (pieza.placa_mp == 1) {toggle_PI_12_mp();}
            calc();
            if (pieza.sangrado_dp == 1) {toggle_BOP_12_dp();} 
            if (pieza.sangrado_p == 1) {toggle_BOP_12_p();}
            if (pieza.sangrado_mp == 1) {toggle_BOP_12_mp();}
            calc();
            break;
        case 13:
            if (pieza.sangrado_db == 1) {toggle_BOP_13_db();} 
            if (pieza.sangrado_b == 1) {toggle_BOP_13_b();}
            if (pieza.sangrado_mb == 1) {toggle_BOP_13_mb();}
            calc();
            if (pieza.placa_db == 1) {toggle_PI_13_db();} 
            if (pieza.placa_b == 1) {toggle_PI_13_b();}
            if (pieza.placa_mb == 1) {toggle_PI_13_mb();}
            calc();
            if (pieza.placa_dp == 1) {toggle_PI_13_dp();} 
            if (pieza.placa_p == 1) {toggle_PI_13_p();}
            if (pieza.placa_mp == 1) {toggle_PI_13_mp();}
            calc();
            if (pieza.sangrado_dp == 1) {toggle_BOP_13_dp();} 
            if (pieza.sangrado_p == 1) {toggle_BOP_13_p();}
            if (pieza.sangrado_mp == 1) {toggle_BOP_13_mp();}
            calc();
            break;
        case 14:
            if (pieza.sangrado_db == 1) {toggle_BOP_14_db();} 
            if (pieza.sangrado_b == 1) {toggle_BOP_14_b();}
            if (pieza.sangrado_mb == 1) {toggle_BOP_14_mb();}
            calc();
            if (pieza.placa_db == 1) {toggle_PI_14_db();} 
            if (pieza.placa_b == 1) {toggle_PI_14_b();}
            if (pieza.placa_mb == 1) {toggle_PI_14_mb();}
            calc();
            if (pieza.placa_dp == 1) {toggle_PI_14_dp();} 
            if (pieza.placa_p == 1) {toggle_PI_14_p();}
            if (pieza.placa_mp == 1) {toggle_PI_14_mp();}
            calc();
            if (pieza.sangrado_dp == 1) {toggle_BOP_14_dp();} 
            if (pieza.sangrado_p == 1) {toggle_BOP_14_p();}
            if (pieza.sangrado_mp == 1) {toggle_BOP_14_mp();}
            calc();
            break;
        case 15:
            if (pieza.sangrado_db == 1) {toggle_BOP_15_db();} 
            if (pieza.sangrado_b == 1) {toggle_BOP_15_b();}
            if (pieza.sangrado_mb == 1) {toggle_BOP_15_mb();}
            calc();
            if (pieza.placa_db == 1) {toggle_PI_15_db();} 
            if (pieza.placa_b == 1) {toggle_PI_15_b();}
            if (pieza.placa_mb == 1) {toggle_PI_15_mb();}
            calc();
            if (pieza.placa_dp == 1) {toggle_PI_15_dp();} 
            if (pieza.placa_p == 1) {toggle_PI_15_p();}
            if (pieza.placa_mp == 1) {toggle_PI_15_mp();}
            calc();
            if (pieza.sangrado_dp == 1) {toggle_BOP_15_dp();} 
            if (pieza.sangrado_p == 1) {toggle_BOP_15_p();}
            if (pieza.sangrado_mp == 1) {toggle_BOP_15_mp();}
            calc();
            break;
        case 16:
            if (pieza.sangrado_db == 1) {toggle_BOP_16_db();} 
            if (pieza.sangrado_b == 1) {toggle_BOP_16_b();}
            if (pieza.sangrado_mb == 1) {toggle_BOP_16_mb();}
            calc();
            if (pieza.placa_db == 1) {toggle_PI_16_db();} 
            if (pieza.placa_b == 1) {toggle_PI_16_b();}
            if (pieza.placa_mb == 1) {toggle_PI_16_mb();}
            calc();
            if (pieza.placa_dp == 1) {toggle_PI_16_dp();} 
            if (pieza.placa_p == 1) {toggle_PI_16_p();}
            if (pieza.placa_mp == 1) {toggle_PI_16_mp();}
            calc();
            if (pieza.sangrado_dp == 1) {toggle_BOP_16_dp();} 
            if (pieza.sangrado_p == 1) {toggle_BOP_16_p();}
            if (pieza.sangrado_mp == 1) {toggle_BOP_16_mp();}
            calc();
            break;
        case 17:
            if (pieza.sangrado_db == 1) {toggle_BOP_17_db();} 
            if (pieza.sangrado_b == 1) {toggle_BOP_17_b();}
            if (pieza.sangrado_mb == 1) {toggle_BOP_17_mb();}
            calc();
            if (pieza.placa_db == 1) {toggle_PI_17_db();} 
            if (pieza.placa_b == 1) {toggle_PI_17_b();}
            if (pieza.placa_mb == 1) {toggle_PI_17_mb();}
            calc();
            if (pieza.placa_dp == 1) {toggle_PI_17_dp();} 
            if (pieza.placa_p == 1) {toggle_PI_17_p();}
            if (pieza.placa_mp == 1) {toggle_PI_17_mp();}
            calc();
            if (pieza.sangrado_dp == 1) {toggle_BOP_17_dp();} 
            if (pieza.sangrado_p == 1) {toggle_BOP_17_p();}
            if (pieza.sangrado_mp == 1) {toggle_BOP_17_mp();}
            calc();
            break;
        case 18:
            if (pieza.sangrado_db == 1) {toggle_BOP_18_db();} 
            if (pieza.sangrado_b == 1) {toggle_BOP_18_b();}
            if (pieza.sangrado_mb == 1) {toggle_BOP_18_mb();}
            calc();
            if (pieza.placa_db == 1) {toggle_PI_18_db();} 
            if (pieza.placa_b == 1) {toggle_PI_18_b();}
            if (pieza.placa_mb == 1) {toggle_PI_18_mb();}
            calc();
            if (pieza.placa_dp == 1) {toggle_PI_18_dp();} 
            if (pieza.placa_p == 1) {toggle_PI_18_p();}
            if (pieza.placa_mp == 1) {toggle_PI_18_mp();}
            calc();
            if (pieza.sangrado_dp == 1) {toggle_BOP_18_dp();} 
            if (pieza.sangrado_p == 1) {toggle_BOP_18_p();}
            if (pieza.sangrado_mp == 1) {toggle_BOP_18_mp();}
            calc();
            break;
    }
}

function goToExpediente() {
    if (estadoExpediente == 1) {
        $('#contenido').load("expedienteEstudianteNoEditable.html");
    } else {
        $('#contenido').load("expediente.html");
    }

}

function goToRadiografia() {
    $('#contenido').load("radiografia.html");
}

function getTratamientos() {
    $.ajax({
        type: 'GET',
        url: dominio + `buscardetalleProcedimiento/${idExpediente}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        //data: data,
        success: function (data) {
           //console.log(data)
           let tratamientos = []
           tratamientos = data['tratamientos'];
           let n = 1;
           tratamientos.forEach(element => {
               let fila = document.createElement('tr');
               fila.innerHTML = `
                    <td>${n}</td>
                    <td>${element.pieza}</td>
                    <td>${element.descripcion}</td>
                    <td>${element.valor}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="deleteDetalle(this, ${element.id_detalle_procedimiento_tratamiento})">Eliminar</button></td>
               `
               document.getElementById('table-tratamientos').appendChild(fila)
               n++;
           });
        }
      })
}

function agregarDetalle() {
    showLoader();
    let tratamiento = {
        idtratamiento: document.getElementById('select-tratamiento').value,
        idexpediente: idExpediente,
        idusuario: idUsuario,
        pieza: document.getElementById('pieza').value
    }

    $.ajax({
        type: 'POST',
        url: dominio + `detalleProcedimiento`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: JSON.stringify(tratamiento),
        success: function (data) {
            //console.log(data);
            let t;
            clasificaciones.forEach(clasificacion => {
                let d = clasificacion.tratamientos.filter(x => x.idtratamiento == tratamiento.idtratamiento)[0];
                //console.log(d);
                if (d) {
                    t = d;
                }
            });

            let fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${document.getElementById('table-tratamientos').getElementsByTagName('tr').length+1}</td>
                <td>${tratamiento.pieza}</td>
                <td>${t.descripcion}</td>
                <td>${t.valor}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteDetalle(this, ${data['tratamientos'].id_detalle_procedimiento_tratamiento})">Eliminar</button></td>
            `
            //console.log(fila);
            document.getElementById('table-tratamientos').appendChild(fila);
            document.getElementById('pieza').value = '';
            document.getElementById('select-calsificacion').value = '';
            document.getElementById('select-tratamiento').value = '';
            alertify.set('notifier','position', 'top-right');
            alertify.success("Tratamiento guardado");
            hideLoader();
        }
      })
}

function deleteDetalle(e, id) {
    //console.log(e.parentNode.parentNode);
    alertify.confirm('Advertencia',"¿Seguro que quiere eliminar este registro de tratamiento?",
    function(){
        alertify.set('notifier','position', 'top-right');
        alertify.success('Registro eliminado');
        let row = e.parentNode.parentNode;
        let table = row.parentNode;

        //console.log(table);
        $.ajax({
            type: 'DELETE',
            url: dominio + `tratamiento/deleteDetalle/${id}`,
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            async: false,
            success: function (data) {
                //console.log(data);
                table.deleteRow(row.rowIndex-1);
                alertify.set('notifier','position', 'top-right');
                alertify.success("Tratamiento eliminado");

            }
        })
    },
    function(){
        alertify.set('notifier','position', 'top-right');
        alertify.error('Cancelado');
    }).set('labels', {ok:'Sí', cancel:'Cancelar'});

}

function comprobarPlan() {
    $.ajax({
        type: 'GET',
        url: dominio + `expediente/search/${idExpediente}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        //data: data,
        success: function (data) {
            //console.log(data.expediente.aprobar_plan);
            //console.log(JSON.parse(data.expediente.odontograma));
            document.getElementById('diagnostico').value = data.expediente.diagnostico;
            estadoExpediente = data.expediente.aprobar_expediente;
            idPaciente = data.expediente.idpaciente;
            if (data.expediente.aprobar_plan == 1) {
                document.getElementById('aprobar').removeAttribute('hidden');
            }
            setTimeout(() => {
                loadOdontograma(JSON.parse(data.expediente.odontograma))    
            }, 2000);
            
        }
    })
}


$(document).ready(function() {
  mostrarfoto(idPa);

    loadClasificaciones();
    const urlParams = new URLSearchParams(window.location.search)
    //idExpediente = urlParams.get('id');
    idExpediente = expedienteId;
    //console.log("el id expediente en Plan"+idExpediente);
    getTratamientos()
    comprobarPlan();
    $('#table-plan').DataTable();
    $('#periodontograma').load("./odontograma.html");

} )

$('#regresar').on('click', function () {
    //location.href = "./pacienteEstudiante.html";
    $('#contenido').load("./pacienteEstudiante.html");
  })


function guardarDiagnostico() {
    $.ajax({
        type: 'PUT',
        url: dominio + `createDiagnostico/${idExpediente}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: JSON.stringify({diagnostico: document.getElementById('diagnostico').value}),
        success: function (data) {
            //console.log(data);
            alertify.set('notifier','position', 'top-right');
            alertify.success("Diagnostico guardado");
        }
    })
}
  

function mostrarfoto(idpaciente) {

    $.ajax({
        type: 'GET',
        url: dominio + `patients/buscarfotografia/${idpaciente}`,
        contentType: false,
        processData: false,
        cache: false,
        //dataType: false,
        //crossDomain: true,
        //async: false,
        success: function (data) {
        //console.log(data);

        if (data.expediente.fotografia != null) {

            hideLoaderWTimer();
            document.getElementById("datosPaciente").innerHTML = `<div class="col-xs-12 col-md-6">
                            <div class="row">

                                <div class="col-xs-4">
                                    <p style="font-size: 1.2em"><img width="100px" height="125px" src="data:image/jpg;base64,${data.expediente.fotografia}" alt=""></p>
                                </div>
                                <div class="col-xs-4" style="text-align: left; padding-left: 10px;">
                                <p style="font-size: 1em"><strong>Nombres: ${nombrePaciente} </strong></p>
                                <p style="font-size: 1em"><strong>Apellidos: ${apellidoPaciente}</strong></p>
                                <p style="font-size: 1em"><strong>DPI: ${dpiPaciente} </strong></p>
                                </div>
                            </div>`;
            } else {
            document.getElementById("datosPaciente").innerHTML = `<div class="col-xs-12 col-md-6">
                            <div class="row">

                                <div class="col-xs-4">
                                    <p style="font-size: 1.2em"><img width="100px" height="125px" src="img/fotoperfil.jpg" alt=""></p>
                                </div>
                                <div class="col-xs-4" style="text-align: left; padding-left: 10px;">
                                <p style="font-size: 1em"><strong>Nombres: ${nombrePaciente} </strong></p>
                                <p style="font-size: 1em"><strong>Apellidos: ${apellidoPaciente}</strong></p>
                                <p style="font-size: 1em"><strong>DPI: ${dpiPaciente} </strong></p>
                                </div>
                            </div>`;
            }

        }
    })

}

function guardarOdontograma() {
    let piezas = [];
    for (let i = 18; i >= 11; i--) {
        let caracteristicas = {};
        caracteristicas.pieza = i;
        //console.log(document.getElementById(`tooth_line_${i}_b`));
        if (document.getElementById(`tooth_line_${i}_b`).style.display === 'block') {
            console.log('hola');
            caracteristicas.existencia = 0;
        }else{
            caracteristicas.existencia = 1;
            caracteristicas.movilidad = Number(document.getElementById(`beweglichkeit_${i}_txt`).value);
            if (document.getElementById(`implantat_${i}_tab`).style.display === 'block') {
                caracteristicas.implante = 1;
            }else{
                caracteristicas.implante = 0;
            }
            if (i == 18 || i == 17 || i == 16) {
                if (document.getElementById(`furkation_${i}_b_btn`).style.display != 'none') {
                    caracteristicas.furcacion = getFurkation(i);
                }else{
                    caracteristicas.furcacion = 0;
                }
            }else{
                caracteristicas.furcacion = 0;
            }
            
            if(document.getElementById(`BOP_${i}_db_rectangle`).style.display === 'block'){caracteristicas.sangrado_db = 1;}else{caracteristicas.sangrado_db = 0;}
            if(document.getElementById(`BOP_${i}_b_rectangle`).style.display === 'block'){caracteristicas.sangrado_b = 1;}else{caracteristicas.sangrado_b = 0;} 
            if(document.getElementById(`BOP_${i}_mb_rectangle`).style.display === 'block'){caracteristicas.sangrado_mb = 1;}else{caracteristicas.sangrado_mb = 0;}

            if(document.getElementById(`PI_${i}_db_rectangle`).style.display === 'block'){caracteristicas.placa_db = 1;}else{caracteristicas.placa_db = 0;}
            if(document.getElementById(`PI_${i}_b_rectangle`).style.display === 'block'){caracteristicas.placa_b = 1;}else{caracteristicas.placa_b = 0;} 
            if(document.getElementById(`PI_${i}_mb_rectangle`).style.display === 'block'){caracteristicas.placa_mb = 1;}else{caracteristicas.placa_mb = 0;}
            
            caracteristicas.profundidad_db = Number(document.getElementById(`st_${i}_db_txt`).value);
            caracteristicas.profundidad_b = Number(document.getElementById(`st_${i}_b_txt`).value);
            caracteristicas.profundidad_mb = Number(document.getElementById(`st_${i}_mb_txt`).value);

            caracteristicas.margen_db = Number(document.getElementById(`mg_${i}_db_txt`).value);
            caracteristicas.margen_b = Number(document.getElementById(`mg_${i}_b_txt`).value);
            caracteristicas.margen_mb = Number(document.getElementById(`mg_${i}_mb_txt`).value);

            caracteristicas.margen_dp = Number(document.getElementById(`mg_${i}_dp_txt`).value);
            caracteristicas.margen_p = Number(document.getElementById(`mg_${i}_p_txt`).value);
            caracteristicas.margen_mp = Number(document.getElementById(`mg_${i}_mp_txt`).value);

            caracteristicas.profundidad_dp = Number(document.getElementById(`st_${i}_dp_txt`).value);
            caracteristicas.profundidad_p = Number(document.getElementById(`st_${i}_p_txt`).value);
            caracteristicas.profundidad_mp = Number(document.getElementById(`st_${i}_mp_txt`).value);
            
            if(document.getElementById(`PI_${i}_dp_rectangle`).style.display === 'block'){caracteristicas.placa_dp = 1;}else{caracteristicas.placa_dp = 0;}
            if(document.getElementById(`PI_${i}_p_rectangle`).style.display === 'block'){caracteristicas.placa_p = 1;}else{caracteristicas.placa_p = 0;} 
            if(document.getElementById(`PI_${i}_mp_rectangle`).style.display === 'block'){caracteristicas.placa_mp = 1;}else{caracteristicas.placa_mp = 0;}
            
            if(document.getElementById(`BOP_${i}_dp_rectangle`).style.display === 'block'){caracteristicas.sangrado_dp = 1;}else{caracteristicas.sangrado_dp = 0;}
            if(document.getElementById(`BOP_${i}_p_rectangle`).style.display === 'block'){caracteristicas.sangrado_p = 1;}else{caracteristicas.sangrado_p = 0;} 
            if(document.getElementById(`BOP_${i}_mp_rectangle`).style.display === 'block'){caracteristicas.sangrado_mp = 1;}else{caracteristicas.sangrado_mp = 0;}

            if (i == 18 || i == 17 && i == 16 || i == 14) {
                if (document.getElementById(`furkation_${i}_mp_btn`).style.display != 'none') {
                    caracteristicas.furcacion_dp = getFurkationDP(i);
                    caracteristicas.furcacion_mp = getFurkationMP(i);
                }else{
                    caracteristicas.furcacion_dp = 0;
                    caracteristicas.furcacion_mp = 0;
                }
            }else{
                caracteristicas.furcacion_dp = 0;
                caracteristicas.furcacion_mp = 0;
            }
        }
        piezas.push(caracteristicas);
    }
    for (let i = 21; i < 29; i++) {
        //console.log(document.getElementById(`tooth_line_${i}_b`));
        let caracteristicas = {};
        caracteristicas.pieza = i;
        if (document.getElementById(`tooth_line_${i}_b`).style.display === 'block') {
            console.log('hola');
            caracteristicas.existencia = 0;
        }else{
            caracteristicas.existencia = 1;
            caracteristicas.movilidad = Number(document.getElementById(`beweglichkeit_${i}_txt`).value);
            if (document.getElementById(`implantat_${i}_tab`).style.display === 'block') {
                caracteristicas.implante = 1;
            }else{
                caracteristicas.implante = 0;
            }
            if (i == 28 || i == 27 || i == 26) {
                if (document.getElementById(`furkation_${i}_b_btn`).style.display != 'none') {
                    caracteristicas.furcacion = getFurkation(i);
                }else{
                    caracteristicas.furcacion = 0;
                }
            }else{
                caracteristicas.furcacion = 0;
            }
            
            if(document.getElementById(`BOP_${i}_db_rectangle`).style.display === 'block'){caracteristicas.sangrado_db = 1;}else{caracteristicas.sangrado_db = 0;}
            if(document.getElementById(`BOP_${i}_b_rectangle`).style.display === 'block'){caracteristicas.sangrado_b = 1;}else{caracteristicas.sangrado_b = 0;} 
            if(document.getElementById(`BOP_${i}_mb_rectangle`).style.display === 'block'){caracteristicas.sangrado_mb = 1;}else{caracteristicas.sangrado_mb = 0;}

            if(document.getElementById(`PI_${i}_db_rectangle`).style.display === 'block'){caracteristicas.placa_db = 1;}else{caracteristicas.placa_db = 0;}
            if(document.getElementById(`PI_${i}_b_rectangle`).style.display === 'block'){caracteristicas.placa_b = 1;}else{caracteristicas.placa_b = 0;} 
            if(document.getElementById(`PI_${i}_mb_rectangle`).style.display === 'block'){caracteristicas.placa_mb = 1;}else{caracteristicas.placa_mb = 0;}
            
            caracteristicas.profundidad_db = Number(document.getElementById(`st_${i}_db_txt`).value);
            caracteristicas.profundidad_b = Number(document.getElementById(`st_${i}_b_txt`).value);
            caracteristicas.profundidad_mb = Number(document.getElementById(`st_${i}_mb_txt`).value);

            caracteristicas.margen_db = Number(document.getElementById(`mg_${i}_db_txt`).value);
            caracteristicas.margen_b = Number(document.getElementById(`mg_${i}_b_txt`).value);
            caracteristicas.margen_mb = Number(document.getElementById(`mg_${i}_mb_txt`).value);

            caracteristicas.margen_dp = Number(document.getElementById(`mg_${i}_dp_txt`).value);
            caracteristicas.margen_p = Number(document.getElementById(`mg_${i}_p_txt`).value);
            caracteristicas.margen_mp = Number(document.getElementById(`mg_${i}_mp_txt`).value);

            caracteristicas.profundidad_dp = Number(document.getElementById(`st_${i}_dp_txt`).value);
            caracteristicas.profundidad_p = Number(document.getElementById(`st_${i}_p_txt`).value);
            caracteristicas.profundidad_mp = Number(document.getElementById(`st_${i}_mp_txt`).value);
            
            if(document.getElementById(`PI_${i}_dp_rectangle`).style.display === 'block'){caracteristicas.placa_dp = 1;}else{caracteristicas.placa_dp = 0;}
            if(document.getElementById(`PI_${i}_p_rectangle`).style.display === 'block'){caracteristicas.placa_p = 1;}else{caracteristicas.placa_p = 0;} 
            if(document.getElementById(`PI_${i}_mp_rectangle`).style.display === 'block'){caracteristicas.placa_mp = 1;}else{caracteristicas.placa_mp = 0;}
            
            if(document.getElementById(`BOP_${i}_dp_rectangle`).style.display === 'block'){caracteristicas.sangrado_dp = 1;}else{caracteristicas.sangrado_dp = 0;}
            if(document.getElementById(`BOP_${i}_p_rectangle`).style.display === 'block'){caracteristicas.sangrado_p = 1;}else{caracteristicas.sangrado_p = 0;} 
            if(document.getElementById(`BOP_${i}_mp_rectangle`).style.display === 'block'){caracteristicas.sangrado_mp = 1;}else{caracteristicas.sangrado_mp = 0;}

            if (i == 28 || i == 27 || i == 26 || i == 24) {
                if (document.getElementById(`furkation_${i}_mp_btn`).style.display != 'none') {
                    caracteristicas.furcacion_dp = getFurkationDP(i);
                    caracteristicas.furcacion_mp = getFurkationMP(i);
                }else{
                    caracteristicas.furcacion_dp = 0;
                    caracteristicas.furcacion_mp = 0;
                }
            }else{
                caracteristicas.furcacion_dp = 0;
                caracteristicas.furcacion_mp = 0;
            }
        }
        piezas.push(caracteristicas);
    }
    for (let i = 48; i >= 41; i--) {
        //console.log(document.getElementById(`tooth_line_${i}_b`));
        let caracteristicas = {};
        caracteristicas.pieza = i;
        if (document.getElementById(`tooth_line_${i}_b`).style.display === 'block') {
            console.log('hola');
            caracteristicas.existencia = 0;
        }else{
            caracteristicas.existencia = 1;
            caracteristicas.movilidad = Number(document.getElementById(`beweglichkeit_${i}_txt`).value);
            if (document.getElementById(`implantat_${i}_tab`).style.display === 'block') {
                caracteristicas.implante = 1;
            }else{
                caracteristicas.implante = 0;
            }
            if (i == 48 || i == 47 || i == 46) {
                if (document.getElementById(`furkation_${i}_b_btn`).style.display != 'none') {
                    caracteristicas.furcacion = getFurkation(i);
                }else{
                    caracteristicas.furcacion = 0;
                }
            }else{
                caracteristicas.furcacion = 0;
            }
            
            if(document.getElementById(`BOP_${i}_db_rectangle`).style.display === 'block'){caracteristicas.sangrado_db = 1;}else{caracteristicas.sangrado_db = 0;}
            if(document.getElementById(`BOP_${i}_b_rectangle`).style.display === 'block'){caracteristicas.sangrado_b = 1;}else{caracteristicas.sangrado_b = 0;} 
            if(document.getElementById(`BOP_${i}_mb_rectangle`).style.display === 'block'){caracteristicas.sangrado_mb = 1;}else{caracteristicas.sangrado_mb = 0;}

            if(document.getElementById(`PI_${i}_db_rectangle`).style.display === 'block'){caracteristicas.placa_db = 1;}else{caracteristicas.placa_db = 0;}
            if(document.getElementById(`PI_${i}_b_rectangle`).style.display === 'block'){caracteristicas.placa_b = 1;}else{caracteristicas.placa_b = 0;} 
            if(document.getElementById(`PI_${i}_mb_rectangle`).style.display === 'block'){caracteristicas.placa_mb = 1;}else{caracteristicas.placa_mb = 0;}
            
            caracteristicas.profundidad_db = Number(document.getElementById(`st_${i}_db_txt`).value);
            caracteristicas.profundidad_b = Number(document.getElementById(`st_${i}_b_txt`).value);
            caracteristicas.profundidad_mb = Number(document.getElementById(`st_${i}_mb_txt`).value);

            caracteristicas.margen_db = Number(document.getElementById(`mg_${i}_db_txt`).value);
            caracteristicas.margen_b = Number(document.getElementById(`mg_${i}_b_txt`).value);
            caracteristicas.margen_mb = Number(document.getElementById(`mg_${i}_mb_txt`).value);

            caracteristicas.margen_dp = Number(document.getElementById(`mg_${i}_dl_txt`).value);
            caracteristicas.margen_p = Number(document.getElementById(`mg_${i}_l_txt`).value);
            caracteristicas.margen_mp = Number(document.getElementById(`mg_${i}_ml_txt`).value);

            caracteristicas.profundidad_dp = Number(document.getElementById(`st_${i}_dl_txt`).value);
            caracteristicas.profundidad_p = Number(document.getElementById(`st_${i}_l_txt`).value);
            caracteristicas.profundidad_mp = Number(document.getElementById(`st_${i}_ml_txt`).value);
            
            if(document.getElementById(`PI_${i}_dl_rectangle`).style.display === 'block'){caracteristicas.placa_dp = 1;}else{caracteristicas.placa_dp = 0;}
            if(document.getElementById(`PI_${i}_l_rectangle`).style.display === 'block'){caracteristicas.placa_p = 1;}else{caracteristicas.placa_p = 0;} 
            if(document.getElementById(`PI_${i}_ml_rectangle`).style.display === 'block'){caracteristicas.placa_mp = 1;}else{caracteristicas.placa_mp = 0;}
            
            if(document.getElementById(`BOP_${i}_dl_rectangle`).style.display === 'block'){caracteristicas.sangrado_dp = 1;}else{caracteristicas.sangrado_dp = 0;}
            if(document.getElementById(`BOP_${i}_l_rectangle`).style.display === 'block'){caracteristicas.sangrado_p = 1;}else{caracteristicas.sangrado_p = 0;} 
            if(document.getElementById(`BOP_${i}_ml_rectangle`).style.display === 'block'){caracteristicas.sangrado_mp = 1;}else{caracteristicas.sangrado_mp = 0;}

            if (i == 48 || i == 47 || i == 46) {
                if (document.getElementById(`furkation_${i}_l_btn`).style.display != 'none') {
                    caracteristicas.furcacion_l = getFurkationL(i);
                }else{
                    caracteristicas.furcacion_l = 0;
                }
            }else{
                caracteristicas.furcacion_l = 0;
            }
        }
        piezas.push(caracteristicas);
    }
    for (let i = 31; i < 39; i++) {
        //console.log(document.getElementById(`tooth_line_${i}_b`));
        let caracteristicas = {};
        caracteristicas.pieza = i;
        if (document.getElementById(`tooth_line_${i}_b`).style.display === 'block') {
            console.log('hola');
            caracteristicas.existencia = 0;
        }else{
            caracteristicas.existencia = 1;
            caracteristicas.movilidad = Number(document.getElementById(`beweglichkeit_${i}_txt`).value);
            if (document.getElementById(`implantat_${i}_tab`).style.display === 'block') {
                caracteristicas.implante = 1;
            }else{
                caracteristicas.implante = 0;
            }
            if (i == 38 || i == 37 || i == 36) {
                if (document.getElementById(`furkation_${i}_b_btn`).style.display != 'none') {
                    caracteristicas.furcacion = getFurkation(i);
                }else{
                    caracteristicas.furcacion = 0;
                }
            }else{
                caracteristicas.furcacion = 0;
            }
            
            if(document.getElementById(`BOP_${i}_db_rectangle`).style.display === 'block'){caracteristicas.sangrado_db = 1;}else{caracteristicas.sangrado_db = 0;}
            if(document.getElementById(`BOP_${i}_b_rectangle`).style.display === 'block'){caracteristicas.sangrado_b = 1;}else{caracteristicas.sangrado_b = 0;} 
            if(document.getElementById(`BOP_${i}_mb_rectangle`).style.display === 'block'){caracteristicas.sangrado_mb = 1;}else{caracteristicas.sangrado_mb = 0;}

            if(document.getElementById(`PI_${i}_db_rectangle`).style.display === 'block'){caracteristicas.placa_db = 1;}else{caracteristicas.placa_db = 0;}
            if(document.getElementById(`PI_${i}_b_rectangle`).style.display === 'block'){caracteristicas.placa_b = 1;}else{caracteristicas.placa_b = 0;} 
            if(document.getElementById(`PI_${i}_mb_rectangle`).style.display === 'block'){caracteristicas.placa_mb = 1;}else{caracteristicas.placa_mb = 0;}
            
            caracteristicas.profundidad_db = Number(document.getElementById(`st_${i}_db_txt`).value);
            caracteristicas.profundidad_b = Number(document.getElementById(`st_${i}_b_txt`).value);
            caracteristicas.profundidad_mb = Number(document.getElementById(`st_${i}_mb_txt`).value);

            caracteristicas.margen_db = Number(document.getElementById(`mg_${i}_db_txt`).value);
            caracteristicas.margen_b = Number(document.getElementById(`mg_${i}_b_txt`).value);
            caracteristicas.margen_mb = Number(document.getElementById(`mg_${i}_mb_txt`).value);

            caracteristicas.margen_dp = Number(document.getElementById(`mg_${i}_dl_txt`).value);
            caracteristicas.margen_p = Number(document.getElementById(`mg_${i}_l_txt`).value);
            caracteristicas.margen_mp = Number(document.getElementById(`mg_${i}_ml_txt`).value);

            caracteristicas.profundidad_dp = Number(document.getElementById(`st_${i}_dl_txt`).value);
            caracteristicas.profundidad_p = Number(document.getElementById(`st_${i}_l_txt`).value);
            caracteristicas.profundidad_mp = Number(document.getElementById(`st_${i}_ml_txt`).value);
            
            if(document.getElementById(`PI_${i}_dl_rectangle`).style.display === 'block'){caracteristicas.placa_dp = 1;}else{caracteristicas.placa_dp = 0;}
            if(document.getElementById(`PI_${i}_l_rectangle`).style.display === 'block'){caracteristicas.placa_p = 1;}else{caracteristicas.placa_p = 0;} 
            if(document.getElementById(`PI_${i}_ml_rectangle`).style.display === 'block'){caracteristicas.placa_mp = 1;}else{caracteristicas.placa_mp = 0;}
            
            if(document.getElementById(`BOP_${i}_dl_rectangle`).style.display === 'block'){caracteristicas.sangrado_dp = 1;}else{caracteristicas.sangrado_dp = 0;}
            if(document.getElementById(`BOP_${i}_l_rectangle`).style.display === 'block'){caracteristicas.sangrado_p = 1;}else{caracteristicas.sangrado_p = 0;} 
            if(document.getElementById(`BOP_${i}_ml_rectangle`).style.display === 'block'){caracteristicas.sangrado_mp = 1;}else{caracteristicas.sangrado_mp = 0;}

            if (i == 38 || i == 37 || i == 36) {
                if (document.getElementById(`furkation_${i}_l_btn`).style.display != 'none') {
                    caracteristicas.furcacion_l = getFurkationL(i);
                }else{
                    caracteristicas.furcacion_l = 0;
                }
            }else{
                caracteristicas.furcacion_l = 0;
            }
        }
        piezas.push(caracteristicas);
    }
    //console.log(piezas);

    $.ajax({
        type: 'PUT',
        url: dominio + `insertarOdontograma/${idExpediente}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: JSON.stringify({odontograma: JSON.stringify(piezas)}),
        success: function (data) {
            console.log(data);
        }
    })
}

function getFurkation(i) {
    if (document.getElementById(`furkation_1_${i}_b_tab`).style.display === 'block') {
        return 1;
    } else if (document.getElementById(`furkation_2_${i}_b_tab`).style.display === 'block') {
        return 2;
    } else if (document.getElementById(`furkation_3_${i}_b_tab`).style.display === 'block') {
        return 3;
    }
    return 0;
}

function getFurkationDP(i) {
    if (document.getElementById(`furkation_1_${i}_dp_tab`).style.display === 'block') {
        return 1;
    } else if (document.getElementById(`furkation_2_${i}_dp_tab`).style.display === 'block') {
        return 2;
    } else if (document.getElementById(`furkation_3_${i}_dp_tab`).style.display === 'block') {
        return 3;
    }
    return 0;
}

function getFurkationMP(i) {
    if (document.getElementById(`furkation_1_${i}_mp_tab`).style.display === 'block') {
        return 1;
    } else if (document.getElementById(`furkation_2_${i}_mp_tab`).style.display === 'block') {
        return 2;
    } else if (document.getElementById(`furkation_3_${i}_mp_tab`).style.display === 'block') {
        return 3;
    }
    return 0;
}

function getFurkationL(i) {
    if (document.getElementById(`furkation_1_${i}_l_tab`).style.display === 'block') {
        return 1;
    } else if (document.getElementById(`furkation_2_${i}_l_tab`).style.display === 'block') {
        return 2;
    } else if (document.getElementById(`furkation_3_${i}_l_tab`).style.display === 'block') {
        return 3;
    }
    return 0;
}

   