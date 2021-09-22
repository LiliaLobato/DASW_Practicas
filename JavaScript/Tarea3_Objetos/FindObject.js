/*
Se reciben 2 objetos y se desea saber si el primer objeto contiene al segundo objeto, de manera que si las propiedades del segundo objeto estan totalmente contenidas dentro del objeto 1 y coinciden los valores correspondientes (en valor y tipo), imprimiremos "totally included", pero silos valores no coinciden, imprimiremos "partially included". En el caso donde algunas propiedades no esten contenidas, imprimiremos "not included".

Input Format
{"a": 1, "b": 2, "c": 3} {"b": 2}

Constraints
Los valores dentro de los objetos, solo pueden ser de tipo número o string.

Output Format
totally included

Sample Input 0
{"a":"2","b":2,"c":{"d":4,"e":"5"}}
{"a":"2","c":"3"}
Sample Output 0
partially included

Sample Input 1
{"a":"2","b":2,"c":{"d":4,"e":"5"}}
{"b":2, "a":"2"}
Sample Output 1
totally included

Sample Input 2
{"a":"1","b":"2","c":"3"}
{"x":"0","a":"1"}
Sample Output 2
not included
*/

function processData(input) {
    //Enter your code here
    
    let inputLines= input.split('\n');
    let dic=JSON.parse(inputLines[0]);
    let find=JSON.parse(inputLines[1]);
    let ti=true;
    
    
    for (var key in find){
        if(!dic.hasOwnProperty(key)){
            console.log("not included");
            ti=false;
            break;
        }else{ //key is in object, need to find if also the value
            if(dic[key]!==find[key]){
                console.log("partially included");
                ti=false;
                break;
            }
        }
    }
    if (ti==true){
        console.log("totally included");
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
