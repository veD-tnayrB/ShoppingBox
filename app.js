import { UI } from './js/ui.js'

const searchBar = document.getElementById('search-bar');
const productList = document.getElementById('product-list');
const shoppingBox = document.getElementById('table-body');
const buyButton = document.getElementById('buy-button');

// Search the products
searchBar.addEventListener('keyup', () => UI.showProduct(searchBar.value));


// Add products to shoppingBox
productList.addEventListener('click', e => {
    if (e.target.classList.value === 'product') UI.addToShoppingBox(e.target);

    else if (e.target.parentNode.classList.value === 'product') UI.addToShoppingBox(e.target.parentNode);
});


// Remove products from shoppingBox and change the amount of products to buy
shoppingBox.addEventListener('click', e => {
    if (e.target.classList.value === 'delete-product-icon') UI.removeProduct(e.target.parentNode.parentNode.parentNode);

    else if (e.target.classList.value === 'count-button') UI.changeQuantity(e.target);
});


// Buy all elements
buyButton.addEventListener('click', () => UI.buyProducts())


// Hide and Show the shopping box
const shoppingBoxCont = document.getElementById('selected-section');
const shoppingBoxButton = document.getElementById('shopping-box-button');
const backButton = document.getElementById('close-button');

shoppingBoxButton.addEventListener('click', e => {
    shoppingBoxCont.style.display = 'flex';
    shoppingBoxCont.style.animation = 'shoppingBoxAppear 0.4s ease-out';
    
    shoppingBoxButton.style.display = 'none';
});

backButton.addEventListener('click', e => {
    shoppingBoxCont.style.animation = 'shoppingBoxDisappear 0.4s ease-out';
    setTimeout(() => shoppingBoxCont.style.display = 'none', 300) //Wait for the animation to finish executing to hide it
    shoppingBoxButton.style.display = 'flex';
})