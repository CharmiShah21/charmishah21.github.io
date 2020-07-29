let header = document.querySelector('header');
let section = document.querySelector('section');


function fetchProducts(type) {
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=${type}`)
        .then(response => response.json())
        .then((data) => {
            renderProducts(data);
        })
}

function renderProducts(data) {

    for (let i = 0; i < data.length; i++) {
        let article = document.createElement('article');
        let h2 = document.createElement('h2');
        let img = document.createElement('img');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let list = document.createElement('ul');


        img.setAttribute('src', data[i].image_link);
        img.setAttribute('alt', data[i].name);
        h2.textContent = data[i].name;
        p1.textContent = `$${data[i].price}`;
        p2.textContent = data[i].description;

        let colors = data[i].product_colors || [];
        for (let j = 0; j < colors.length; j++) {
            let listItem = document.createElement('li');
            listItem.style.backgroundColor = colors[j].hex_value;
            listItem.style.height = 100;
            listItem.style.width = 100;
            listItem.margin = 10;
            list.appendChild(listItem);
        }

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(list);
        section.appendChild(article);
    }
}


fetchProducts('lipstick');
fetchProducts('eyeliner');

