document.addEventListener('DOMContentLoaded', function () {
  const cartItems = document.getElementById('cart__items');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  fetch(`http://localhost:3000/api/products`)
    .then(respond => respond.json())
    .then(products => {
      cart.forEach(cartItem => {
        const product = products.find(item => item._id === cartItem.id);

        if (product) {
          const cartArticle = document.createElement('article');
          cartArticle.setAttribute('class', 'cart__item');
          cartArticle.setAttribute('data-id', cartItem.id);
          cartArticle.setAttribute('data-color', cartItem.color);

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
    <p>${cartItem.color}</p>
    <p>${product.price} €</p>`;
          cartItemContent.appendChild(itemContentDescrip);

          const cartItemContentSetting = document.createElement('div');
          cartItemContentSetting.setAttribute('class', 'cart__item__content__settings');
          cartItemContent.appendChild(cartItemContentSetting);

          const itemContentSettingQuantity = document.createElement('div');
          itemContentSettingQuantity.setAttribute('class', 'cart__item__content__settings__quantity');
          itemContentSettingQuantity.innerHTML = `<p>Quantity: ${cartItem.quantity}</p>`;

          const input = document.createElement('input');
          input.setAttribute('type', 'number');
          input.setAttribute('class', 'itemQuantity');
          input.setAttribute('name', 'itemQuantity');
          input.setAttribute('min', '1');
          input.setAttribute('max', '100');
          input.setAttribute('value', cartItem.quantity);

          itemContentSettingQuantity.appendChild(input);
          cartItemContentSetting.appendChild(itemContentSettingQuantity);

          const deleteItem = document.createElement('div');
          deleteItem.setAttribute("class", "cart__item__content__settings__delete");
          deleteItem.innerHTML = `<p class="deleteItem">Delete</p>`;

          cartItemContentSetting.appendChild(deleteItem);

          // Add event listener for delete button
          deleteItem.addEventListener('click', () => {
            if (cartItem.quantity > 1) {
              cartItem.quantity--;
              input.value = cartItem.quantity;
              itemContentSettingQuantity.innerHTML = `<p>Quantity: ${cartItem.quantity}</p>`;
            }
            else {
              cart = cart.filter(item => item.id !== cartItem.id || item.color !== cartItem.color);
              cartArticle.remove();
            }
            updateTotalPrice();
            updateTotalQuantity();
            updateLocalStorage();
          });


          // deleteItem.addEventListener('click', (event) => {
          //   const cartArticle = event.target.closest('.cart__item');
          //   const itemId = cartArticle.getAttribute('data-id');
          //   const itemColor = cartArticle.getAttribute('data-color');

          //   cart = cart.filter(item => item.id !== itemId || item.color !== itemColor);
          //   cartArticle.remove();
          //   updateLocalStorage();
          //   updateTotalPrice();
          //   updateTotalQuantity();
          // });

          displayTotalQuantity(cartItem);
        }
      });

      // Calculate and display total price
      const updateTotalPrice = () => {
        const totalPrice = cart.reduce((total, cartItem) => {
          const product = products.find(item => item._id === cartItem.id);
          return total + (product.price * cartItem.quantity);
        }, 0);
        document.getElementById('totalPrice').innerText = `${totalPrice}`;
      };

      // Update total quantity
      const updateTotalQuantity = () => {
        const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
        document.getElementById('totalQuantity').innerText = `${totalQuantity}`;
      };

      //update local storage
      const updateLocalStorage = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
      };


      function displayTotalQuantity(cartItem) {
        const displayElement = document.getElementById('totalQuantity');

        const totalQuantity = parseInt(displayElement.textContent || "0");
        displayElement.textContent = totalQuantity + cartItem.quantity;
      }
    })
    .catch(error => console.log(error));
});


