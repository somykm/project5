console.log('conforming');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('orderId');
console.log('Your confirmation order number:', orderId);
displayOrderId(orderId);

/**
 * Displaying the order ID
 * 
 * @param {string} orderId - confirmation orderId
 */
function displayOrderId(orderId) {
  const orderConfirmationId = document.getElementById('orderId');
  if (orderId !== null) {
    orderConfirmationId.innerText = `${orderId}`;
  }
  else {
    console.error('Your order did not go throw!');
  }
}