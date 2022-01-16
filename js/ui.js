export default class UI {

    static productList = document.getElementById('product-list');
    static shoppingBox = document.getElementById('table-body');

    static total = document.getElementById('total');
    static currentTotal = Number(total.textContent.replace('TOTAL:', '').replace('$', ''));


    static showSearchedProduct(value) {
        const textValue = value.toLowerCase()
        const products = [...UI.productList.children];

        products.forEach(product => {
            let productName = product.children[1].textContent.toLowerCase();

            const isFlex = productName.includes(textValue) ? true : false;
            isFlex ? product.style.display = 'flex' : product.style.display = 'none';

        })
    }

    static loadProducts(JSON) {
        JSON.forEach(obj => {
            const productReady = listedProductStructure(obj.image, obj.name, obj.price, obj.maker);
            UI.productList.innerHTML += productReady;
        })
    }

    static flagproduct(product) {
        const checkIcon = `<i class="fas fa-check-circle"></i>`;
        product.innerHTML += checkIcon;
        
    }

    static addProduct(product) {
        let checkIcon = product.querySelector('.fa-check-circle');

        if (checkIcon === null) {
            const [image, name, price, maker] = breakStructure(product);

            const productReady = selectedProductStructure(image, name, price, maker);
            UI.shoppingBox.innerHTML += productReady;
            
            let formatedPrice = Number(price.replace('$', ''));
            UI.total.textContent = `TOTAL: ${UI.currentTotal += formatedPrice}$`;

            UI.showMessage(`${name} Has been added to the box`);
            UI.flagproduct(product);

        }else { 
            UI.setAnimation(product, 'flex', 'impossibleToDo', '300ms');

        }
    }

    static removeProduct(product) {
        const [, name, price] = breakStructure(product); // Thanks for do that post on instagram ;) @jircdeveloper

        let existingProducts = UI.productList.querySelectorAll('.product');

        existingProducts.forEach(listedProduct => {
            let listedProductName = listedProduct.querySelector('.product-name').textContent;

            if (name === listedProductName) {
                const checkIcon = listedProduct.querySelector('.fa-check-circle');
                checkIcon.remove();

                product.remove();
            }
        })

        const quantity = product.querySelector('.count-indicator').textContent;
        UI.total.textContent = `TOTAL: ${UI.currentTotal -= Number(price.replace('$', '')) * quantity}$`;
    }

    static changeQuantity(button) {
        const product = button.parentNode.parentNode.parentNode;
        const productPrice = Number(product.querySelector('.product-price').textContent.replace('$', ''));
        
        const count = product.querySelector('.count-indicator');
        const countNumber = Number(count.textContent);

        const symbol = button.textContent;

        if (symbol === '+' && countNumber < 8) {
            count.textContent = `${countNumber + 1}`;
            UI.total.textContent = `TOTAL: ${UI.currentTotal += productPrice}$`;
    
        } else if (symbol === '-' && countNumber >= 2) {
            count.textContent = `${countNumber - 1}`;
            UI.total.textContent = `TOTAL: ${UI.currentTotal -= productPrice}$`;

        } else {
            UI.showMessage('The minimum number of items to buy is 1 and the maximum is 8', '#a10000');

            UI.setAnimation(product, 'flex', 'impossibleToDo', '400ms');
        }
    }

    static showMessage(message, color = '#13d301') {
        const messageCont = document.getElementById('message-zone-cont');
        const messageZone = document.createElement('div');

        messageZone.classList.value = 'message-zone';
        messageZone.style.background = color;
        messageZone.textContent = message;
        messageCont.appendChild(messageZone);
        UI.setAnimation(messageZone, 'flex', 'messageAppear', '300ms', true);

    }
    
    static buyProducts() {
        let existingProducts = UI.shoppingBox.querySelectorAll('.product-selected');
        
        if (existingProducts.length != 0) {
            let total = 0;

            existingProducts.forEach(product => {
                let productPrice = Number(product.querySelector('.product-price').textContent.replace('$', ''));
                let productQuantity = Number(product.querySelector('.count-indicator').textContent);

                total += productPrice * productQuantity;
            })

            if (UI.currentTotal === total) {
                UI.showMessage('The products have been successfully purchased! Thank you for trusting us');
            }
        } else {
            UI.showMessage('You must select at least one product to purchase', '#a10000')

        }
    }

    static setAnimation(element, setInitialDisplay, animation, duration, hideLater = false, disappearIn = '2500ms') {
        element.style.display = setInitialDisplay;
        element.style.animation = `${animation} ${duration} ease-in-out`;

        if (hideLater === true) {
            setTimeout(() => {
                element.style.display = 'none';

            }, Number(disappearIn.replace('ms', '')));
        }

        setTimeout(() => element.style.animation = '', Number(duration.replace('ms', '')) * 2 + 1);

    }

}

function breakStructure(product) {
    const image = product.querySelector('img').src;
    const name = product.querySelector('.product-name').textContent;
    const price = product.querySelector('.product-price').textContent;
    const maker = product.querySelector('.product-maker').textContent;

    return [image, name, price, maker];
}

const listedProductStructure = (image, name, price, maker) => {
    return  `
    <li transate="no" class="product">
        <img src="${image}" class="product-image">
        <h2 class="product-name">${name}</h2>
        <h3 class="product-price">${price}</h3>
        <h4 class="product-maker">${maker}</h4>
    </li>`;
}

const selectedProductStructure = (image, name, price, maker) => {
    return `
         <tr transate="no" class="product-selected">
            <td><img src="${image}" class="product-selected-img"></td>
            <td><h2 class="product-name">${name}</h2></td>
            <td><h3 class="product-price">${price}</h3></td>
            <td><h4 class="product-maker">${maker}</h4></td>
            <td>
                <div class="count-cont">
                    <button class="count-button">-</button>
                    <span class="count-indicator">1</span>
                    <button class="count-button">+</button>
                </div>
            </td>
            <td><button class="delete-button"><i class="delete-product-icon fas fa-trash"></i></button></td>
        </tr>
    `;
}