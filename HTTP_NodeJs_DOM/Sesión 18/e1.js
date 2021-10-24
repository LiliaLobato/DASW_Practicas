"use strict"

let p1 = document.getElementById('p1');
let body = document.body;

for (let node of body.childNodes) {
    if (node != p1) {
        p1.innerText += node.textContent;
    }
    console.log(node.nodeType);
    console.log(node);
}

for (let element of body.children) {
    if (element != p1) {
        p1.innerText += element.innerText + "\n";
    }
    if (element.tagName == 'H1') {
        element.style.color = 'yellow'
    }
    console.log(element);
}