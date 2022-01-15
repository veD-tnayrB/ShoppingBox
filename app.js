import UI from './js/ui.js';

const productList = document.getElementById('product-list');
const shoppingBox = document.getElementById('table-body');


// Search the products
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keyup', () => UI.showSearchedProduct(searchBar.value));


// Add the selected product to shopping box
productList.addEventListener('click', e => {
    let product;

    if (e.target.classList.value === 'product') {
        product = e.target;

        UI.addProduct(product, 'selected-product');
    }
    else if (e.target.parentNode.classList.value === 'product') { 
        product = e.target.parentNode;

        UI.addProduct(product, 'selected-product');

    } else {
        console.log('any selected product'); // I put this here cause an error appear else (srry bad english)
    }
});


// Remove products from shoppingBox and change the amount of products to buy
shoppingBox.addEventListener('click', e => {
    if (e.target.classList.value === 'delete-product-icon fas fa-trash') {
        let product = e.target.parentNode.parentNode.parentNode;
        UI.removeProduct(product)
       

    } else if (e.target.classList.value === 'count-button') UI.changeQuantity(e.target);
});


// "Buy" all elements
const buyButton = document.getElementById('buy-button');
buyButton.addEventListener('click', () => UI.buyProducts())


// Hide and Show the shopping box seccion in mobile devices
const shoppingBoxSeccion = document.getElementById('selected-section');
const openShoppingBoxButton = document.getElementById('open-shopping-box-button');
const closeShoppingBoxButton = document.getElementById('close-button');

openShoppingBoxButton.addEventListener('click', e => {
    UI.setAnimation(shoppingBoxSeccion, 'flex', 'shoppingBoxAppear', '300ms');
    openShoppingBoxButton.style.display = 'none';
});

closeShoppingBoxButton.addEventListener('click', e => {
    UI.setAnimation(shoppingBoxSeccion, 'flex', 'shoppingBoxDisappear', '300ms', true);
    openShoppingBoxButton.style.display = 'flex';
})