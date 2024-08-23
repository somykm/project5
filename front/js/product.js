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
    colorSec(product);
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


//part7
//access to DOM

function displayImage(product) {
  //access DOM 
  const articleSec = document.querySelector('article');
  const imageSec = document.querySelector('.item__img');

  const imageEl = document.createElement('img');
  imageEl.setAttribute('src', product.imageUrl);
  imageEl.setAttribute('alt', product.altTxt);

  imageSec.appendChild(imageEl);

  if(imageSec){
    document.body.style.backgroundImage = "url('" + product.imageUrl + "')";
  }
}

const selectColor =document.getElementById('colors');

function colorSec (){
  const colorSecAccess = document.getElementById('colors');
  let optionGreen = document.createElement('option');
  let optionWhite = document.createElement('option');

  optionGreen.value = 'vert';
  optionWhite.value ='blanc';

  optionGreen.innerHTML ='green';
  optionWhite.innerHTML = 'white';

  colorSecAccess.appendChild(optionGreen);
  colorSecAccess.appendChild(optionWhite);
}

