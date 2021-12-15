const productsList = document.getElementById('product-list');

const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('keyup', e => {
    const products = [...productsList.children];

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