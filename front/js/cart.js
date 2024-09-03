const cartItems = document.getElementById('cart__items');
const cartArticle =document.createElement('article');

let sofaId = localStorage.getItem('id');
let sofaColor = localStorage.getItem('color');
let sofaQuantity = localStorage.getItem('quantity');

fetch(`http://localhost:3000/api/products`)
.then(respond => {
  return respond.json();
})
.then(data => insertCard(data))
.catch(error => console.log(error))
.finally(()=> console.log('Done'));

function insertCard(data){
  console.log(data);//display idems info

  for( let sofa of data.sofas){
    
    cartArticle.setAttribute('class="cart__item"');
    cartArticle.setAttribute('data-id',sofa.sofaId);
    cartArticle.setAttribute('data-color',sofa.sofaColor);

    cartItems.appendChild(cartArticle);

    const cartDiv = document.createElement('div');
  cartDiv.setAttribute('class="cart__item__img"');
    cartArticle.appendChild(cartDiv);

    const cartImg = document.createElement('img');
    cartImg.setAttribute('src',sofa.imageUrl);
    cartImg.setAttribute('alt', sofa.altTxt);
    cartDiv.appendChild('cartImg');

    const cartDiv2 =document.createElement('div');
    cartDiv2.setAttribute('class="cart__item__content"');
    cartArticle.appendChild(cartDiv2);

    const cartDiv2Div = document.createElement('div');
    cartDiv2InnerA.setAttribute('class="cart__item__content__description"');
    cartDiv2InnerA.innerHTML += `<h2>${sofa.name}</h2>
    <p>${sofa.sofaColor}</p>
    <p>${sofa.price}</p>`;
    cartDiv2.appendChild(cartDiv2InnerA);

    const cartDiv2InnerB = document.createElement('div');
    cartDiv2InnerB.setAttribute('class="cart__item__content__settings"');

    const cartDiv2InnerInner= document.createElement('div');
    cartDiv2InnerInner.setAttribute('class=cart__item__content__settings__quantity');
    cartDiv2InnerInner.innerHTML=`<p>${sofa.sofaQuantity}</p>
    `



  }
}

