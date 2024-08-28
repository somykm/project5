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
    getItemQuantity(product);
  })
  .catch(error => {
    console.error('error fetching:', error)
  });
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

const colorSelectionAccess = document.getElementById('colors');

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


const itemQuan = document.getElementsByTagName('label');
const selectBtn = document.getElementById('addToCart');

function getItemQuantity() {
  
  itemQuan.textContent = quantity;
}
selectBtn.addEventListener('click', ()=>{
  const quantity = document.getElementById('itemQuantity').value;
  itemQuan.textContent = quantity;
  localStorage.setItem("itemQuantity", quantity);
})

let itemDetail = [
{id: productId,
color:insertColorOptions(),
quantityOfItem:getItemQuantity()}
];

const itemsString = JSON.stringify(itemDetail);//convert into array

localStorage.setItem('itemDetail', itemsString);




//TODO add event listener for button
//Fetch selected, color , and Id add them 
