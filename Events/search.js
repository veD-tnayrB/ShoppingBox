import { productList } from "./shopBox.js";

const searchBar = document.getElementById('search-bar');
const products = [...document.getElementsByClassName('product')];


searchBar.addEventListener('keyup', (e) => {
    console.log(products[1].children[1].textContent)

    products.filter(element => {
        if (element.children[1].textContent === searchBar.value || searchBar.value === '') {
            element.style.display = 'flex'

        }else {
            element.style.display = 'none';
        }
    })
});