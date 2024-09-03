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
    displayImage(product);
    insertColorOptions(product);

  })
  .catch(error => {
    console.error('error fetching:', error)
  });
  const colorSelectionAccess = document.getElementById('colors');
  const addToCartButton = document.getElementById('addToCart');
//part6, display data u get from api
/**
 * Inserts selected item info like as description, price, name.
 * 
 * @param {object} product - product info 
 */
function displayData(product) {
  const priceParagraph = document.getElementById('price');
  const descriptionParag = document.getElementById('description');
  const itemName = document.getElementById('title');

  if (priceParagraph && descriptionParag && itemName) {
    priceParagraph.textContent = `${product.price}`;
    descriptionParag.textContent = `${product.description}`;
    itemName.textContent = `${product.name}`;
  } else {
    console.error('Price or description element not found');
  }
}
//part7
//access to DOM

/**
 * Display selected image.
 * 
 * @param {object} product - image info
 */
function displayImage(product) {
  //access DOM 
  const articleSec = document.querySelector('article');
  const imageSec = document.querySelector('.item__img');

  const imageEl = document.createElement('img');
  imageEl.setAttribute('src', product.imageUrl);
  imageEl.setAttribute('alt', product.altTxt);

  imageSec.appendChild(imageEl);

  if (imageSec) {
    document.body.style.backgroundImage = "url('" + product.imageUrl + "')";
  }
}

/**
 * Inserts color options for given products.
 * 
 * @param {object} product - product info
 */
function insertColorOptions(product) {
  product.colors.forEach(color => {
    console.log(color);
    let option = document.createElement('option');

    option.value = color;
    option.innerHTML = color;

    colorSelectionAccess.appendChild(option);
  });
}

addToCartButton.addEventListener('click', () => {
  const quantity = parseInt(document.getElementById('quantity').value);
  const color = document.getElementById('colors').value;
  //create an array of item detail
  let cartItem = {
    id: productId,
    color,
    quantity
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  //TODO check first if there is already the same id in the cart, if there is increase the Quan if not puch it
  const itemIdToFind = productId;
  let foundItem = false;
  for (let item of cart) {
    if (item.id === itemIdToFind && item.color ===color) {
      item.quantity += quantity;
      foundItem = true;
      break;
    }
  }

  if (!foundItem) {
    cart.push({ id: itemIdToFind, quantity: quantity, color: color });
  } else {
    console.log(`Item with id ${itemIdToFind}not found.`);
    cart.push(cartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  //TODO  show alert indecating product added to the cart sussessfully 
})

//TODO add event listener for button
//Fetch selected, color , and Id add them 
