/*
De un arreglo de objetos de distinto tipo con todos los atributos tipo string, se desea crear un nuevo arreglo que convierte los atributos a número o boleano en caso de serlo. (usar el método map de los arreglos) Se debe mostrar este nuevo arreglo en formato JSON.
Posteriormente se mostrará el indice->valores o indice->false, indice se refiere a la posición en el arreglo, si existe alguna propiedad booleana con valor true mostrará el listado de valores numéricos separados por coma, si ninguna propiedad es true se debe imprimir false (no imprime los valores númericos). Si no tiene ningún valor numérico no imprimir nada

Input Format
[{"a":"1","d":"true","c":"6"},{"d":"3","e":"false","h":"a"},{"a":"100","v":"true","c":"5"},{"d":"true"}] //JSON 
Constraints
Puedes usar Number.isInteger(valor) que indica si un valor dado es de tipo entero considerando que todos los valores numéricos serán enteros.
Debes usar el método map
Output Format
[{"a":1,"d":true,"c":6},{"d":3,"e":false,"h":"a"},{"a":100,"v":true,"c":5},{"d":true}]
0->1,6
1->false
2->100,5
3->

Sample Input 0
[{"a":"16","b":"e","c":"18","d":"true","e":"false"},{"b":"18","c":"true","e":"15"},{"b":"12","c":"11","d":"e","e":"12"}]
Sample Output 0
[{"a":16,"b":"e","c":18,"d":true,"e":false},{"b":18,"c":true,"e":15},{"b":12,"c":11,"d":"e","e":12}]
0->16,18
1->18,15
2->false

Sample Input 1
[{"a":"6","c":"4","d":"9","e":"false"},{"a":"11","d":"1"},{"b":"4","d":"true"},{"a":"16","b":"1","c":"17"}]
Sample Output 1
[{"a":6,"c":4,"d":9,"e":false},{"a":11,"d":1},{"b":4,"d":true},{"a":16,"b":1,"c":17}]
0->false
1->false
2->4
3->false
*/

function processData(input) {
    //Enter your code here
    var obj=JSON.parse(input);
    var myObject;
    var strRes="";
    var numArray=[];
    var insert=false;


    myObject = Object.keys(obj).map(function(key, index) {
        test = obj[key]
        strRes=strRes.concat(index,'->')
        Object.keys(test).map(function(key, index) {
            //console.log(test[key])
            if (test[key]=="false"){
              test[key]=false;
            } else if (test[key]=="true"){
              test[key]=true; 
                insert=true;
            } else if (!isNaN(test[key])){
                test[key]=Number(test[key],10)
                //strRes=strRes.concat(test[key],',')
                numArray.push(test[key]);
            }
        });
        if(insert){
            strRes=strRes.concat(numArray);
        }else{
            strRes=strRes.concat(false);
        }
        numArray=[];
        insert=false;
        strRes=strRes.concat('\n')
        //console.log(index)
        return obj[key];
    });
    
    console.log(JSON.stringify(myObject));
    console.log(strRes);
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