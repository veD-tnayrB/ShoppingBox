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

            if (productName.includes(textValue)) {
                product.style.display = 'flex';

            } else if (textValue === '') {
                product.style.display = 'flex';

            } else {
                product.style.display = 'none';
                
            }
        })
    }

    static flagproduct(product) {
        const checkIcon = document.createElement('i');
        checkIcon.classList.add('fas');
        checkIcon.classList.add('fa-check-circle');

        product.appendChild(checkIcon);
        
    }

    static addProduct(product, template) {

        if (product.querySelector('.fa-check-circle') === null) {
            UI.flagproduct(product);

            const productTemplate = document.getElementById(template).content;
    
            const productImgSrc = product.querySelector('img').src;
            const imgSrc = productTemplate.querySelector('img');
            imgSrc.setAttribute('src', productImgSrc);
                
            const productNameText = product.querySelector('.product-name').textContent;
            const name = productTemplate.querySelector('.product-name');
            name.textContent = productNameText;
            
            const productPriceText = product.querySelector('.product-price').textContent;
            const price = productTemplate.querySelector('.product-price');
            price.textContent = productPriceText;
            
            const productMakerText = product.querySelector('.product-maker').textContent;
            const maker = productTemplate.querySelector('.product-maker');
            maker.textContent = productMakerText;
            
            UI.total.textContent = `TOTAL: ${UI.currentTotal += Number(price.textContent.replace('$', ''))}$`;

            UI.shoppingBox.appendChild(productTemplate.cloneNode(true));
            UI.showMessage(`${productNameText} Has been added to the box`);

        }else { 
            UI.setAnimation(product, 'flex', 'impossibleToDo', '300ms');

        }
    }

    static removeProduct(product) {
        let productSelectedName = product.querySelector('.product-name').textContent;
        let existingProducts = UI.productList.querySelectorAll('.product');

        existingProducts.forEach(listedProduct => {
            let listedProductName = listedProduct.querySelector('.product-name').textContent;

            if (productSelectedName === listedProductName) {
                const checkIcon = listedProduct.querySelector('.fa-check-circle');
                checkIcon.remove();

                product.remove();
            }
        })


        const price = product.querySelector('.product-price').textContent.replace('$', '');
        const quantity = product.querySelector('.count-indicator').textContent;

        UI.total.textContent = `TOTAL: ${UI.currentTotal -= Number(price) * quantity}$`;
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
            UI.showMessage('The minimum number of items to buy is 1 and the maximum is 5', '#a10000');

            UI.setAnimation(product, 'flex', 'impossibleToDo', '300ms');
        }
    }

    static showMessage(message, color = '#13d301') {
        const messageCont = document.getElementById('message-zone-cont');
        const messageZone = document.createElement('div');

        messageZone.classList.value = 'message-zone';
        messageZone.style.display = 'flex';
        messageZone.style.background = color;
        messageZone.textContent = message;
        messageZone.style.animation = 'messageAppear ease-out 0.3s';

        messageCont.appendChild(messageZone);

        setTimeout(() => {
            messageZone.style.display = 'none';
        }, 3000);

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

    static setAnimation(element, setInitialDisplay, animation, duration, hideLater = false) {
        element.style.display = setInitialDisplay;
        element.style.animation = `${animation} ${duration} ease-in-out`;

        if (hideLater === true) {
            setTimeout(() => element.style.display = 'none', Number(duration.replace('ms', '')) + 1);
        }

        setTimeout(() => element.style.animation = '', Number(duration.replace('ms', '')) + 2)

    }


}