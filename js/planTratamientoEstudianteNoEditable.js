

  var clasificaciones = [
     {text: 'Diagnóstico', value: 1, tratamientos: []},
     {text: 'Radiología', value: 2, tratamientos: []},
     {text: 'Periodoncia', value: 3, tratamientos: []},
     {text: 'Cirugía', value: 4, tratamientos: []},
     {text: 'Endodoncia', value: 5, tratamientos: []},
     {text: 'Operatoria', value: 6, tratamientos: []},
     {text: 'Restaurativa', value: 7, tratamientos: []},
     {text: 'Odontopediatría', value: 8, tratamientos: []}
   ];



var tratamientos = [];
var estadoExpediente = 0;
//var idExpediente = 0;


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

function goToExpediente() {
    //location.href = './expedienteEstudianteNoEditable.html?id='+idExpediente;
    if (estadoExpediente == 1) {
        $('#contenido').load("expedienteEstudianteNoEditable.html");
    } else {
        $('#contenido').load("expediente.html");    
    }
    
}

function goToRadiografia() {
    $('#contenido').load("radiografiaNoEditable.html");
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
           console.log(data)
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
                    <td>${(element.estado == 0)?
                        `<button class="btn btn-primary btn-sm" onclick="changeEstadoTratamiento('${element.id_detalle_procedimiento_tratamiento}','1')">Solicitar aprobación</button>`
                        :   
                        (element.estado == 1)?
                            '<button class="btn btn-danger btn-sm" disabled>Pendiente de aprobación</button>'
                        :
                        (element.estado == 2)?
                            '<button class="btn btn-info btn-sm" onclick="goToCalendario()">Programar cita</button>'
                        :
                        (element.estado == 3)?
                            `<button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#detalleModal" data-id="${element.id_detalle_procedimiento_tratamiento}" data-tratamiento="${element.descripcion}" data-costo="${element.valor}" data-estado="${element.estado}">Ver detalles</button>`
                        :
                        (element.estado == 4 || element.estado == 5)?
                            `<button class="btn btn-info btn-sm" data-toggle="modal" data-target="#detalleModal" data-id="${element.id_detalle_procedimiento_tratamiento}" data-tratamiento="${element.descripcion}" data-costo="${element.valor}" data-estado="${element.estado}">Ver detalles</button>`
                        :
                            `<button class="btn btn-success btn-sm" data-toggle="modal" data-target="#detalleModal" data-id="${element.id_detalle_procedimiento_tratamiento}" data-tratamiento="${element.descripcion}" data-costo="${element.valor}" data-estado="${element.estado}">Ver detalles</button>`
                    }
                    </td>
                    
                    
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
        idusuario: 1,
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

            }
        })
    },
    function(){
        alertify.set('notifier','position', 'top-right');
        alertify.error('Cancelado');
    }).set('labels', {ok:'Sí', cancel:'Cancelar'});

}


$(document).ready(function() {
    loadClasificaciones();
    const urlParams = new URLSearchParams(window.location.search)
    //idExpediente = urlParams.get('id');
    idExpediente = expedienteId;
    //idExpediente = expedienteId;
    //console.log("el id expediente en Plan"+idExpediente);
    getTratamientos()
    comprobarPlan();
    $('#table-plan').DataTable();

} )

function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1000);

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
            console.log(data);
            document.getElementById('diagnostico').value = data.expediente.diagnostico;
            estadoExpediente = data.expediente.aprobar_expediente;
            idPaciente = data.expediente.idpaciente;
            if (data.expediente.aprobar_plan == 1) {
                document.getElementById('aprobar').removeAttribute('hidden');
            }
        }
    })
}

function cambioEstadoPlan(estado) {
    $.ajax({
        type: 'PUT',
        url: dominio + `updateExpedientePlan/${idExpediente}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: JSON.stringify({estado: estado}),
        success: function (data) {
            //console.log(data);
            if (estado == 1) {
                document.getElementById('aprobar').setAttribute('hidden','');
                document.getElementById('aprobarBloqueo').removeAttribute('hidden');
            } else {
                document.getElementById('aprobarBloqueo').setAttribute('hidden','');
                document.getElementById('aprobar').removeAttribute('hidden');
            }
        }
    })
}

$('#regresar').on('click', function () {
    //location.href = "./pacienteEstudiante.html";
    $('#contenido').load("./pacienteEstudiante.html");
  })


function changeEstadoTratamiento(id, estado) {
    $.ajax({
        type: 'PUT',
        url: dominio + `detalleProcedimientoTratamiento/update/${id}/${estado}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        success: function (data) {
            //console.log(data);
            //location.reload();
            alertify.set('notifier','position', 'top-right');
            if (Number(estado) == 1) {
                $('#contenido').load("./planTratamientoEstudianteNoEditable.html");
                alertify.success("Solicitud enviada");    
            }else if(Number(estado) == 5){
                alertify.success("Solicitud enviada");
                document.getElementById('boton-solicitud').setAttribute('hidden', "");
                document.getElementById('boton-pendiente').removeAttribute('hidden');
            }
            
        }
    })
}

function goToCalendario(){
    idPersonal = idPaciente;
    //idUsuario = 1;
    //location.href = "./calendario.html";
    $('#contenido').load("./calendario.html");
}


$('#detalleModal').on('show.bs.modal', function (event) {
    showLoader();
    var data_modal = $(event.relatedTarget) // Button that triggered the modal
    //console.log(data_modal);
    if (Number(data_modal.data('estado')) == 4) {
        document.getElementById('boton-cobrar').setAttribute('hidden', "");
        document.getElementById('boton-pagado').removeAttribute('hidden');
        document.getElementById('boton-solicitud').removeAttribute('hidden');
        document.getElementById('boton-solicitud').setAttribute('onclick', `changeEstadoTratamiento('${data_modal.data('id')}', '5')`);
    }else if (Number(data_modal.data('estado')) == 5)  {
        document.getElementById('boton-cobrar').setAttribute('hidden', "");
        document.getElementById('boton-pagado').removeAttribute('hidden');
        document.getElementById('boton-solicitud').setAttribute('hidden', "");
        document.getElementById('boton-pendiente').removeAttribute('hidden');
    }else if (Number(data_modal.data('estado')) == 6)  {
        document.getElementById('boton-cobrar').setAttribute('hidden', "");
        document.getElementById('boton-pagado').removeAttribute('hidden');
        document.getElementById('boton-solicitud').setAttribute('hidden', "");
        document.getElementById('boton-pendiente').setAttribute('hidden', "");
        document.getElementById('boton-avalado').removeAttribute('hidden');
    }
    let id_tratamiento = data_modal.data('id');
    document.getElementById('tratamiento').textContent = data_modal.data('tratamiento');
    document.getElementById('costo').textContent = 'Q'+data_modal.data('costo');
    $.ajax({
        type: 'GET',
        url: dominio + `citas/consultarDPT/${id_tratamiento}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        success: function (data) {
            //console.log(data.cita);
            document.getElementById('fecha').textContent = getFecha(data.cita.fecha);
            document.getElementById('horario').textContent = String(data.cita.hora).substring(0,5) + ' Hrs.';
            
            $.ajax({
                type: 'GET',
                url: dominio + `boleta/consultaCreditoTotal/${idPaciente}`,
                contentType: 'application/json',
                dataType: 'json',
                crossDomain: true,
                async: false,
                success: function (data) {
                    //console.log(data);
                    document.getElementById('cuenta').textContent = 'Q'+data.pago.credito;
                    document.getElementById('boton-cobrar').setAttribute('onclick', `postCobro("${data_modal.data('tratamiento')}", "${data_modal.data('costo')}", "${data.pago.credito}","${id_tratamiento}")`);
                    hideLoaderWTimer();
                }
            })
        }
    })
    /**/
    //document.getElementById('').textContent = ;
    
})

function postCobro(tratamiento, monto, credito, id_tratamiento) {
    if (Number(credito) >= Number(monto)) {
        showLoader();
        let data = {idpaciente: idPaciente, monto: monto, descripcion: 'Debito por tratamiento '+tratamiento, id_detalle_procedimiento_tratamiento: id_tratamiento};
        $.ajax({
            type: 'POST',
            url: dominio + `pagos`,
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            async: false,
            data: JSON.stringify(data),
            success: function (data) {
                //console.log(data);
                document.getElementById('cuenta').textContent = 'Q'+(Number(credito) - Number(monto));
                $('#detalleModal').modal('hide');
                hideLoader();
                $('#contenido').load("./planTratamientoEstudianteNoEditable.html");
            }
        })    
    } else {
        document.getElementById('alert_form').style.display = 'block';
    }
    


    
}

