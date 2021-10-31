let txtNumber = document.getElementById('txtNumber');
let txtName = document.getElementById('txtName');
let myTable = document.getElementById('myTable');
let btnAdd = document.getElementById('btnAdd');

btnAdd.addEventListener('click', addRow);

function addRow() {
    let tr = document.createElement('tr');
    let tdNumber = document.createElement('td');
    let tdName = document.createElement('td');

    tdNumber.innerText = txtNumber.value;
    tdName.innerText = txtName.value

    tr.append(tdNumber);
    tr.append(tdName);

    myTable.append(tr);
}

let txt1 = document.getElementById('txt1');
let p1 = document.getElementById('p1');

txt1.addEventListener('keyup', (event) => {
    p1.innerText = txt1.value;
})