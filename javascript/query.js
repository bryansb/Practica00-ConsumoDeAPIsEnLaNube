var sHero;
var information;

var maxPages;
var currentPage = 0;

var ACCESSTOKEN = "3385995988148953";
var N = 1;

var unavalaible = "<td id='hero_unavalaible'>No se pudo encontrar al superhéroe solicitado.</td>";
var empty = "<td id='hero_empty'>Ingrese el nombre, o la identidad del superhéroe.</td>";

function search(){
    sHero = document.getElementById("hero").value;
    currentPage = 0;

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
                information = JSON.parse(this.responseText);
                printInformation();
            }
        };

        xmlhttp.open("GET","https://www.superheroapi.com/api.php/"+ACCESSTOKEN+"/search/"+sHero, true);
        xmlhttp.send();
    }
}

function printInformation(){
    var heroTable = document.getElementById("heros");

    var header = "<thead>"+
    "<tr>"+
    "  <th rowspan=\"2\">ID</th>"+
    "  <th rowspan=\"2\">Nombre</th>"+
    "  <th class='td-img' rowspan=\"2\">Foto</th>"+
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
  "</thead>"+
  "<tbody>";

    heroTable.innerHTML = header;

    maxPages = Math.trunc((information.results.length - 1) / N);
    var min = currentPage * N;
    var max = min + (N - 1);

    var infoHero = getHeroInfo(min, max, information);

    printNavigation();

    heroTable.innerHTML += infoHero + "</tbody>";

}

function getHeroInfo (minP, maxP, information) {
    var heroes = "";    

    for(var i=minP; i <= maxP; i++){
        heroes += "<tr>";

        heroes += "<td>"+information.results[i].id+"</td>"+
        "<td>"+information.results[i].name+"</td>"+
        "<td class='td-img' ><img src='"+information.results[i].image.url+"' alt='"+information.results[i].name+"' /></td>"+
        "<td>"+information.results[i].powerstats.intelligence+"</td>"+
        "<td>"+information.results[i].powerstats.strength+"</td>"+
        "<td>"+information.results[i].powerstats.speed+"</td>"+
        "<td>"+information.results[i].powerstats.durability+"</td>"+
        "<td>"+information.results[i].powerstats.power+"</td>"+
        "<td>"+information.results[i].powerstats.combat+"</td>"+
        "<td>"+information.results[i].biography['full-name']+"</td>"+
        "<td>"+information.results[i].biography['alter-egos']+"</td>"+
        "<td>"+information.results[i].biography['place-of-birth']+"</td>"+
        "<td>"+information.results[i].biography['alignment']+"</td>"+
        "<td>"+information.results[i].appearance.gender+"</td>"+
        "<td>"+information.results[i].appearance.race+"</td>"+
        "<td>"+information.results[i].appearance.height['1']+"</td>"+
        "<td>"+information.results[i].appearance.weight['0']+"</td>"+
        "<td>"+information.results[i].appearance['eye-color']+"</td>"+
        "<td>"+information.results[i].appearance['hair-color']+"</td>";

        heroes += "</tr>"
    }

    return heroes;
}

function printNavigation () {
    var container = document.getElementById("pages-numbers");
    var navigation = " ";

    // Posicion de inicio
    if (currentPage == 0) {
        navigation += "<a href='#' class='disabled' onclick='return false;'>Anterior</a>";
    } else {
        navigation += "<a href='#' class='normal' onclick='previousPage()'>Anterior</a>";
    }

    // Numeros intermedios
    for (var i = 0; i <= maxPages; i++) {
        if (i == currentPage) {
            navigation += "<a href='#' class='selected'>"+(i+1)+"</a>";
        } else {
            navigation += "<a href='#' class='normal'>"+(i+1)+"</a>";
        }
    }

    // Posicion al final
    if (currentPage == maxPages) {
        navigation += "<a href='#' class='disabled' onclick='return false;'>Siguiente</a>";
    } else {
        navigation += "<a href='#' class='normal' onclick='nextPage()'>Siguiente</a>";
    }

    container.innerHTML = navigation;
}

function nextPage(){
    var aux = currentPage + 1;

    if (aux > maxPages) {
        currentPage = currentPage;
    } else {
        currentPage = aux;
    }

    printInformation();

    return false;
}

function previousPage(){
    var aux = currentPage - 1;

    if (aux < 0) {
        currentPage = 0;
    } else {
        currentPage = aux;
    }

    printInformation();

    return false;
}

function currentPage() {
    
}