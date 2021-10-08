"use strict";

//TEST PRODUCTS
let PrdA = {"try":3129312, //debe de eliminar el try 
			//debe de ignorar el uuid, genera uno nuevo
			"uuid":"M1_UU1D_123456", 
			"title":"Platano A",
			"description":"Los mejores platanos de México, directo desde Tabasco.",
			"imageUrl":"https://images.freeimages.com/images/large-previews/4ec/banana-s-1326714.jpg",
			"unit":"pieza",
			"stock":15,
			"pricePerUnit":10,
			"category":"Fruta"};
let PrdB = {"title":"Pera B",
			"description":"Esta es la descripción del producto.",
			"imageUrl":"https://images.freeimages.com/images/large-previews/4ec/banana-s-1326714.jpg",
			"unit":"pieza",
			"stock":15,
			"pricePerUnit":20,
			"category":"Fruta"};
let PrdC = {"title":"Jitomate C",
			"description":"La descripcion contiene número 12345 y caracteres especiales ñ.-/?%.",
			"imageUrl":"https://images.freeimages.com/images/large-previews/4ec/banana-s-1326714.jpg",
			"unit":"pieza",
			"stock":15,
			"pricePerUnit":1,
			"category":"Verdura"};
let PrdD = {"title":"Lechuga D",
			"description":"Hello!",
			"imageUrl":"https://images.freeimages.com/images/large-previews/4ec/banana-s-1326714.jpg",
			"unit":"pieza",
			"stock":15,
			"pricePerUnit":80,
			"category":"Verdura"};
let PrdE = {"title":"Manzana",
			"description":"Aqui hice un update de producto",
			"imageUrl":"https://images.freeimages.com/images/large-previews/4ec/banana-s-1326714.jpg",
			"unit":"pieza",
			"stock":15,
			"pricePerUnit":1000,
			"category":"Fruta"};


let catalogo;
let updateUUID;
let deleteUUID;
let UUIDProxy;
let updateProxy;
let ranElem;
let carrito;


//añadimos 5 productos al catálogo
console.log("Agregamos 5 productos");
createProduct(PrdA);
createProduct(PrdB);
createProduct(PrdC);
createProduct(PrdD);
console.log(getProducts());

//Actualizamos un elemento
catalogo = getProducts();
updateUUID = getAleatorioUUID();
console.log("Update a un producto ",getProductById(updateUUID).title," del catálogo con UUID", updateUUID);
updateProduct(updateUUID, PrdE);
console.log(getProducts());

//Eliminamos un elemento
catalogo = getProducts();
deleteUUID = getAleatorioUUID();
console.log("Eliminamos el producto:", getProductById(deleteUUID).title," del catálogo con UUID:", deleteUUID);
deleteProduct(deleteUUID);
console.log(getProducts());

//Probamos los filtros
console.log("Filtro por categoria: Fruta");
console.log(findProduct("Fruta:")); //filtro por categoria
console.log("Filtro por tittle: Pera");
console.log(findProduct("Pera")); //filtro por titulo
console.log("Filtro por categoria: Verdura y tittle: Manzana");
console.log(findProduct("Verdura:Platano")); //filtro por categoria y titulo
console.log("Filtro por categoria: Fruta y tittle: Manzana");
console.log(findProduct("Fruta:Platano")); //filtro por categoria y titulo


//TEST SHOPPING CART
catalogo = getProducts();

//Agregamos 3 elementos de nuestra lista de productos al carrito
carrito = new ShoppingCart;
for (let n=0;n<10;n++){
	UUIDProxy = getAleatorioUUID();
	updateProxy = getProductById(UUIDProxy);
	ranElem = random(1, 10);
	console.log("Agregamos ", updateProxy.title, "con precio", updateProxy.pricePerUnit,"y", ranElem," elementos. UUID: ",updateProxy.uuid);
	carrito.addItem(UUIDProxy,ranElem);
}
console.log(carrito.productProxies);

//Actualizamos algun producto del carrito
UUIDProxy = getAleatorioUUID();
updateProxy = getProductById(UUIDProxy);
ranElem = random(1, 10);
console.log("Actualizamos a ", updateProxy.title,"a", ranElem," elementos. UUID: ",updateProxy.uuid);
carrito.updateItem(UUIDProxy,ranElem);
console.log(carrito.productProxies);

//eliminamos algun producto del carrito
UUIDProxy = getAleatorioUUID();
updateProxy = getProductById(UUIDProxy);
console.log("Eliminamos a ", updateProxy.title," del carrito. UUID: ",updateProxy.uuid);
carrito.removeItem(UUIDProxy);
console.log(carrito.productProxies);

//calculamos el total del carrito de compras
let total = carrito.calculateTotal();
console.log(total);


