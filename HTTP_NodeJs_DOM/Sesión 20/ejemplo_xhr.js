const urlJSON = 'https://api.npoint.io/bded36a7da4b0c07b109';

function loadJSON(urlJSON) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', urlJSON);

    // 4. Enviar solicitud
    xhr.send();

    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            console.log(xhr.status + ": " + xhr.statusText);
        } else {
            console.log(JSON.parse(xhr.response));
            sessionStorage.data = xhr.response;
        };
    }
}

async function loadJSONUsingFetch(urlJSON) {
    let response = await fetch(urlJSON)
    if (response.status != 200) return [];
    let data = await response.json();
    console.log(data);
    return data;
}

// Se debe mandar siempre todo el arreglo de usuarios, porque reemplaza el anterior archivo por el nuevo
function guardarEnJSON(data) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configurar:  POST para actualizar archivo
    xhr.open('POST', urlJSON);

    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');

    // 4. Enviar solicitud al servidor
    xhr.send(JSON.stringify(data));

    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
        } else {
            console.log(xhr.responseText); // Significa que fue exitoso
        }
    };
}