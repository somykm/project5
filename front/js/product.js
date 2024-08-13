//TODO get product id from URL promater and log it(m5)
//TODO (m6) insert product detail into page, by using innerHTML or innerText
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');//to get the value of productid
console.log('product ID:',productId);
