"use strict";

async function loadCards(url){   
    let response = await fetch(url);
    if (response.status != 200) return [];
    let products = await response.json();
    return products;
}
async function postCards(url, proxy, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(proxy));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}
async function putCards(url, user, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}
async function deleteCards(url, user, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}
///////////////////////////////////////////////////////////////////////////////
async function storeUser(url, user, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}
async function putUser(url, user, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}
///////////////////////////////////////////////////////////////////////////////
async function getXhrResponse(xhr, onSuccess, onError) {
    if (xhr.status == 200) {
        onSuccess(xhr.responseText);
    } else {
        onError(xhr.status + ': ' + xhr.statusText);
    }
}