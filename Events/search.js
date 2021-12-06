const productList = document.getElementById('product-list');
const products = [...productList.children]

const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('keyup', e => {

    products.forEach(element => {
        let productName = element.children[1].textContent;
        let searchValue = searchBar.value

        if (productName.includes(searchValue)) {
            element.style.display = 'flex';

        } else if (searchBar.value === '') {
            element.style.display = 'flex';

        } else {
            element.style.display = 'none';

        }
        
    })
})