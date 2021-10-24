"use strict"

// Ejemplo 1
let pGit = document.createElement("P")
pGit.innerText = "Git"
let pMongo = document.createElement("P")
pMongo.innerText = "MongoDB"

let ul = document.body.getElementsByTagName("UL")[0]

ul.before(pGit)
ul.after(pMongo)

let liArr = [document.createElement("LI"), document.createElement("LI"), document.createElement("LI")]
ul.prepend(liArr[0])
ul.insertBefore(liArr[1], ul.lastElementChild)
ul.append(liArr[2])

// Ejemplo 2
let html = "<mark>importante</mark>"
ul.insertAdjacentHTML("beforebegin", html)