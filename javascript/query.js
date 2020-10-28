var sHero;
var information;
var accessToken = "3385995988148953";
var unavalaible = "<td id='hero_unavalaible'>No se pudo encontrar al superhéroe solicitado.</td>";
var empty = "<td id='hero_empty'>Ingrese el nombre, o la identidad del superhéroe.</td>";

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
            console.log("Porqqui");
            if (this.readyState == 4 && this.status == 200){
                information = JSON.parse(this.responseText);
                console.log("Llega dentro")
                printInformation();
                
            }
        };

        xmlhttp.open("GET","https://www.superheroapi.com/api.php/"+accessToken+"/search/"+sHero, true);
        xmlhttp.send();
    }
}

function printInformation(){
    var heroTable = document.getElementById("heros");
    console.log("llega")

    var header = "<thead>"+
    "<tr>"+
    "  <th rowspan=\"2\">ID</th>"+
    "  <th rowspan=\"2\">Nombre</th>"+
    "  <th colspan=\"6\">Estadísticas</th>"+
    "  <th colspan=\"4\">Bibliografía</th>"+
    "  <th colspan=\"6\">Apariencia</th>"+
    "</tr>"+
    "<tr>"+
    "  <th>INT</th>"+
    "  <th>STR</th>"+
    "  <th>SPD</th>"+
    "  <th>DUR</th>"+
    "  <th>PWR</th>"+
    "  <th>CBT</th>"+
    "  <th>Nombre Completo</th>"+
    "  <th>Alter-Ego</th>"+
    "  <th>Nacimiento</th>"+
    "  <th>Alineación</th>"+
    "  <th>Género</th>"+
    "  <th>Raza</th>"+
    "  <th>Peso</th>"+
    "  <th>Altura</th>"+
    "  <th>Ojos</th>"+
    "  <th>Cabello</th>"+
    "</tr>"+
  "</thead>";

    heroTable.innerHTML = header;
}

function paging(){

}