"use strict";

class ProductException{
	constructor(errorMessage){
		this.errorMessage = errorMessage;
	}
}

class Product{
	constructor(title, description, imageUrl, unit, stock, pricePerUnit, category) {
        this._uuid = generateUUID();
        this.title = title
        this.description = description
        this.imageUrl = imageUrl
        this.unit = unit
        this.stock = stock
        this.pricePerUnit = pricePerUnit
        this.category = category
    }
    //uuid
    get uuid() {
        return this._uuid;
    }
    set uuid(val) {
    	throw new ProductException('UUID have to be autogenerated.');
    }
    //title
    get title() {
        return this._title;
    }
    set title(val) {
    	if(typeof val !== "string" || val == ''){
    		throw new ProductException('Product title cannot be empty.');
    	}
        this._title = val;
    }
    //description
    get description() {
        return this._description;
    }
    set description(val) {
    	if(typeof val !== "string" || val == ''){
    		throw new ProductException('Description cannot be empty.');
    	}
        this._description = val;
    }
    //imageUrl
    get imageUrl() {
        return this._imageUrl;
    }
    set imageUrl(val) {
    	if(typeof val !== "string" || val == ''){
    		throw new ProductException('Image URL cannot be empty.');
    	}
        this._imageUrl = val;
    }
    //unit
    get unit() {
        return this._unit;
    }
    set unit(val) {
    	if(typeof val !== "string" || val == ''){
    		throw new ProductException('Unit cannot be empty.');
    	}
        this._unit = val;
    }
    //stock
    get stock() {
        return this._stock;
    }
    set stock(val) {
    	if(typeof val !== "number" || val < 0){
    		throw new ProductException('Stock cannot be negative or not number.');
    	}
        this._stock = val;
    }
    //pricePerUnit
    get pricePerUnit() {
        return this._pricePerUnit;
    }
    set pricePerUnit(val) {
    	if(typeof val !== "number" || val < 0){
    		throw new ProductException('Price Per Unit cannot be negative or not number.');
    	}
        this._pricePerUnit = val;
    }
    //category
    get category() {
        return this._category;
    }
    set category(val) {
    	if(typeof val !== "string" || val == ''){
    		throw new ProductException('Category cannot be empty.');
    	}
        this._category = val;
    }

    //Convertimos el String de JSON recibido 
    //en una nueva instancia de producto
    static createFromJson(jsonValue){
    	let obj = JSON.parse(jsonValue);
    	return Product.createFromObject(obj);
    }

    //Convertimos el objeto recibido en una
    //nueva instancia de producto

    //le entra algo como let a = {'stock': 15};
    static createFromObject(obj){
    	let newProduct = {};
    	Object.assign(newProduct, obj); //clone object and handle
    	Product.cleanObject(newProduct);
    	//Falta ir pasando los valores a un producto que pertenezca a la clase
        console.log('GET PROP TITLE',newProduct['title'])


    	let product = new Product(newProduct['title'],newProduct['description'],
                                  newProduct['imageUrl'],newProduct['unit'],
                                  newProduct['stock'],newProduct['pricePerUnit'],
                                  newProduct['category']
            );
    	return product;
    }

    //Limpiamos el objeto recibido de todos
    //aquellos valores ajenos a la clase Product
    static cleanObject(obj){
    	const productProperties = ['title', 'description', 'imageUrl', 'unit', 'stock', 'pricePerUnit', 'category'];
    	for (let prop in obj){
    		//if prop not in productPrperties
    		if(productProperties.indexOf(prop) == -1){
            	delete obj[prop];
            }
    	}
        console.log(obj)
    }


}

//TEST
let prodTest = new Product('Platano', 'description', 'html://imageUrl.jpg', 'pieza', 15, 3.6, 'Fruta') ;
console.log(prodTest);

let a = {"try":3129312,"uuid":"df2008a5-1c40-4dd1-9db7-8aacc03ae2fb","title":"Platano","description":"Los mejores platanos de México, directo desde Tabasco.","imageUrl":"https://images.freeimages.com/images/large-previews/4ec/banana-s-1326714.jpg","unit":"pieza","stock":15,"pricePerUnit":3.6,"category":"Fruta"};
console.log(a);
console.log("TRST",Product.createFromObject(a));