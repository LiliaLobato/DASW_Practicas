/*
De una tabl de datos de alumnos
Crear un arreglo de objetos y añadir el atributo boleano "aprobado" (true/false)
Crear una función con posibilidad de filtrar por sexo o por aprobado (aprobados y reprobados) o por cualquier otra propiedad o combinación de propiedades.
Mostrar los expedientes de los elementos filtrados

Input Format
5,3  // número de alumnos, número de filtros
nombre,ciudad,calificacion,sexo,expediente //nombres de propiedades
Juan Pérez,Zapopan,9.4,H,123
María López,Guadalajara,9.7,M,234
Mar Doe,Zapopan,5.9,M,353
Jorge Zrt,Zapopan,5.4,H,158
John Loo,Zapopan,7.4,H,134
sexo,H  //propiedad valor
ciudad,Zapopan
aprobado,true
Constraints
Existirá siempre un atributo expediente y un atributo calificacion (sin acento).
Output Format
123,134

Sample Input 0
5,2
nombre,calificacion,sexo,ciudad,expediente
Marcos Trab,5.5,H,Guadalajara,165
Eula Perry,5.8,M,Zapopan,375
Antonio Clayton,8.9,H,Zapopan,197
Mary Alexander,7.7,M,Guadalajara,210
Mar Wewar,9.7,M,Zapopan,310
sexo,H
aprobado,true
Sample Output 0
197

Sample Input 1
5,1
nombre,calificacion,sexo,ciudad,expediente
Marcos Trab,5.5,H,Guadalajara,165
Eula Perry,5.8,M,Zapopan,375
Antonio Clayton,8.9,H,Zapopan,197
Mary Alexander,7.7,M,Guadalajara,210
Mar Wewar,9.7,M,Zapopan,310
sexo,H
Sample Output 1
165,197
*/

function processData(input) {
    //Enter your code here
    let inputLines= input.split('\n');
    let objNum=inputLines[0].split(',');
    let prop = inputLines[1].split(',');
    let obj={};
    let exp=[];
    var filterSuccess;
    
    let index_cont = (Number(objNum[0],10)+2);
    let index_filt = index_cont + Number(objNum[1],10);
    
    function Filter(filerKey,filterVal,objVal) { 
        if (filerKey==="aprobado"){
            if(filterVal==="false"){ filterVal=false;
            } else { filterVal=true; }
        }
        if(objVal!==filterVal){ filterSuccess=false; }           
    }
    
    //CREAMOS EL OBJETO
    for (let i = 2; i<index_cont;i++){
        let cont = inputLines[i].split(',');
        let j=0;
        for (let key of prop){
            obj[key]=cont[j];
            j++;
        }
        if(obj["calificacion"]<6){
           obj["aprobado"]=false;
        }else{
            obj["aprobado"]=true;
        }
        filterSuccess=true;
        for (let j = index_cont; j<index_filt;j++){
            let test = inputLines[j].split(',');
            Filter(test[0],test[1],obj[test[0]]);
        }
        
        if(filterSuccess){
            exp.push(obj["expediente"])
        }
    }
    
    arra = exp.toString();
    console.log(String(arra))
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