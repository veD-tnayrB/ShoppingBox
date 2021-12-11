const products = [...document.getElementsByClassName('product')];
const productsNameArr = products.map(product => product.children[1].textContent.toLowerCase());
const searchBar = document.getElementById('search-bar');

let as = [];
searchBar.addEventListener('keyup', e => {
    products.forEach(product => {
        let productName = product.children[1].textContent;

        if (productName.includes(searchBar.value)) {
            product.style.display = 'flex';

        } else if (searchBar.value === '') {
            product.style.display = 'flex';

        } else {
            product.style.display = 'none';
            
        }
    })
})