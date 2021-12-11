const products = [...document.getElementsByClassName('product')];
const productsNameArr = products.map(product => product.children[1].textContent.toLowerCase());
const searchBar = document.getElementById('search-bar');

let as = [];
searchBar.addEventListener('keyup', e => {
    products.forEach(product => {
        console.log(product.children[1].textContent)
    })
})