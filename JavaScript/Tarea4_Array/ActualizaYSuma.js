/*
Se tiene un arreglo de objetos (que pueden ser de diferente tipo), se desea que todos los elementos que tengan la propiedad indicada cambien su propiedad por el valor dado (todos los que tengan esa propiedad se les asignará el mismo valor). Finalmente se deben sumar todos los valores númericos de todos los objetos Realizar esto usando al menos un método forEach.

Input Format
[{"a":5,"b":6},{"a":9,"c":3, "d":"txt"}] //es un JSON 
a 1 //propiedad  y valor a asignar a esa propiedad (separados por espacio)
Constraints
Los objetos solo tendrán atributos númericos o strings. Si recibes un valor númerico convertirlo a número. Es posible recibir también valores tipo string.

Output Format
11 // la suma de todos los valores numéricos 1+6+1+3
   // [{"a":1,"b":6},{"a":1,"c":3, "d":"txt"}]

Sample Input 0
[{"d":"c","e":"a"},{"b":"e","c":15,"e":17},{"a":"d"}]
d 10
Sample Output 0
42
Explanation 0
Se cambia el valor de la propiedad d por 10 y al sumar todo será 10+15+17 = 42

Sample Input 1
[{"b":"a","c":"d","e":0},{},{"a":6,"b":"b","c":13,"d":"a"},{"d":16,"e":"b"}]
d 1
Sample Output 1
21
Explanation 1
0+6+13+1+1=21
*/

function processData(input) {
    //Enter your code here
    let inputLines= input.split('\n');
    objArray=JSON.parse(inputLines[0]);
    valUpdate=inputLines[1].split(' ');
    sum=0;
    numArray=[];
    
    for (let i = 0; i<objArray.length;i++){
        current = objArray[i];
        
        for (var key in current){
            if (key == valUpdate[0]){
                current[key]=valUpdate[1]; 
            }
            if (!isNaN(current[key])){
                //sum +=Number(current[key],10); //commented to use forEach to calculate sum
                numArray.push(Number(current[key],10));
            }
        }
        
    }
    numArray.forEach(element => sum+=element);
    console.log(sum);
    
    
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