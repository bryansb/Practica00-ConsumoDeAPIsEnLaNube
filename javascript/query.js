var sHero;
var s;
var unavalaible = "<span id='hero_unavalaible'>No se pudo encontrar al superhéroe solicitado.</span>";
var empty = "<span id='hero_empty'>Ingrese el nombre, o la identidad del superhéroe.</span>";

function search(){
    sHero = document.getElementById("hero").value;

    if (sHero == "") {
        document.getElementById("heros").innerHTML = empty;
    } else {
        if (window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                lyrics = JSON.parse(this.responseText);
                
            }
        }
    }
}

function paging(){

}