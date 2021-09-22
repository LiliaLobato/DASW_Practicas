/*
Se recibirá un listado de valores separados por espacio, se desea que primero se muestren los números y luego las cadenas de texto. Deben enlistarse en el orden como aparecen en la cadena de entrada. 

1 hola 3 a2 hola4 2

salida:
1
3
2
hola
a2
hola4
*/

function processData(input) {
    //Enter your code here
    let str='';
    let num='';
    inputSplit = input.split(" ");
    for (let i=0;i<inputSplit.length;i++){
        if (isNaN(inputSplit[i])){
            str=str.concat(inputSplit[i],'\n');
        } else {
            num=num.concat(inputSplit[i],'\n');
        }
    }
    console.log(num+str);
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});