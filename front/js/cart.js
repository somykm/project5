const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');//to get the id of the item
console.log('product ID:', productId);

fetch(`http://localhost:3000/api/carts/${productId}`)
  .then(data => {
    return data.json();
  })
  .then(product => {
    console.log(product.description);
    console.log(product.price);
    displayData(product);//call func
    displayImage(product);
    insertColorOptions(product);
    displayItemQuantity(product);
  })
  .catch(error => {
    console.error('error fetching:', error)
  });

const cartItems = document.getElementById('cart__items');

const cartArticle =document.createElement('article');
