document.addEventListener('DOMContentLoaded', function () {
  const cartItems = document.getElementById('cart__items');
  let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

  // let sofaId = localStorage.getItem('id');
  // let sofaColor = localStorage.getItem('color');
  // let sofaQuantity = localStorage.getItem('quantity');

  fetch(`http://localhost:3000/api/products`)
    .then(respond => respond.json())
    .then(data => {
      cartProducts.forEach(cart => {
        const product = data.find(item => item._id === cart.id);

        if (product) {
          const cartArticle = document.createElement('article');
          cartArticle.setAttribute('class', 'cart__item');
          cartArticle.setAttribute('data-id', cart.id);
          cartArticle.setAttribute('data-color', cart.color);

          cartItems.appendChild(cartArticle);

          const cartItemImg = document.createElement('div');
          cartItemImg.setAttribute('class', 'cart__item__img');
          cartArticle.appendChild(cartItemImg);

          const cartImg = document.createElement('img');
          cartImg.setAttribute('src', product.imageUrl);
          cartImg.setAttribute('alt', product.altTxt);
          cartItemImg.appendChild(cartImg);

          const cartItemContent = document.createElement('div');
          cartItemContent.setAttribute('class', 'cart__item__content');
          cartArticle.appendChild(cartItemContent);

          const itemContentDescrip = document.createElement('div');
          itemContentDescrip.setAttribute('class', 'cart__item__content__description');
          itemContentDescrip.innerHTML += `<h2>${product.name}</h2>
    <p>${cart.color}</p>
    <p>${product.price} €</p>`;
          cartItemContent.appendChild(itemContentDescrip);

          const cartItemContentSetting = document.createElement('div');
          cartItemContentSetting.setAttribute('class', 'cart__item__content__settings');
          cartItemContent.appendChild(cartItemContentSetting);

          const itemContentSettingQuantity = document.createElement('div');
          itemContentSettingQuantity.setAttribute('class', 'cart__item__content__settings__quantity');
          itemContentSettingQuantity.innerHTML = `<p>Quantity: ${cart.quantity}</p>`;

          const input = document.createElement('input');
          input.setAttribute('type', 'number');
          input.setAttribute('class', 'itemQuantity');
          input.setAttribute('name', 'itemQuantity');
          input.setAttribute('min', '1');
          input.setAttribute('max', '100');
          input.setAttribute('value', cart.quantity);

          itemContentSettingQuantity.appendChild(input);
          cartItemContentSetting.appendChild(itemContentSettingQuantity);

          const deleteItem = document.createElement('div');
          deleteItem.setAttribute("class", "cart__item__content__settings__delete");
          deleteItem.innerHTML = `<p class="deleteItem">Delete</p>`;

          cartItemContentSetting.appendChild(deleteItem);
        }
      });
      // Calculate and display total price
      const totalPrice = cartProducts.reduce((total, cart) => {
        const product = data.find(item => item._id === cart.id);
        return total + (product.price * cart.quantity);
      }, 0);

      document.getElementById('totalPrice').innerText = `: ${totalPrice} €`;


      document.getElementById('totalQuantity').innerText = `${totalQuantity}`;

    })
    .catch(error => console.log(error));
});
const deleteItem= document.querySelector('.deleteItem');
const cartItemQuantity =document.querySelector('.itemQuantity');
deleteItem.addEventListener('click',() =>{
  const itemQuantityCount = cartItemQuantity.childElementCount;
  if(itemQuantityCount>0){
    cartItemQuantity.removeChild(cartItemQuantity.children [itemQuantityCount -1]);
  }
});

function deleteItems(id, color) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems = cartItems.filter(item => !(item.id === id && item.color === color));
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  location.reload(); // Reload the page to reflect the changes
}