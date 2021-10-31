let btnIncrementar = document.getElementById('btnIncrementar');
let btnDecrementar = document.getElementById('btnDecrementar');
let myP = document.getElementById('myP');
let pCuenta = document.getElementById('pCuenta');

btnDecrementar.onclick = decrementar; // <button onclick="decrementar()">

btnIncrementar.addEventListener('click', cuentaClicks);
btnDecrementar.addEventListener('click', cuentaClicks);

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

function cuentaClicks() {
    let valor = Number(pCuenta.innerText);
    valor++;
    pCuenta.innerText = valor;
}