import { product } from "./product.js";

export class UI {
    static productList = document.getElementById('product-list');
    static shoppingBox = document.getElementById('table-body');

    static total = document.getElementById('total');
    static currentTotal = Number(total.textContent.replace('TOTAL:', '').replace('$', ''));

    static showProduct(value) {
        const products = [...UI.productList.children];

        products.forEach(product => {
            let productName = product.children[1].textContent;

            if (productName.includes(value)) {
                product.style.display = 'flex';

            } else if (value === '') {
                product.style.display = 'flex';

            } else {
                product.style.display = 'none';
                
            }
        })
    }

    static addToShoppingBox(listedProduct) {

        const image = listedProduct.querySelector('.product-image').src;
        const name = listedProduct.querySelector('.product-name').textContent;
        const price = listedProduct.querySelector('.product-price').textContent;
        const maker = listedProduct.querySelector('.product-maker').textContent;

        const selectedProduct = new product(image, name, price, maker);
        UI.shoppingBox.appendChild(selectedProduct.createSelectedProduct());

        UI.total.textContent = `TOTAL: ${UI.currentTotal += Number(price.replace('$', ''))}$`;

        listedProduct.remove();
    }

    static removeProduct(selectedProduct) {

        const image = selectedProduct.querySelector('.product-selected-img').src;
        const name = selectedProduct.querySelector('.product-name').textContent;
        const price = selectedProduct.querySelector('.product-price').textContent;
        const maker = selectedProduct.querySelector('.product-maker').textContent;

        const listedProduct = new product(image, name, price, maker);
        UI.productList.appendChild(listedProduct.createlistedProduct());

        const quantity = Number(selectedProduct.querySelector('.count-indicator').textContent)

        UI.total.textContent = `TOTAL: ${UI.currentTotal -= (Number(price.replace('$', '')) * quantity)}$`;
        
        selectedProduct.remove();
    }

    static changeQuantity(button) {
        const product = button.parentNode.parentNode.parentNode;
        const productPrice = Number(product.children[2].children[0].textContent.replace('$', ''));
        
        const count = button.parentNode.children[1];
        const countNumber = Number(count.textContent);

        const symbol = button.textContent;

        if (symbol === '+' && countNumber < 5) {
            count.textContent = `${countNumber + 1}`;
            UI.total.textContent = `TOTAL: ${UI.currentTotal += productPrice}$`;
    
        } else if (symbol === '-' && countNumber >= 2) {
            count.textContent = `${countNumber - 1}`;
            UI.total.textContent = `TOTAL: ${UI.currentTotal -= productPrice}$`;

        } else {
            UI.showMessage('The minimum number of items to buy is 1 and the maximum is 5', '#5f0000');

            product.style.animation = 'impossibleToDo 0.5s ease-in-out';
            setTimeout(() => product.style.animation = '', 600);
        }
    }

    static showMessage(message, color = '#13d301') {
        const messageCont = document.getElementById('message-zone-cont');
        const messageZone = document.createElement('div');

        messageZone.classList.value = 'message-zone';
        messageZone.style.display = 'flex';
        messageZone.style.background = color;
        messageZone.textContent = message;
        messageZone.style.animation = 'appear ease-out 0.3s';

        messageCont.appendChild(messageZone);

        setTimeout(() => {
            messageZone.style.display = 'none';
        }, 3000);

    }
    
    static buyProducts() {
        if (UI.currentTotal > 0) {
            UI.showMessage('The products have been purchased successfully!');
    
        } else {
            UI.showMessage('You must select at least one item to purchase', '#5f0000');
        }
    }

}