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
  // const articleSec = document.querySelector('article');
  const imageSection = document.querySelector('.item__img');

  const imageElement = document.createElement('img');
  imageElement.setAttribute('src', product.imageUrl);
  imageElement.setAttribute('alt', product.altTxt);

  imageSection.appendChild(imageElement);

  if (imageSection) {
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
  if (quantity && color) {
    //create an array of item detail
    let cartItem = {
      id: productId,
      color,
      quantity
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIdToFind = productId;
    let foundItem = false;
    for (let item of cart) {
      if (item.id === itemIdToFind && item.color === color) {
        item.quantity += quantity;
        foundItem = true;
        break;
      }
    }

    if (!foundItem) {
      cart.push({ id: itemIdToFind, quantity: quantity, color: color });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert("successfully added to the cart");
  } else {
    alert('Please select color and quantity!');
  }
})