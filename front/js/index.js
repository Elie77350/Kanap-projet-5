
// to get products data list from api
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((dataProducts) => {
    settees(dataProducts);
  })
  .catch((error) => {
    console.log(error);
  });

  // to display products to the home page
function settees(homePage) {
  const location = document.querySelector("#items");
  for (article of homePage) { 
    location.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}


