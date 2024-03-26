const cardContainer = document.querySelector('[data-card-container]');
const loader = document.querySelector('[data-loader]');
const cardTemplate = document.querySelector('[data-card-template]');
const radioTemplate = document.querySelector('[data-template-radio]');
const cardImageTemplate = cardTemplate.content.querySelector('[data-card-image-template]');
const cardRadioContainerTemplate = cardTemplate.content.querySelector('[data-radio-container-template]');
const cardTitleTemplate = cardTemplate.content.querySelector('[data-card-title-template]');
const cardProductDescrTemplate = cardTemplate.content.querySelector('[data-product-descr-template]');
const cardProductNameTemplate = cardTemplate.content.querySelector('[data-product-name-template]');
const cardProductPriceTemplate = cardTemplate.content.querySelector('[data-product-price-template]');
const cardButtonTemplate = cardTemplate.content.querySelector('[data-card-button-template]');

async function getData() {
    const dataPromise = await fetch('https://api.escuelajs.co/api/v1/products');
    let data = await dataPromise.json();
    return data;
};

function getCorrectUrl(url) {
    const wrongSymbols = ['"', '[', ']'];
    wrongSymbols.forEach((element) => {
        url = url.replaceAll(element, '');
    });
    return url
}


async function createCard(object) {
    let correctUrlArray = object.images.map(getCorrectUrl);
    correctUrlArray.forEach((element, index) => {
        const radioButton = document.createElement('input');
        radioButton.setAttribute('type', 'radio');
        radioButton.setAttribute('name', `image${object.id}`);
        radioButton.value = index;
        radioButton.classList.add('radio-button');
        radioButton.checked = index === 0? true : false;
        cardRadioContainerTemplate.append(radioButton);
    });
    cardImageTemplate.src = object.images[0];
    cardTitleTemplate.textContent = object.title;
    cardProductDescrTemplate.textContent = object.description;
    cardProductNameTemplate.textContent = object.category.name;
    cardProductPriceTemplate.textContent = `$${object.price}`;
    cardButtonTemplate.id = `card-button${object.id}`;
    if (sessionStorage.getItem(`card-button${object.id}`)) {
        cardButtonTemplate.classList.add('card__button--choosed');
        cardButtonTemplate.textContent = 'Choosed';
    } else {
        cardButtonTemplate.textContent = 'Add To Card';
    }
    const card = cardTemplate.content.cloneNode(true);
    cardContainer.append(card);
    const radioGroup = document.getElementsByName(`image${object.id}`);
    radioGroup.forEach(element => {
        element.addEventListener('change', () => {
            element.parentElement.previousElementSibling.src = correctUrlArray[element.value];
        });
    });
    const cardButton = document.querySelector(`#card-button${object.id}`);
    cardButton.addEventListener('click', (event) => {
        event.target.classList.toggle('card__button--choosed');
        if (event.target.classList.contains('card__button--choosed')) {
            sessionStorage.setItem(event.target.id, 'true');
            event.target.textContent = 'Choosed';
        } else {
            sessionStorage.removeItem(event.target.id);
            event.target.textContent = 'Add To Card';
        }
    });
    cardRadioContainerTemplate.innerHTML = '';
    cardButtonTemplate.classList.remove('card__button--choosed');
}

async function showCards() {
    const goodsArray = await getData();
    loader.classList.add('loader--hidden');
    goodsArray.forEach((element) => { 
        if (element.images.indexOf(element.category.image) === -1) {
            element.images.unshift(element.category.image);
        }
        createCard(element);
    });
}
setTimeout(showCards, 5000);
