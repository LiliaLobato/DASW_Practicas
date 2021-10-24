tab1.onclick = function (event) {
    if (event.target.nodeName != "TD") return;

    //tr padre más cercano
    let row = event.target.closest("tr");
    console.log("Fila numero " + row.rowIndex);
}