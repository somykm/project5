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
      productElement.appendChild(articleElement);
  
      const imageElement = document.createElement('img');
      imageElement.setAttribute('src', item.imageUrl);
      imageElement.setAttribute('alt', item.altTxt);
  
      articleElement.appendChild(imageElement);
  
      //this line display item's name and description
      articleElement.innerHTML += `
        <h3 class="productName">${item.name}</h3>
        <p class="productDescription">${item.description}</p>
      `;
  
  
      itemsHolder.appendChild(productElement);
    }
  
  }