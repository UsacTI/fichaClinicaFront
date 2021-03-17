// Kontakt öffnen
function open_kontakt() {
    var modal_kontakt = document.getElementById("modal_kontakt");
    
    document.getElementById('modal_kontakt').style.display = 'block';

    window.onclick = function(event_kontakt) {
        if (event_kontakt.target == modal_kontakt) {
            document.getElementById('modal_kontakt').style.display = 'none';
        }
    }
}

// Kontakt schliessen
function close_kontakt() {
    document.getElementById('modal_kontakt').style.display = 'none';
}