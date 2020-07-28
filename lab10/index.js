let header = document.querySelector('header');
let section = document.querySelector('section');


let requestURL = "https://raw.githubusercontent.com/CharmiShah21/charmishah21.github.io/master/products.json";

let request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function () {
    const jsonObj = request.response;
    populateHeader(jsonObj);
    renderTopDeals(jsonObj);
}

function populateHeader(jsonObj) {
    let headerH1 = document.createElement('h1');
    headerH1.textContent = jsonObj['companyName'];
    header.appendChild(headerH1);

    let headpara = document.createElement('p');
    headpara.textContent = jsonObj['headOffice'];
    header.appendChild(headpara);
}

function renderTopDeals(jsonObj) {
    let topDeals = jsonObj['topDeals'];
    for (let i = 0; i < topDeals.length; i++) {
        let article = document.createElement('article');
        let h2 = document.createElement('h2');
        let img = document.createElement('img');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let list = document.createElement('ul');


        img.setAttribute('src', 'images/' + topDeals[i].image);
        img.setAttribute('alt', topDeals[i].name);
        h2.textContent = topDeals[i].name;
        p1.textContent = `$${topDeals[i].price}`;
        p2.textContent = topDeals[i].description;

        let features = topDeals[i].features || [];
        for (let j = 0; j < features.length; j++) {
            let listItem = document.createElement('li');
            listItem.textContent = features[j];
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