document.addEventListener('DOMContentLoaded', function () {
  const cartItems = document.getElementById('cart__items');
// console.log(cartItems);
  let sofaId = localStorage.getItem('id');
  let sofaColor = localStorage.getItem('color');
  let sofaQuantity = localStorage.getItem('quantity');

  fetch(`http://localhost:3000/api/products`)
    .then(respond => respond.json())
    .then(data => insertCard(data))
    .catch(error => console.log(error))
    .finally(() => console.log('Done'));

  function insertCard(data) {
    console.log(data);//display idems info

    for (let sofa of data) {
      if (sofa._id === sofaId) {
        const cartArticle = document.createElement('article');
        cartArticle.setAttribute('class', 'cart__item');
        cartArticle.setAttribute('data-id', sofaId);
        cartArticle.setAttribute('data-color', sofaColor);

        cartItems.appendChild(cartArticle);

        const cartDiv = document.createElement('div');
        cartDiv.setAttribute('class', 'cart__item__img');
        cartArticle.appendChild(cartDiv);

        const cartImg = document.createElement('img');
        cartImg.setAttribute('src', sofa.imageUrl);
        cartImg.setAttribute('alt', sofa.altTxt);
        cartDiv.appendChild(cartImg);
        if (cartImg) {
          document.body.style.backgroundImage = "url('" + product.imageUrl + "')";
        }

        const cartDiv2 = document.createElement('div');
        cartDiv2.setAttribute('class', 'cart__item__content');
        cartArticle.appendChild(cartDiv2);

        const cartDiv2InnerA = document.createElement('div');
        cartDiv2InnerA.setAttribute('class', 'cart__item__content__description');
        cartDiv2InnerA.innerHTML += `<h2>${sofa.name}</h2>
    <p>${sofaColor}</p>
    <p>${sofa.price} €</p>`;
        cartDiv2.appendChild(cartDiv2InnerA);

        const cartDiv2InnerB = document.createElement('div');
        cartDiv2InnerB.setAttribute('class', 'cart__item__content__settings');
        cartDiv2.appendChild(cartDiv2InnerB);

        const cartDiv2InnerInner = document.createElement('div');
        cartDiv2InnerInner.setAttribute('class', 'cart__item__content__settings__quantity');
        cartDiv2InnerInner.innerHTML = `<p>${sofaQuantity}</p>`;

        const input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('class', 'itemQuantity');
        input.setAttribute('name', 'itemQuantity');
        input.setAttribute('min', '1');
        input.setAttribute('max', '100');
        input.setAttribute('value', '42');

        cartDiv2InnerInner.appendChild(input);
        cartDiv2InnerB.appendChild(cartDiv2InnerInner);

        const cartDivDelete = document.createElement('div');
        cartDivDelete.setAttribute("class", "cart__item__content__settings__delete");
        cartDivDelete.innerHTML += `<p class="deleteItem>${sofa.Delete}</p>`;

        cartDiv2InnerB.appendChild(cartDivDelete);
      }
    }
  }
});
