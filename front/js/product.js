//TODO get product id from URL promater and log it(m5)
//TODO (m6) insert product detail into page, by using innerHTML or innerText
// const itemInfo = document.querySelector('item__content');
const itemPrice = document.querySelector('span#price');
const itemDesctiption = document.querySelector('item__content__description');
const itemDescrip = document.getElementById('description');
const imgarticle = document.querySelector('article');

//part5
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');//to get the id of the item
console.log('product ID:', productId);

// function makeRequest(productId) {
//   return new Promise((resolve, reject) => {
//     let apiRequest = new XMLHttpRequest();
//     apiRequest.open('POST', productId + '/get product info');
//     apiRequest.onreadystatechangea = () => {
//       if (apiRequest.readyState === 4) {
//         if (apiRequest.status === 201) {
//           resolve(JSON.parse(apiRequest.response));
//         } else {
//           reject(JSON.parse(apiRequest.response));
//         }
//       }
//     };
//     apiRequest.setRequestHeader('Contain-Type', 'application/json');
//     apiRequest.send(JSON.stringify(productId));
//   });
// }

// let apiRequest =new XMLHttpRequest();
// itemInfo.addEventListener('click' , ($event)=>{
// $event.preventDefault();
// const item = productId.value;
// apiRequest.open('GET', 'http://localhost:3000/api/products'+ item );
// apiRequest.send();
// });

// apiRequest.onreadystatechange =() => {
//   if (apiRequest.readyState === 4)
//   {
//     const response =JSON.parse(apiRequest.response);
//     itemInfo.textContent = response.price + response.itemDescrip[1].main;
//   }
// }

const apiUrl = `/api/products/${productId}`;

fetch(apiUrl)
  .then(Response => Response.json())
  .then(productData => {
    displayProductDetails(productData);
  })
  .catch(error => {
    console.error('error fetching product data:', error);
  });

function displayProductDetails(product) {
  const itemInfo = document.querySelector('item__content');
  itemInfo.innerHTML = `<p><span>${product.itemPrice}</span></p>
    <p>${product.itemDescrip}</p>`;
}


