/*
Dada una serie de letras conocidas como diccionario y un código que dice cuales caracteres del diccionario forman una palabra. Se desea convertir esos números en las letras y observar la palabra que representan.

Ejemplo:  diccionario de palabras  A V L E H O
          indices: 4 5 2 0         0 1 2 3 4 5
          resultado = HOLA
          

En este ejemplo la letra A = 0, V = 1, L=2, E=3, H=4, O=5, 
por lo que si se reciben los indices 4520, se quiere el 4=H,5=O,2=L,0=A 
este código 4520 significa HOLA
*/

function processData(input) {
    res='';
    inputSplit = input.split("\n");
    dic=inputSplit[0].split(" ");
    index=inputSplit[1].split(" ");
    
    for (let i=0;i<index.length;i++){
        res=res.concat(dic[index[i]],'');
    }
    console.log(res);
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