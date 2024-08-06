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

    const productElement = document.createElement('a');
    productElement.href = `./product.html?id=${item._id}`;//mls4
    
    const articleElement = document.createElement('article');
    articleElement.article ='Kanap Sinopé';

    const imageElement = document.createElement('img');
    imageElement.src = 'product01.jpg';
    imageElement.alt = 'Lorem ipsum dolor sit amet, Kanap name1';
    imageElement.classList.add('newItem.src');

    productElement.innerHTML = `<h3>${items.name}</h3>
    <p>${items.description}</p>
    `;

    productElement.classList.add('text-center');

    imageElement.setAttribute('src', item.imageUrl);
    imageElement.classList.add('img-center');
    productElement.appendChild(imageElement);
    itemsHolder.appendChild(productElement);
    itemsHolder.appendChild(articleElement);

    
    // TODO finish adding all teg with correct attributes 


    itemsHolder.appendChild(productElement);
  }

}