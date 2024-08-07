fetch('http://localhost:3000/api/products')
  .then(data => {
    return data.json();
  })
  .then(items => {
    console.log(items);
    insertItems(items);
  });

const itemsHolder = document.getElementById('items');
function insertItems(items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    console.log(item);

    const articleElement = document.createElement('article');
    articleElement.article = '';

    const productElement = document.createElement('a');
    productElement.href = `./product.html?id=${item._id}`;//mls4

    const imageElement = document.createElement('img');
    imageElement.src = 'product01.jpg';
    imageElement.alt = 'Lorem ipsum dolor sit amet, Kanap name1';
    imageElement.classList.add('src');
    imageElement.classList.add('alt');


    //this line display item's name and description
    productElement.innerHTML = `<h3>${item.name}</h3>
    <p>${item.description}</p>`;

    imageElement.setAttribute('src', item.imageUrl);
    imageElement.setAttribute('alt', imageElement.altTxt);

    itemsHolder.appendChild(articleElement);
    productElement.appendChild(imageElement);
    itemsHolder.appendChild(productElement);
  }

}