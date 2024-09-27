document.addEventListener('DOMContentLoaded', function () {
  const cartItems = document.getElementById('cart__items');
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

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

          input.addEventListener('change', ($event) => {
            const articleElement = $event.target.closest('article');
            const newQuantity = parseInt($event.target.value, 10);
            const itemId = articleElement.getAttribute('data-id');
            const itemColor = articleElement.getAttribute('data-color');

            const cartItem = cart.find(item => item.id === itemId && item.color === itemColor);
            if (cartItem) {
              cartItem.quantity = newQuantity;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateTotalPrice(cart);
            updateTotalQuantity(cart);
          });

          itemContentSettingQuantity.appendChild(input);
          cartItemContentSetting.appendChild(itemContentSettingQuantity);

          const deleteItem = document.createElement('div');
          deleteItem.setAttribute("class", "cart__item__content__settings__delete");
          deleteItem.innerHTML = `<p class="deleteItem">Delete</p>`;

          cartItemContentSetting.appendChild(deleteItem);

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

      const updateTotalPrice = (cart) => {
        const totalPrice = cart.reduce((total, cartItem) => {
          const product = products.find(item => item._id === cartItem.id);
          return total + (product.price * cartItem.quantity);
        }, 0);
        document.getElementById('totalPrice').innerText = `${totalPrice}`;
      };

      const updateTotalQuantity = (cart) => {
        const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
        document.getElementById('totalQuantity').innerText = `${totalQuantity}`;
      };

      const updateLocalStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
      };

      updateTotalPrice(cart);
      updateTotalQuantity(cart);

      /**
       * Display total quantity of items on cart
       * 
       * @param {object} cartItem 
       */
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
    const nameRegex = /^[A-Za-z]{3,100}$/;
    if (!nameRegex.test(contact.firstName)) {
      document.getElementById('firstNameErrorMsg').innerText = 'Enter a valid name';
      isValid = false;
    } else {
      document.getElementById('firstNameErrorMsg').innerText = '';
    }

    if (!nameRegex.test(contact.lastName)) {
      document.getElementById('lastNameErrorMsg').innerText = 'Enter a valid last name!';
      isValid = false;
    } else {
      document.getElementById('lastNameErrorMsg').innerText = '';
    }

    const addressRegex = /^\d+\s[A-Za-z\s]+$/;
    if (!addressRegex.test(contact.address)) {
      addressErrorMsg.innerText = 'Enter a valid address!';
      isValid = false;
    } else {
      addressErrorMsg.innerText = '';
    }

    const cityRegex = /^[A-Za-z\s]+$/;
    if (!cityRegex.test(contact.city)) {
      cityErrorMsg.innerText = 'Enter a valid city name!';
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

    const productIds = JSON.parse(localStorage.getItem('cart')|| '[]').map(item => item.id);
    if (isValid && productIds) {
  
      const order = {
        contact: contact,
        products: productIds
      };

      fetch('http://localhost:3000/api/products/order', {
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
          localStorage.removeItem('cart');
          window.location.href = `confirmation.html?orderId=${data.orderId}`;
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
    else{
      alert("Please verify the order information");
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


