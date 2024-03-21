async function getData() {
    const dataPromise = await fetch('https://api.escuelajs.co/api/v1/products');
    let data = await dataPromise.json();
    return data;
};
