$(document).ready(function () {

if(tipoUsuario == 2){

  $("#cargarRadio").hide();
}
else if(tipoUsuario == 3){

  $("#cargarRadio").show();
}
//console.log("expedientID radiografia" +idExpediente);
expedienteId = idExpediente;

});



function goToExpediente() {
    $('#contenido').load("expediente.html");
}

function goToPlanTratamiento() {
    $('#contenido').load("planTratamiento.html");
}

function mostrar(){
  var archivo = document.getElementById("radio").files[0];
  var reader = new FileReader();
  if (file) {
    reader.readAsDataURL(archivo );
    reader.onloadend = function () {
      document.getElementById("img").src = reader.result;
    }
  }
}

function mostrar(){
  var archivo = document.getElementById("file").files[0];
  var reader = new FileReader();
  if (file) {
    reader.readAsDataURL(archivo );
    reader.onloadend = function () {
      document.getElementById("img").src = reader.result;
      obtenerBase(reader.result);

    }
  }
}

function obtenerBase(base){

  console.log(base.length);
  testCompression(base, 'deflate');

}


function compress(string, encoding) {
  const byteArray = new TextEncoder().encode(string);
  const cs = new CompressionStream(encoding);
  const writer = cs.writable.getWriter();
  writer.write(byteArray);
  writer.close();
  return new Response(cs.readable).arrayBuffer();
}

function decompress(byteArray, encoding) {
  const cs = new DecompressionStream(encoding);
  const writer = cs.writable.getWriter();
  writer.write(byteArray);
  writer.close();
  return new Response(cs.readable).arrayBuffer().then(function (arrayBuffer) {
    return new TextDecoder().decode(arrayBuffer);
  });
}

async function testCompression(text, encoding = 'deflate') {
  console.log(encoding + ':');
  console.time('compress');
  const compressedData = await compress(text, encoding);
  console.timeEnd('compress');
  console.log('compressed length:', compressedData.byteLength, 'bytes');
  console.time('decompress');
  const decompressedText = await decompress(compressedData, encoding);
  console.timeEnd('decompress');
  console.log('decompressed length:', decompressedText.length, 'characters');
  console.assert(text === decompressedText);
}