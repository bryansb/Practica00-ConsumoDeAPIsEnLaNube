var information;

var maxPages;
var currentPage = 0;

var ACCESSTOKEN = "3385995988148953";
var N = 3;

var unavalaible = "<td id='hero_unavalaible'>No se pudo encontrar al superhéroe solicitado.</td>";
var empty = "<td id='hero_empty'>Ingrese en el buscador el nombre de un superhéroe o supervillano.</td>";

function search(){
    var sHero = document.getElementById("hero").value;

    if (sHero == "") {
        document.getElementById("heros").innerHTML = empty;
        hideNavigation();
    } else {
        if (window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                information = JSON.parse(this.responseText);
                currentPage = 0;
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
    container.classList.remove("hidden");
    var navigation = " ";
    var auxPages;

    // Indice
    navigation += "<a href='#' class='normal' onclick='return false;'>Página "+(currentPage+1)+" de "+(maxPages+1)+"</a>"

    // Posicion de inicio
    if (currentPage == 0) {
        navigation += "<a href='#' class='disabled' onclick='return false;'>Anterior</a>";
    } else {
        navigation += "<a href='#' class='normal' onclick='previousPage()'>Anterior</a>";
    }

    // Numeros intermedios
    navigation += "<a href='#' class='selected' onclick='return false;'>"+(currentPage+1)+"</a>";

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

function hideNavigation () {
    var container = document.getElementById("pages-numbers");
    container.classList.add("hidden");
}