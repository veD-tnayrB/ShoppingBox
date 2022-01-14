import UI from './js/ui.js'

const productList = document.getElementById('product-list');
const shoppingBox = document.getElementById('table-body');

let product;

let image;
let name;
let price;
let maker;

// Search the products
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keyup', () => UI.showSearchedProduct(searchBar.value));


// Load the defaults products from products.json using fetch
document.addEventListener('DOMContentLoaded', () => {
    async function loadDefaultsProducts() {
        const conexion = await fetch('products.json');
        const data = await conexion.json();

        data.forEach(element => {
            image = element.img;
            name = element.name;
            price = element.price;
            maker = element.maker;

            UI.createListedProduct(image, name, price, maker, 'listed-product', productList);
        });
    }
    loadDefaultsProducts()
});

// Add the selected product to shopping box
productList.addEventListener('click', e => {
    if (e.target.classList.value === 'product') {
        product = e.target;

    } else if (e.target.parentNode.classList.value === 'product') {
        product = e.target.parentNode;
    }
    
    image = product.querySelector('.product-image').src;
    name = product.querySelector('.product-name').textContent;
    price = product.querySelector('.product-price').textContent;
    maker = product.querySelector('.product-maker').textContent;

    UI.createListedProduct(image, name, price, maker, 'selected-product', shoppingBox);
    product.remove();
})

// Remove the selected product and push in product list
shoppingBox.addEventListener('click', e => {
    if (e.target.classList.value === 'delete-product-icon') {
        product = e.target.parentNode.parentNode.parentNode;

        image = product.querySelector('.product-selected-img').src;
        name = product.querySelector('.product-name').textContent;
        price = product.querySelector('.product-price').textContent;
        maker = product.querySelector('.product-maker').textContent;

        UI.createListedProduct(image, name, price, maker, 'listed-product', productList);
        product.remove();

    } else if (e.target.classList.value === 'count-button') {
        UI.changeQuantity(e.target);

    }
})


// Open and close the shopping box section in mobile devices
const shoppingBoxSection = document.getElementById('selected-section');

const openShoppingBoxButton = document.getElementById('shopping-box-button');
openShoppingBoxButton.addEventListener('click', () => {
    UI.setAnimation(shoppingBoxSection, 'shoppingBoxAppear', '300ms', 'initial');
    openShoppingBoxButton.style.display = 'none';
});

const closeShoppingBoxButton = document.getElementById('close-button');
closeShoppingBoxButton.addEventListener('click', () => {
    UI.setAnimation(shoppingBoxSection, 'shoppingBoxDisappear', '300ms', 'flex', true);
    openShoppingBoxButton.style.display = 'flex';
})