'use strict';

let game = {
    rows: 0,
    cols: 0,
    title :"",
    topics : [], // arreglo de strings que tendrá los títulos de los temas
    questions: []
}

// Aquí obten el input de titulo
let title = document.getElementById('titleInput');
// Aquí busca y guarda el elemento del botón de Generar Tablero
let btnBoard = document.getElementById('boardGenerator');
// Aquí busca y guarda el elemento del botón de Generar JSON
let btnJson = document.getElementById('jsonGenerator');
// aquí guarda la única tabla en el html (no tiene id)
let mainTable = document.body.getElementsByTagName("table")[0];
// aquí guarda el botón de guardar de la ventana modal.
let btnSave = document.getElementById('modalBoard');
// Aquí guarda las  divisiones del modal
let theme = document.getElementsByClassName('theme');
let question = document.getElementsByClassName('question');
let json = document.getElementsByClassName('json');

// almacenará la celda actual (cuando den clic en algún link a editar)
let cell;  // esta variable se usará después en la función de requestData()
let rowIdx;
let colIdx;

// añade un handler a keyup para que cuando el titulo tenga texto se active el boton
//  y si no tiene que se desactive  (añade o quita la clase disabled)
title.addEventListener('keyup', (event) => {
    //TODO: cuando está vacio entonces se deshabilita de nuevo?
    btnBoard.classList.remove('disabled');
    if(title.value=="") {
        btnBoard.classList.add('disabled');
        btnJson.classList.add('disabled');
        mainTable.hidden = true;
    }
})

/*
*  Aquí añadele al botón de btnBoard un handler del evento 
*  click a la función generateGameBoard
*/
btnBoard.onclick = generateGameBoard;

/* la función generar tablero:
*  guarda en el objeto game los valores de titulo, row y cols
*  además muestra la tabla pero oculta los renglones y columnas no necesarios
*/
function generateGameBoard(event) {
    console.log('generateGameBoard')

    // guarda en las variables rows, y cols los elementos correspondientes del html
    let rows = Number(document.getElementById('rowsInput').value);
    let cols = Number(document.getElementById('colsInput').value);

    // muestra la tabla (propiedad hidden)
    mainTable.removeAttribute('hidden');

    // guarda el titulo en el objeto game
    game.title = title.value;

    let maxCnt = 4;
    let minCnt = 2;
    // guarda los valores  (si rows o cols es > 4 dejala en 4 si es menor a 2 dejala en 2)
    if (rows > maxCnt) game.rows = maxCnt;
    else if (rows < minCnt) game.rows = minCnt;
    else game.rows = rows;
    rows=game.rows;
    document.getElementById('rowsInput').value = game.rows

    if (cols > maxCnt) game.cols = maxCnt;
    else if (cols < minCnt) game.cols = minCnt;
    else game.cols = cols;
    cols = game.cols;
    document.getElementById('colsInput').value = game.cols


    // crea el arreglo de temas en el objeto game
    game.topics=[];
    game.questions=[];
    let rowQues = [];
    let colQues = [];
    let next = 0;
    for (let col = 1; col<cols+1; col++){
        game.topics.push(mainTable.getElementsByTagName("th")[col].innerText)
        // crea la matriz de preguntas en el objeto game
        for (let row = 1; row<rows+1; row++){
            rowQues.push("")
        }
        colQues.push(rowQues);
        rowQues = [];
        next += maxCnt+1;
    }
    game.questions = colQues;

    // oculta renglones y columnas innecesarios
    // muestra todo (tr, td y th) 
    let colND = document.querySelectorAll("table td");
    let colNH = document.querySelectorAll("table th");
    for (let cell of colND) cell.style.display = "";
    for (let cell of colNH) cell.style.display = "";

    // selecciona los reglones usando nth-of-type(n+ algo ) y oculta
    for (let col = 1; col<cols+2; col++){
        let colND = document.querySelectorAll("table td:nth-of-type("+col+")");
        let cnt = 1;
        for (let cell of colND){
            if(cnt>rows) cell.style.display = "none";
            cnt += 1;
        } 
    }
    // selecciona las columnas usando nth-of type(n+ algo ) para td y th
    for (let col = maxCnt+1; col>cols+1; col--){
        let colND = document.querySelectorAll("table td:nth-of-type("+col+")");
        let colNH = document.querySelectorAll("table th:nth-of-type("+col+")");
        for (let cell of colND) cell.style.display = "none";
        for (let cell of colNH) cell.style.display = "none";
    }

    // activar botón de generateJson
    btnJson.classList.remove('disabled');

    // regresa falso o usa
    // event.preventDefault();
    return false;

}

// Aquí asocia evento click a la función requestData(event)
    mainTable.onclick = requestData;

// completa la función requestData(event)
function requestData(event){
    // filtrar, si no son tipo anchor Tag salirse de la función
    if (event.target.nodeName != "A") return;
    // actualiza la variable cell (que sea una celda tipo td o th)
    cell=event.target.closest("td");
    for (let elem of theme) elem.setAttribute("hidden",true)
    for (let elem of question) elem.setAttribute("hidden",true)
    for (let elem of json) elem.setAttribute("hidden",true)

    // si están en un TH mostrar el modal solo la parte de la temática
    // Añade al valor el tema que se tiene guardado en el objeto
    if(cell == null){ 
        let cellTH=event.target.closest("th");
        colIdx=cellTH.cellIndex - 1 
        for (let elem of theme) {
            elem.removeAttribute("hidden")
            elem.querySelector("input").value = game.topics[colIdx]
        }

    } else {
        // si están en un TD mostrar el modal solo la parte de la pregunta
        // Muestra el Tema y el valor
        // Muestra el valor de la pregunta
        rowIdx=event.target.closest("tr").rowIndex - 1
        colIdx=event.target.closest("td").cellIndex - 1  
        for (let elem of question){
            elem.removeAttribute("hidden")
            elem.querySelectorAll("p")[0].innerText = 
                "Tema: " + game.topics[colIdx]
            elem.querySelectorAll("p")[1].innerText = 
                "Valor: " + document.querySelectorAll("table td:nth-of-type(1)")[rowIdx].innerText
            elem.querySelectorAll("textarea")[0].value = 
                game.questions[rowIdx][colIdx]
        }
    }


}

// Aquí asocia al btnJson el handler al hacer click con la función generateJson
    btnJson.onclick = generateJson;


// completa la función
function generateJson(event){
    // que solo muestre lo necesario para ver el JSON en la ventana modal
    for (let elem of theme) elem.setAttribute("hidden",true)
    for (let elem of question) elem.setAttribute("hidden",true)
    for (let elem of json) elem.removeAttribute("hidden")

    //Revisamos si es necesario actualizar titulo
    game.title=title.value;
    document.getElementById('textJson').value=JSON.stringify(game);

    return false;
}

// aquí asocia a btnSave
    btnSave.onclick = saveData

function saveData(event) {
    //  realiza las operaciones dependiendo en caso de pregunta o tema
    if (event.target.nodeName != "BUTTON" || event.target.id != "btnSave") return;
    let inTheme; 
    let inQuestion;
    for (let elem of theme) inTheme = !(elem.hasAttribute("hidden"))
    for (let elem of question) inQuestion = !(elem.hasAttribute("hidden"))

    if(inTheme){
        for (let elem of theme) {
            game.topics[colIdx] = elem.querySelector("input").value
            mainTable.getElementsByTagName("a")[colIdx].innerText = game.topics[colIdx]
        }
    }else if(inQuestion){
        console.log("saving question") 
        for (let elem of question){
            game.questions[rowIdx][colIdx] = 
                elem.querySelectorAll("textarea")[0].value 
            document.querySelectorAll("table td:nth-of-type("+(colIdx+2)+")")[rowIdx].style.backgroundColor = "#9ac6ed"
        }
    }
}

// Para responder al click en los temas
// Elemento a con atributo data-darget dentro de un th
//function clickOnTopic(event) {
    // event.target.innerText = 'Hola mundo';
    // event.preventDefault();
//}
