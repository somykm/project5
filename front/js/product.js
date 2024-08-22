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
    displayData(product);//call func
  })
  .catch(error => {
    console.error('error fetching:', error)
  });
//part6, display data u get from api
function displayData(product) {
  const priceParag = document.getElementById('price');
  const descriptionParag = document.getElementById('description');

  if (priceParag && descriptionParag) {
    priceParag.textContent = `${product.price}`;
    descriptionParag.textContent = `${product.description}`;
  } else {
    console.error('Price or description element not found');
  }
}

