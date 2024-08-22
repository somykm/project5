//part5
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');//to get the id of the item
console.log('product ID:', productId);

fetch(`http://localhost:3000/api/products/${productId}`)
  .then(data => {
    return data.json();
  })
  .then(product => {
    console.log(product.description);
    console.log(product.price);
    // displayData(product);
    //TODO call fun to inset product info
    // insertItems(product);
  });

function displayData(product) {

  for (let i = 0; i < product.length; i++) {
    const products = product[i];
    console.log(products);

    const priceParag = document.getElementById('price');
    const descriptionParag = document.getElementById('description');
    // const itemContent = document.querySelector('.item__content');

    priceParag.textContent = `:${products.price}`;
    descriptionParag.textContent = `: ${products.description}`;

  }
}


//TODO (m6) insert product detail into page, by using innerHTML or innerText(create fun to insert product info)
