const cardContainer = document.querySelector('[data-card-container]');
const cardTemplate = document.querySelector('[data-card-template]');
const cardImageTemplate = cardTemplate.content.querySelector('[data-card-image-template]');
const cardTitleTemplate = cardTemplate.content.querySelector('[data-card-title-template]');
const cardProductDescrTemplate = cardTemplate.content.querySelector('[data-product-descr-template]');
const cardProductNameTemplate = cardTemplate.content.querySelector('[data-product-name-template]');
const cardProductPriceTemplate = cardTemplate.content.querySelector('[data-product-price-template]');

async function getData() {
    const dataPromise = await fetch('https://api.escuelajs.co/api/v1/products');
    let data = await dataPromise.json();
    console.log(data);
    return data;
};

async function createCard(object) {
    cardImageTemplate.src = object.images[0];
    cardTitleTemplate.textContent = object.title;
    cardProductDescrTemplate.textContent = object.description;
    cardProductNameTemplate.textContent = object.category.name;
    cardProductPriceTemplate.textContent = `$${object.price}`;
    const card = cardTemplate.content.cloneNode(true);
    cardContainer.append(card);
}

async function showCards() {
    const goodsArray = await getData();
    goodsArray.forEach((element) => { 
        element.images.unshift(element.category.image);
        createCard(element);
    });
}

showCards();
