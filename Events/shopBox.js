import showMessage from "./messages.js";

const productList = document.getElementById('product-list')
const shoppingBox = document.getElementById('table-body');

const total = document.getElementById('total');
let currentTotal = Number(total.textContent.replace('TOTAL:', '').replace('$', ''));


// Add element to shoppingBox
productList.addEventListener('click', e => {
    let product;
    if (e.target.className === 'product') {
        product = e.target;

    } else if (e.target.parentNode.className === 'product') {
        product = e.target.parentNode;

    } else {
        console.log('Any selected product');
        return;
    }
    
    // Add the selected product to a table (shoppingBox)
    const tableRow = document.createElement('tr');
    tableRow.className = 'product-selected';

    let productChildrens = [...product.children]
    productChildrens[0].className = 'product-selected-img';
    productChildrens[4].style.display = 'block';
    productChildrens[4].children[1].textContent = '1';
    productChildrens[5].style.display = 'block';

    productChildrens.forEach(childrenElement => {
        const tableCell = document.createElement('td');

        tableCell.appendChild(childrenElement);
        tableRow.appendChild(tableCell);
    });

    const fragment = document.createDocumentFragment();
    fragment.appendChild(tableRow)
    shoppingBox.appendChild(fragment)
    product.remove()
    showMessage(`${productChildrens[1].textContent} It has been successfully added to the shopping box!`)

    // Get and show the total price
    let productPrice = Number(productChildrens[2].textContent.replace('$', ''));

    total.textContent = `TOTAL: ${currentTotal += productPrice}$`;
});

// It detects when a button is pressed and based on that it increases or reduces the amount of products to buy.
shoppingBox.addEventListener('click', e => {
    // Calculate the total of all items based on their quantity
    if (e.target.className === 'count-button') {
        
        let product = e.target.parentNode.parentNode.parentNode;
        let productPrice = Number(product.children[2].textContent.replace('$', ''));

        let count = e.target.parentNode.children[1];
        let countNumber = Number(count.textContent);

        function countCalculator(productPrice, symbol) {
            if (symbol === '+' && countNumber < 5) {
                count.textContent = `${countNumber + 1}`;
                total.textContent = `TOTAL: ${currentTotal += productPrice}$`;
        
            } else if (symbol === '-' && countNumber >= 2) {
                count.textContent = `${countNumber - 1}`;
                total.textContent = `TOTAL: ${currentTotal -= productPrice}$`;
    
            } else {
                showMessage('The minimum number of items to buy is 1 and the maximum is 5', '#5f0000');
            };
        };

        countCalculator(productPrice, e.target.textContent);

    };
})


// Delete the selected product
shoppingBox.addEventListener('click', e => {
    let product;
    if (e.target.className === 'deleteButton') {
        product = e.target.parentNode.parentNode;

    } else if (e.target.parentNode.className === 'deleteButton') {
        product = e.target.parentNode.parentNode.parentNode;
    }


    let liCont = document.createElement('li');
    liCont.className = 'product';
        
    let productChildrens = [...product.children];

    productChildrens[0].children[0].className = 'product-image';
    productChildrens[4].children[0].style.display = 'none';
    productChildrens[5].children[0].style.display = 'none';

    let productPrice = Number(productChildrens[2].children[0].textContent.replace('$', ''));
    let amount = Number(product.children[4].children[0].children[1].textContent);

    total.textContent = `TOTAL: ${currentTotal -= (productPrice * amount)}$`;
    

    productChildrens.forEach(contElement => {
        liCont.appendChild(contElement.children[0]);
    });

    showMessage(`${liCont.children[1].textContent} Has been successfully removed!`, '#5f0000');

    product.remove();
    productList.appendChild(liCont);
});


// Buy all Elements selected
const buyButton = document.getElementById('buy-button');
buyButton.addEventListener('click', e => {
    if (currentTotal > 0) {
        showMessage('The products have been purchased successfully!');

    } else {
        showMessage('You must select at least one item to purchase', '#5f0000')
    };
});