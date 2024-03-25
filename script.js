const cardContainer = document.querySelector('[data-card-container]');
const cardTemplate = document.querySelector('[data-card-template]');
const radioTemplate = document.querySelector('[data-template-radio]');
const cardImageTemplate = cardTemplate.content.querySelector('[data-card-image-template]');
const cardRadioContainerTemplate = cardTemplate.content.querySelector('[data-radio-container-template]');
const cardTitleTemplate = cardTemplate.content.querySelector('[data-card-title-template]');
const cardProductDescrTemplate = cardTemplate.content.querySelector('[data-product-descr-template]');
const cardProductNameTemplate = cardTemplate.content.querySelector('[data-product-name-template]');
const cardProductPriceTemplate = cardTemplate.content.querySelector('[data-product-price-template]');

async function getData() {
    const dataPromise = await fetch('https://api.escuelajs.co/api/v1/products');
    let data = await dataPromise.json();
    // console.log(data);
    return data;
};

async function getCorrectUrl(url) {
    const wrongSymbols = ['"', '[', ']'];
    wrongSymbols.forEach((element) => {
        url = url.replaceAll(element, '');
    });
}


async function createCard(object) {
    getCorrectUrl(object.images[1]);
    object.images.forEach((element, index) => {
        const radioButton = document.createElement('input');
        radioButton.setAttribute('type', 'radio');
        radioButton.setAttribute('name', `image${object.id}`);
        radioButton.value = index;
        radioButton.checked = index === 0? true : false;
        cardRadioContainerTemplate.append(radioButton);
    });
    cardImageTemplate.src = object.images[0];
    cardTitleTemplate.textContent = object.title;
    cardProductDescrTemplate.textContent = object.description;
    cardProductNameTemplate.textContent = object.category.name;
    cardProductPriceTemplate.textContent = `$${object.price}`;
    const card = cardTemplate.content.cloneNode(true);
    cardContainer.append(card);
    const radioGroup = document.getElementsByName(`image${object.id}`);
    radioGroup.forEach(element => {
        element.addEventListener('change', () => {
            console.log(1);
        });
    })
    cardRadioContainerTemplate.innerHTML = '';
}

async function showCards() {
    const goodsArray = await getData();
    goodsArray.forEach((element) => { 
        element.images.unshift(element.category.image);
        createCard(element);
    });
}

showCards();
