$(document).ready(function() {
    console.log(document.getElementById('sidebar-menu'));
    let li = document.createElement('li');
    li.innerHTML="<a href=\"#homeSubmenu\">Inicio</a>";
    document.getElementById('sidebar-menu').appendChild(li);
    li = document.createElement('li');
    li.innerHTML="<a href=\"#pacientes\">Pacientes</a>";
    document.getElementById('sidebar-menu').appendChild(li);
    li = document.createElement('li');
    li.innerHTML="<a href=\"#bancoPacientes\">Banco de Pacientes</a>";
    document.getElementById('sidebar-menu').appendChild(li);
    console.log(li);
} )