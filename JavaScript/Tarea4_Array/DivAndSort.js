/*
Para un arreglo de objetos (de diferente tipo), se buscará al primer elemento que cumpla tenga una propiedad con un valor especifico (todos los objetos tendrán esta propiedad). A partir de esa posición en delante(incluida esa posición) se debe crear un nuevo arreglo con esos objetos y del arreglo original se eliminan esos elementos
Finalmente se debe ordenar de forma ascendente el arreglo original con respecto a la propiedad indicada y el segundo arreglo se ordena de forma descendente.
Mostrar arreglo 1 ordenado ascendente Mostrar arreglo 2 ordenado descendente

Input Format
[{"a":23,"id":4},{"id":2,"a":"c"},{"id":1,"b":"asc"},{"id":5,"c":4}] //JSON
id 1//buscar propiedad id=1

Constraints
La propiedad indicada es númerica
Usar findIndex y splice

Output Format
[{"id":2,"a":"c"},{"a":23,"id":4}] //ascendente
[{"id":5,"c":4},{"id":1,"b":"asc"}] //descendente

Sample Input 0
[{"n":57,"d":8},{"n":84,"d":"b"},{"n":93},{"n":69,"a":"c","c":6},{"n":47,"d":"a","e":13}]
n 93
Sample Output 0
[{"n":57,"d":8},{"n":84,"d":"b"}]
[{"n":93},{"n":69,"a":"c","c":6},{"n":47,"d":"a","e":13}]

Sample Input 1
[{"n":90},{"n":92,"a":17,"d":"c"},{"n":88,"e":13}]
n 90
Sample Output 1
[]
[{"n":92,"a":17,"d":"c"},{"n":90},{"n":88,"e":13}]

*/

function processData(input) {
    //Enter your code here
    let inputLines= input.split('\n');
    objArray=JSON.parse(inputLines[0]);
    valUpdate=inputLines[1].split(' ');
    
    
    //la idea es obtener el index    
    var index = objArray.findIndex(x => x[valUpdate[0]] == valUpdate[1]);
    
    //del 0 al index es desc, del index al final es asc
    var asc = objArray.splice(0, index);
    var des = objArray.splice(0,objArray.length);
    
    des.sort(function(a,b) {
        return b[valUpdate[0]] - a[valUpdate[0]];
    });
    
    asc.sort(function(a,b) {
        return a[valUpdate[0]] - b[valUpdate[0]];
    });
    
    console.log(JSON.stringify(asc));
    console.log(JSON.stringify(des));
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