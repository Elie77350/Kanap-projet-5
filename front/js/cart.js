// to identify the page cart
const page = document.location.href;

// to get products from the api
if (page.match("cart")) {
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((dataProducts) => {
      console.log(dataProducts);
      // to call the fonction displayCart
      displayCart(dataProducts);
  })
  .catch((err) => {
      document.querySelector("#cartAndFormContainer").innerHTML = `<h1>erreur 404</h1>`;

  });
} else {
  console.log("sur page confirmation");
}

// to display cart products
function displayCart(ref) {
  let cart = JSON.parse(localStorage.getItem("storeCart"));
   if (cart && cart.length != 0) {

    // to compare localStorage content, and cart content
    for (let productChoice of cart) {
      // console.log(productChoice);
      for (let i = 0, rf = ref.length; i < rf; i++) {
        if (productChoice._id === ref[i]._id) {
          productChoice.name = ref[i].name;
          productChoice.prix = ref[i].price;
          productChoice.image = ref[i].imageUrl;
          productChoice.description = ref[i].description;
          productChoice.alt = ref[i].altTxt;
        }
      }
    }

    display(cart);
  } else {
    // if the cart do not exist we creat an h1 tag to display an alert and update the quantity
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }
  // to update the display
  updateQuantity();
  deletefromCart();
}


//* to display the cart
function display(indexed) {
  	// to point to the display area
  let displayCart = document.querySelector("#cart__items");
  // to display the cart, using .map(); methode and dataset property
  displayCart.innerHTML += indexed.map((productChoice) =>
  `<article class="cart__item" data-id="${productChoice._id}" data-color="${productChoice.color}" data-quantity="${productChoice.quantity}" data-prix="${productChoice.prix}">
    <div class="cart__item__img">
      <img src="${productChoice.image}" alt="${productChoice.alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${productChoice.name}</h2>
        <span>color : ${productChoice.color}</span>
        <p data-prix="${productChoice.prix}">${productChoice.prix} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productChoice.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${productChoice._id}" data-color="${productChoice.color}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
    ).join("");
  totalProduct();
}

//* to change dynamically the quantity of the cart
function updateQuantity() {
  const cart = document.querySelectorAll(".cart__item");
  cart.forEach((cart) => {
    cart.addEventListener("change", (e) => {
      // to listen changes in 'itemQuantity' about the selected item
      let carts = JSON.parse(localStorage.getItem("storeCart"));
      for (article of carts)
        if (
          article._id === cart.dataset.id &&
          cart.dataset.color === article.color
        ) {
          article.quantity = e.target.value;
          localStorage.storeCart = JSON.stringify(carts);
          // to delete article in the
          cart.dataset.quantity = e.target.value;
          // to refresh datas
          totalProduct();
        }
    });
  });
}
//* to remove article dynamically from the cart
function deletefromCart() {
  const deleteCart = document.querySelectorAll(".cart__item .deleteItem");
  deleteCart.forEach((deleteCart) => {
    deleteCart.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("storeCart"));
      for (let d = 0, c = cart.length; d < c; d++)
        if (
          cart[d]._id === deleteCart.dataset.id &&
          cart[d].color === deleteCart.dataset.color
        ) {
          // to delete items
          const num = [d];
          let newBasket = JSON.parse(localStorage.getItem("storeCart"));
          newBasket.splice(num, 1);
          if (newBasket && newBasket.length == 0) {
            // if there's no cart, we creat an h1 tag to alert and display tquantity update
            document.querySelector("#totalQuantity").innerHTML = "0";
            document.querySelector("#totalPrice").innerHTML = "0";
            document.querySelector("h1").innerHTML =
              "Vous n'avez pas d'article dans votre panier";
          }
          // to send a new converted cart in the localStorage
          localStorage.storeCart = JSON.stringify(newBasket);
          totalProduct();
          // to reload the pahge without the deleted product with the cart
          return location.reload();
        }
    });
  });
}

// to display the total product and the total cost
function totalProduct() {
  let totalArticle = 0;
  let totalPrix = 0;
  const cart = document.querySelectorAll(".cart__item");
  cart.forEach((cart) => {
    //to get quantity from dataset
    totalArticle += JSON.parse(cart.dataset.quantity);
    //to calculate the total product with the dataset
    totalPrix += cart.dataset.quantity * cart.dataset.prix;
  });
  document.getElementById("totalQuantity").textContent = totalArticle;
  document.getElementById("totalPrice").textContent = totalPrix;
}

//* form
// to stored the data client in an Array for the order on cart Page
if (page.match("cart")) {
  var contactClient = {};
  localStorage.contactClient = JSON.stringify(contactClient);
  var prenom = document.querySelector("#firstName");
  prenom.classList.add("regex_texte");
  var nom = document.querySelector("#lastName");
  nom.classList.add("regex_texte");
  var ville = document.querySelector("#city");
  ville.classList.add("regex_texte");
  var adresse = document.querySelector("#address");
  adresse.classList.add("regex_adresse");
  var email = document.querySelector("#email");
  email.classList.add("regex_email");
  var regexTexte = document.querySelectorAll(".regex_texte");
  document.querySelector("#email").setAttribute("type", "text");
}

// to manage form input (RegEx)
let regexLettre = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;
let regexChiffreLettre = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
let regValideEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
let regMatchEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;

if (page.match("cart")) {
  regexTexte.forEach((regexTexte) =>
    regexTexte.addEventListener("input", (e) => {
      valeur = e.target.value;
      let regNormal = valeur.search(regexLettre);
      if (regNormal === 0) {
        contactClient.firstName = prenom.value;
        contactClient.lastName = nom.value;
        contactClient.city = ville.value;
      }
      if (
        contactClient.city !== "" &&
        contactClient.lastName !== "" &&
        contactClient.firstName !== "" &&
        regNormal === 0
      ) {
        contactClient.regexNormal = 3;
      } else {
        contactClient.regexNormal = 0;
      }
      localStorage.contactClient = JSON.stringify(contactClient);
      confirmClick();
    })
  );
}

infoText(regexLettre, "#firstNameErrorMsg", prenom);
infoText(regexLettre, "#lastNameErrorMsg", nom);
infoText(regexLettre, "#cityErrorMsg", ville);

if (page.match("cart")) {
  let regexAdresse = document.querySelector(".regex_adresse");
  regexAdresse.addEventListener("input", (e) => {
    valeur = e.target.value;
    let regAdresse = valeur.search(regexChiffreLettre);
    if (regAdresse == 0) {
      contactClient.address = adresse.value;
    }
    if (contactClient.address !== "" && regAdresse === 0) {
      contactClient.regexAdresse = 1;
    } else {
      contactClient.regexAdresse = 0;
    }
    localStorage.contactClient = JSON.stringify(contactClient);
    confirmClick();
  });
}

infoText(regexChiffreLettre, "#addressErrorMsg", adresse);
if (page.match("cart")) {
  let regexEmail = document.querySelector(".regex_email");
  regexEmail.addEventListener("input", (e) => {
    // 'valeur' is the value of the dynamic input
    valeur = e.target.value;
    let regMatch = valeur.match(regMatchEmail);
    // when the result is correct, the log console will show a response different from null (RegEx 0 or -1 from regexConfirm)
    let regValide = valeur.search(regValideEmail);
    if (regValide === 0 && regMatch !== null) {
      contactClient.email = email.value;
      contactClient.regexEmail = 1;
    } else {
      contactClient.regexEmail = 0;
    }
    localStorage.contactClient = JSON.stringify(contactClient);
    confirmClick();
  });
}

// to manage the text below the email field
if (page.match("cart")) {
  email.addEventListener("input", (e) => {
    valeur = e.target.value;
    let regMatch = valeur.match(regMatchEmail);
    let regValide = valeur.search(regValideEmail);
    if (valeur === "" && regMatch === null) {
      document.querySelector("#emailErrorMsg").textContent = "Veuillez renseigner votre email.";

    } else if ( regValide !== 0) {
      document.querySelector("#emailErrorMsg").innerHTML = "Caractère non valide";

    } else if (valeur != "" && regMatch == null) {
      document.querySelector("#emailErrorMsg").innerHTML = "Caratères acceptés pour ce champ. Forme email pas encore conforme";
    } else {
      document.querySelector("#emailErrorMsg").innerHTML = "Forme email conforme.";
    }
  });
}

//* to display alert message from the form
function infoText(regex, scoring, listenEvent) {
      if (page.match("cart")) {
      listenEvent.addEventListener("input", (e) => {
      // valeur sera la valeur de l'input en dynamique
      valeur = e.target.value;
      index = valeur.search(regex);
    // if the value is still an empty string and then regex is different from 0 (RegEx = -1 and the field is empty but no error)
      if (valeur === "" && index != 0) {
        document.querySelector(scoring).textContent = "Veuillez renseigner ce champ.";

        // if the value is no longer an empty string and the RegEx differente from 0 (RegEx = -1 and the field is not empty, so there's an error)
      } else if (valeur !== "" && index != 0) {
        document.querySelector(scoring).innerHTML = "Reformulez cette donnée";

        // no problem if the RegEx does no detect any errors and is equal to 0 cause it will validateby the RegEx (for the other cases)
      } else {
      document.querySelector(scoring).innerHTML = "Caratères acceptés pour ce champ.";

      }
    });
  }
}

let order = document.querySelector("#order");
//* to validate the click of the order
function confirmClick() {
  let btnClickValidate = JSON.parse(localStorage.getItem("contactClient"));
  let sum =
    btnClickValidate.regexNormal + btnClickValidate.regexAdresse + btnClickValidate.regexEmail;
  if (sum === 5) {
    order.removeAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Commander !");
  } else {
    order.setAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Remplir le formulaire");
  }
}

// to send the order
if (page.match("cart")) {
  order.addEventListener("click", (e) => {
    // to prevent the reload of the page from the button
    e.preventDefault();
    confirmClick();
    sendOrder();
  });
}

//*to define the basket that will only contain choosen products from localStorage
let cartId = [];
function tableId() {
// to call ressources
let cart = JSON.parse(localStorage.getItem("storeCart"));
// to get products's id Id the cartId
if (cart && cart.length > 0) {
  for (let indice of cart) {
    cartId.push(indice._id);
  }
} else {
  console.log("le panier est vide");
  document.querySelector("#order").setAttribute("value", "Panier vide!");
  }
}

//*to get data of the client and the cart before convert it
let btnClickValidate;
let finalOrder;
function command() {
  btnClickValidate = JSON.parse(localStorage.getItem("contactClient"));
  // to defining order object
  finalOrder = {
    contact: {
      firstName: btnClickValidate.firstName,
      lastName: btnClickValidate.lastName,
      address: btnClickValidate.address,
      city: btnClickValidate.city,
      email: btnClickValidate.email,
    },
    products: cartId,
  };
}
//*for the validation of the shipment
function sendOrder() {
  tableId();
  command();
  // to display the order to send it
  console.log(finalOrder);
  let sum = btnClickValidate.regexNormal + btnClickValidate.regexAdresse + btnClickValidate.regexEmail;
  // to send to the API ressource if cartId contains Item and button is click
  if (cartId.length != 0 && sum === 5) {
    // envoi à la ressource api
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalOrder),
    })
      .then((res) => res.json())
      .then((data) => {
       // to send to the confirmation Page
        window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
      })
      .catch(function (err) {
        console.log(err);
        alert("erreur");
      });
  }
}

//*to display the order number and empty the localStorage from the confirmation Page
(function ordered() {
  if (page.match("confirmation")) {
    sessionStorage.clear();
    localStorage.clear();
    //to get the order number
    let orderNumber = new URLSearchParams(document.location.search).get("commande");
    		// greeting message
    document.querySelector("#orderId").innerHTML = `<br>${orderNumber}<br>Merci pour votre achat`;
    console.log("valeur de l'orderId venant de l'url: " + orderNumber);
    		// to initialize the order number
    orderNumber = undefined;
  } else {
    console.log("sur page cart");
  }
})();
