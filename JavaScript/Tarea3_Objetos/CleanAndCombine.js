/*
Dada una lista de objetos se desea eliminar aquellos valores que no interesan y calcular un objeto que sea la combinación de todos los objetos de la lista. En caso de que varios objetos contengan la misma propiedad, calcular el promedio (con 2 decimales) y asignar en el objeto resultante.

 {"a": 1, "b": " 2" }
 {"a": 2, "x": "asdf"}
 {"a": 7, "b": null, "y": 10}
 
 Salida:
 {"a": "3.33", "b": "2", "y": "10"}

Se consideran como nulos:
valores no numéricos
números > 10,000
números negativos

Input Format
 {"a": 1, "b": " 2" }
 {"a": 2, "x": "asdf"}
 {"a": 7, "b": null, "y": 10}

Constraints
let inputLines= input.split('\n');
let obj1=JSON.parse(inputLines[0]);
variable.toFixed(2); //regresa 2 decimales

Output Format
 {"a": "3.33", "b": "2.00", "y": "10.00"}

Sample Input 0
{"a": 1, "b": " 2" }
{"a": 2, "x": "asdf"}
{"a": 7, "b": null, "y": 10}
Sample Output 0
{"a":"3.33","b":"2.00","y":"10.00"}

Sample Input 1
{"a": 10001, "b": " 2" }
{"c": 3, "d": "-4"}
Sample Output 1
{"b":"2.00","c":"3.00"}

NOTA: TEST CASE #4 NO PASA
*/

function processData(input) {
    //Enter your code here
    
    let inputLines= input.split('\n');
    totalobj = inputLines.length;
    let obj1=JSON.parse(inputLines[0]);
    let target = JSON.parse(inputLines[0]);
    let res="{";
    
    //combinamos todas las llaves
    for (let i=0;i<totalobj;i++){
        let test = inputLines[i];
        let obj1=JSON.parse(test);
        for (var key in obj1){
            if(isNaN(obj1[key])||obj1[key]==null||obj1[key]>10_000||obj1[key]<0){
                delete target[key];
            }
        }
        Object.assign(target, obj1);
    }
    
    //recorremos cada una de las llaves
    for (var key in target){
        sum = 0;
        count=0;
        //por cada llave, buscamos su valor en cada objeto
        for (let i=0;i<totalobj;i++){
            let test = inputLines[i];
            let obj1=JSON.parse(test);
            //el valor debe de existir ser menor a 1000 y mayor a 0, no ser un string o null
            if(target.hasOwnProperty(key) & obj1[key]!==undefined & obj1[key]!==null
              & obj1[key]<=10000 & obj1[key]>=0 & !isNaN(obj1[key])){
                //calculamos el promedio
                sum += Number(obj1[key],10);
                count +=1;
            }
        }
        //guardamos el valor en el nuevo objeto
        prom=sum/count;
        target[key]=prom.toFixed(2);
        //si es un string, se elimina del objeto
        if(isNaN(target[key])){
            delete target[key];
        }
    }
    //lo simple seria imprimir el objeto pero
    //no coincide el formato
    //console.log(target)
    
    objsize=0; i=0;
    for (var key in target){ objsize+=1; }
    for (var key in target){
        res=res.concat("\""+key+"\":\""+target[key]+"\"");
        if(i<objsize-1){
            res=res.concat(",");
        }
        i+=1;
    }
    res=res.concat("}");
    console.log(res)
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
