let btnIncrementar = document.getElementById('btnIncrementar');
let btnDecrementar = document.getElementById('btnDecrementar');
let myP = document.getElementById('myP');

btnDecrementar.onclick = decrementar;

function incrementar() {
    let valor = Number(myP.innerText);
    valor++;
    myP.innerText = valor;
}

function decrementar() {
    let valor = Number(myP.innerText);
    valor--;
    myP.innerText = valor;
}