// to get the ID from Url
const params = new URLSearchParams(window.location.search)
const id = params.get('_id');

// to get the product from the API and display it
	fetch('http://localhost:3000/api/products')
		.then((response) => response.json())
		.then((dataProducts) => {

			getOneProduct(dataProducts);
		})
		.catch((error) => {
			console.log(error);
		});

// to create a customer product object
const clientProduct = {};
clientProduct._id = id;


	// to link product element to the DOM and display it
function getOneProduct(products) {
	const imageProduct = document.querySelector('.item__img');
	const title = document.querySelector('#title');
	const price = document.querySelector('#price');
	const description = document.querySelector('#description');
	const colorOption = document.querySelector('#colors');


	// to search an index from _id
	for (productChoice of products) {
		if (id === productChoice._id) {


			// to add product element dynamically
			imageProduct.innerHTML = `<img src="${productChoice.imageUrl}" alt="${productChoice.altTxt}">`;
			title.textContent = `${productChoice.name}`;
			price.textContent = `${productChoice.price}`;
			description.textContent = `${productChoice.description}`;

			
			// to access the choice of colors
			for (const color of productChoice.colors) {
				colorOption.innerHTML +=`<option value="${color}">${color}</option>`;
			}
		}
	}
}

// to detect activity about color choice
const colorChoice = document.querySelector('#colors');
colorChoice.addEventListener('input', (event) => {
	colorProduct = event.target.value; // to get the color from the event
	clientProduct.color = colorProduct; // to add the color of the product in the Cart
	document.querySelector('#addToCart').textContent = 'Choix validé';
	// console.log(colorProduct);
});

// to manage quantity dynamically
const choiceOfQuantity = document.querySelector('input[id="quantity"]');
let quantityOfProduct;
choiceOfQuantity.addEventListener('input', (event) => {// to detect input activity about choice of quantity
	quantityOfProduct = event.target.value;
	clientProduct.quantity = quantityOfProduct;
	document.querySelector('#addToCart').textContent = 'Choix validé'; // to alert when the choice is done
	console.log(quantityOfProduct);
});

// to detect button click activity when adding product to the cart
const clickToChoose = document.querySelector('#addToCart');
clickToChoose.addEventListener("click", () => {


	// condition to display quantity and color of product dynamically
	if (clientProduct.quantity < 1 || clientProduct.quantity > 100 || clientProduct.quantity === undefined || clientProduct.color === '' || clientProduct.color === undefined) {
		alert("Veuillez choisir un coloris, et un nombre d'article compris entre 1 et 100");
	} else {
		cart();
		console.log('Choix validé');
		document.querySelector('#addToCart').texContent = 'Votre produit a été ajouté à votre panier !';
	}
});

// to manage cart data
let clientProductChoice = []; // to initialize the cart
let registeredProduct = []; // to get data from localStorage and parse it in JSON
let temporaryProduct = []; // to stock 'registeredChoice', quantity and color of product
let productToUpdate = []; // to get datas from 'registeredProduct' and 'temporaryProduct' Array and concat them

// to add products in the 'clientProductChoice' Array
function firstRecordingProduct() {
	console.log(registeredProduct);
	if (registeredProduct === null) {// if 'registeredProduct' is void, it does not exist
		clientProductChoice.push(clientProduct); // so, we push the product in the 'clientProductChoice' Array
		console.log(clientProduct);

		// we send the content of the 'clientProductChoice' Array to the localStorage (storeCart)
		return (localStorage.storeCart = JSON.stringify(clientProductChoice));
	}
}

// to add and sort products in the 'productToUpdate' Array
function sortProduct() {
	productToUpdate = [];
	temporaryProduct.push(clientProduct);
	productToUpdate = registeredProduct.concat(temporaryProduct);

	productToUpdate.sort(function classify(a, b) {// to sort and classify ids and colors
		if (a._id < b._id) return -1;
		if (a._id > b._id) return 1;
		if (a._id = b._id) {
			if (a.color < b.color) return -1;
			if (a.color > b.color) return 1;
		}
		return 0;
	});
	temporaryProduct = []; // to reset and reinitialize the 'temporaryProduct' Array

	// to send 'productToUpdate' Array content to the localStorage in a JSON format
	return (localStorage.storeCart = JSON.stringify(productToUpdate));
}

// to update the quantity in the shopping cart
function cart() {
	registeredProduct = JSON.parse(localStorage.getItem('storeCart'));// we stock the localStorage content in JSON format

	// to check if products have already been selected and saved by the user
	if (registeredProduct) {
		for (productChoice of registeredProduct) {

			// to compare the equality between two items (previously and recently chosen)
			if (productChoice._id === id && productChoice.color === clientProduct.color) {
				alert('Cet article est déjà présent dans votre panier');

				// to change the quantity of a product in the localStorage
				let totalOfSelection = parseInt(productChoice.quantity) + parseInt(quantityOfProduct);

				// to convert the result to JSON format, before sending it
				productChoice.quantity = JSON.stringify(totalOfSelection);

				// to send a new 'storeCart' in the localStorage
				return (localStorage.storeCart = JSON.stringify(registeredProduct));
			}
		}
		return sortProduct(); // the function is called if the loop returns nothing
	}
	return firstRecordingProduct();// the function 'firstRecordingProduct' is called if the 'registeredProduct' one do not exist
}
