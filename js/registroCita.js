var idExpediente = '';
var tratamientos = [];

$(document).ready(function() {
    //const urlParams = new URLSearchParams(window.location.search)
    idExpediente = expedienteId;
    //console.log(expedienteId);
    //console.log(idPersonal);
    //let fecha = String(urlParams.get('fecha'));
    let fecha = fechaNuevaCita;
    //console.log(fecha);
    document.getElementById('fecha').value = fecha;
    getTratamientos(idExpediente);
    getCitas(idUsuario,fecha);

    $('#table4').DataTable({
        language: {
            search: "Buscar:",
          "info": "Mostrando del _START_ a _END_ de _TOTAL_ registros",
          "lengthMenu":     "Mostrar _MENU_ registros",
          "zeroRecords":    "No se encontro ningun registro",
          "infoEmpty":      "0 registros",
        "infoFiltered":   "(filtrados de _MAX_ registros)",
            paginate: {
                first:      "Primero",
                previous:   "Anterior",
                next:       "Siguiente",
                last:       "Ultimo"
            }
          }
      });
} )

function registroCita() {
    let tra = document.getElementById('tratamiento');

    //console.log(tra);
    let idtratamiento = $("#tratamiento").val();
    //tratamiento = $('select[name="tratamiento"] option:selected').text();
    let fecha = $("#fecha").val();
    let hora = $("#horario").val();
    let data = {idpaciente: Number(idPersonal),
        id_detalle_procedimiento_tratamiento: Number(idtratamiento),
        fecha: fecha,
        doctor: 'alguno jeje',
        hora: hora
    };
    $.ajax({
        type: 'POST',
        url:  dominio + "citas/crear",
        contentType: "application/json",
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: JSON.stringify(data),
        success: function (data) {
            //console.log(data);
            /*
            let tratamiento = tratamientos.filter(x => x.id_detalle_procedimiento_tratamiento == idtratamiento)[0];
            let fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${tratamiento.descripcion}</td>
                <td>${tratamiento.pieza}</td>
                <td>${tratamiento.valor}</td>
                <td>${String(fecha).substring(8,10)+'/'+String(fecha).substring(5,7)+'/'+String(fecha).substring(0,4)}</td>
                <td>${hora}</td>
                <td><button class="btn btn-danger btn-sm" onclick="eliminarCita(this, ${idtratamiento})">Eliminar</button></td>
               `
            document.getElementById('table-tratamientos').appendChild(fila);
            $('#tratamiento').prop('selectedIndex',0);
            document.getElementById('pieza').value = '';
            document.getElementById('valor').value = '';*/
            //location.reload();
            $('#contenido').load("./registroCita.html");
            //console.log(data);
            alertify.set('notifier','position', 'top-right');
            if (Number(data.estado) == 3) {
                alertify.success("Cita registrada");    
            }
        }
    });
}

function getCitas(idusuario, fecha) {
    $.ajax({
        type: 'GET',
        url:  dominio + `citas/consultaridUsuario/${idusuario}/${fecha}`,
        contentType: "application/json",
        dataType: 'json',
        crossDomain: true,
        async: false,
        success: function (data) {
            let citas = data.citas;
            //console.log(data.citas);
            //document.getElementById('table-tratamientos').getElementsByTagName('tr')[0].remove();
            citas.forEach(element => {
                let fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${element.nombres} ${element.apellidos}</td>
                    <td>${element.descripcion}</td>
                    <td>${element.pieza}</td>
                    <td>${element.valor}</td>
                    <td>${String(element.fecha).substring(8,10)+'/'+String(element.fecha).substring(5,7)+'/'+String(element.fecha).substring(0,4)}</td>
                    <td>${element.hora}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="eliminarCita(this, '${element.id_detalle_procedimiento_tratamiento}', '${element.idcita}')">Eliminar</button></td>
                `
                document.getElementById('table-tratamientos').appendChild(fila);
            });
        }
    });
}

$("#registro-cita").on('click', function () {
    //login(tipoCuenta);
    registroCita();
});

function getTratamientos(idExpediente) {
    //console.log('hola');
    $.ajax({
        type: 'GET',
        url:  dominio + `buscardetalleProcedimientoEstado2/${idExpediente}`,
        contentType: "application/json",
        dataType: 'json',
        crossDomain: true,
        async: false,
        success: function (data) {
            //console.log(data);
            if (data.tratamientos != undefined) {
                tratamientos = data.tratamientos;

                tratamientos.forEach(element => {
                    let opcion = document.createElement('option');
                    opcion.value = element.id_detalle_procedimiento_tratamiento;
                    opcion.textContent = element.descripcion;
                    //console.log(opcion);
                    document.getElementById('tratamiento').appendChild(opcion);
                });
            }
            hideLoader();
        }
    });
}


function eliminarCita(e, iddetalle, idcita) {
    $.ajax({
        type: 'DELETE',
        url:  dominio + `citas/eliminar/${idcita}`,
        contentType: "application/json",
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: JSON.stringify({iddetalle: iddetalle}),
        success: function (data) {
            //console.log(data);
            //location.reload();
            $('#contenido').load("./registroCita.html");
            alertify.set('notifier','position', 'top-right');
            alertify.success("Cita eliminada");
        }
    });
}

function setTratamiento(e) {
    //console.log(e.value);
    let tratamiento = tratamientos.filter(x => x.id_detalle_procedimiento_tratamiento == e.value)[0];
    if (tratamiento) {
        //console.log(tratamiento);
        document.getElementById('pieza').value = tratamiento.pieza;
        document.getElementById('valor').value = tratamiento.valor;
    }
}

$('#regresar').on('click', function () {
    //location.href = "./pacienteEstudiante.html";
    $('#contenido').load("./calendario.html");
  })