/*
Dada una cadena de entrada que tiene valores separados por espacios, se desea decir si son números o si son texto. Si son número muestra num, si son cadenas fuestra text. 

1 a 3.2 a2

Respuesta:
1=num
a=text
3.2=num
a2=text
*/

function processData(input) {
    //Enter your code here
    inputSplit = input.split(" ");
    for (let i=0;i<inputSplit.length;i++){
        if (isNaN(inputSplit[i])){
            console.log(inputSplit[i]+'=text');
        } else {
            console.log(inputSplit[i]+'=num');
        }
    }
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