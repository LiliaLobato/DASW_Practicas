let ul = document.createElement("UL")
for (let i = 0; i < 5; i++) {
    let li = document.createElement("LI")
    li.innerText = i + 1
    ul.append(li)
}

ul.setAttribute("id", "myUl")
ul.firstElementChild.setAttribute("id", "myLi1")

nLista = ul.cloneNode(true)
let listaIds = Array.from(nLista.children).filter(elem => elem.hasAttribute("id"))
listaIds.forEach(elem => elem.removeAttribute("id"))

document.body.append(ul)
document.body.append(nLista)

ul.childNodes.item(1).remove()