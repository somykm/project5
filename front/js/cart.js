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

          // Add event listener for quantity change
          input.addEventListener('change', ($event) => {
            const articleElement = $event.target.closest('article');
            const newQuantity = parseInt($event.target.value, 10);
            const itemId = articleElement.getAttribute('data-id');
            const itemColor = articleElement.getAttribute('data-color');

            // Update the cart array
            const cartItem = cart.find(item => item.id === itemId && item.color === itemColor);
            if (cartItem) {
              cartItem.quantity = newQuantity;
            }
            // Update local storage
            localStorage.setItem('cart', JSON.stringify(cart));
            updateTotalPrice(cart);
            updateTotalQuantity(cart);

            //TODO add code to get the new quantity for the cart item that being change by user
            //TODO get cart item, product id and color that being changed
            //TODO get the latest cart from local Storage
            //TODO provide the price of the item that has been changed by passing in the products array 
            //TODO after getting the new quantity update the new totals, price, and local Storage 
          });

          itemContentSettingQuantity.appendChild(input);
          cartItemContentSetting.appendChild(itemContentSettingQuantity);

          const deleteItem = document.createElement('div');
          deleteItem.setAttribute("class", "cart__item__content__settings__delete");
          deleteItem.innerHTML = `<p class="deleteItem">Delete</p>`;

          cartItemContentSetting.appendChild(deleteItem);

          // Add event listener for delete button
          deleteItem.addEventListener('click', ($event) => {
            const cartArticle = $event.target.closest('.cart__item');
            const itemId = cartArticle.getAttribute('data-id');
            const itemColor = cartArticle.getAttribute('data-color');

            cart = cart.filter(item => item.id !== itemId || item.color !== itemColor);
            cartArticle.remove();
            updateLocalStorage(cart);
            updateTotalPrice(cart);
            updateTotalQuantity(cart);
          });
          displayTotalQuantity(cartItem);
        }
      });

      // Calculate and display total price
      const updateTotalPrice = (cart) => {
        const totalPrice = cart.reduce((total, cartItem) => {
          const product = products.find(item => item._id === cartItem.id);
          return total + (product.price * cartItem.quantity);
        }, 0);
        document.getElementById('totalPrice').innerText = `${totalPrice}`;
      };

      // Update total quantity
      const updateTotalQuantity = (cart) => {
        const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
        document.getElementById('totalQuantity').innerText = `${totalQuantity}`;
      };

      //update local storage
      const updateLocalStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
      };

      updateTotalPrice(cart);
      updateTotalQuantity(cart);

      function displayTotalQuantity(cartItem) {
        const displayElement = document.getElementById('totalQuantity');

        const totalQuantity = parseInt(displayElement.textContent || "0");
        displayElement.textContent = totalQuantity + cartItem.quantity;
      }
    })
    .catch(error => console.log(error));
});

//mileS-9
document.addEventListener('DOMContentLoaded', function () {
  const addressErrorMsg = document.getElementById('addressErrorMsg');
  const cityErrorMsg = document.getElementById('cityErrorMsg');
  const emailErrorMsg = document.getElementById('emailErrorMsg');
  document.querySelector('.cart__order__form').addEventListener('submit', ($event) => {
    $event.preventDefault();
    const contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value
    };

    let isValid = true;

    // Validate first name, last, address...
    const nameRegex = /^[A-Z][a-z]*$/;//First letter capital, rest lowercase
    if (!nameRegex.test(contact.firstName)) {
      document.getElementById('firstNameErrorMsg').innerText = 'First name is required';
      isValid = false;
    } else {
      document.getElementById('firstNameErrorMsg').innerText = '';
    }

    if (!nameRegex.test(contact.lastName)) {
      document.getElementById('lastNameErrorMsg').innerText = 'Last name is required';
      isValid = false;
    } else {
      document.getElementById('lastNameErrorMsg').innerText = '';
    }

    const addressRegex =/^\d+\s[A-Aa-z\s]+$/; //start with num, followed by street name
    if (!addressRegex.test(contact.address)) {
      addressErrorMsg.innerText = 'Address is required';
      isValid = false;
    } else {
      addressErrorMsg.innerText = '';
    }

    const cityRegex =/^[A-Za-z\s]+$/;//only letter and white space
    if (!cityRegex.test(contact.city)) {
      cityErrorMsg.innerText = 'Enter a valid city name';
      isValid = false;
    } else {
      cityErrorMsg.innerText = '';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.email)) {
      emailErrorMsg.innerText = 'Enter a valid email!';
      isValid = false;
    } else {
      emailErrorMsg.innerText = '';
    }

    if (isValid) {
      // Create order object
      const productIds = [];
       productIds.forEach(item => {
        productIds.push(item.id);
      });

      const order = {
        contact: contact,
        products: productIds
      };

      // Send order to server
      fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          alert('Order confirmed! Order ID: ' + data.orderId);
          // Clear cart and local storage
          cart = [];
          localStorage.removeItem('cart');
          updateTotalPrice();
          updateTotalQuantity();
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  });
});

const updateTotalPrice = () => {
  const totalPrice = cart.reduce((total, cartItem) => {
    const product = products.find(item => item._id === cartItem.id);
    return total + (product.price * cartItem.quantity);
  }, 0);

  document.getElementById('totalPrice').innerText = `${totalPrice}`;
};

const updateTotalQuantity = () => {
  const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  document.getElementById('totalQuantity').innerText = `${totalQuantity}`;
};


