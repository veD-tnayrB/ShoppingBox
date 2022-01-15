export default class UI {

    static productList = document.getElementById('product-list');
    static shoppingBox = document.getElementById('table-body');

    static total = document.getElementById('total');
    static currentTotal = Number(total.textContent.replace('TOTAL:', '').replace('$', ''));



    static showSearchedProduct(value) {
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

    static flagproduct(product) {
        const checkIcon = document.createElement('i');
        checkIcon.classList.add('fas fa-check-circle');

        product.appendChild(checkIcon); // Working profess man, calm down 🤨
    }

    static createProductStructure(product, template, destiny) {
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
    
        if (template === 'listed-product') {
            const quantity = Number(product.querySelector('.count-indicator').textContent);

            UI.total.textContent = `TOTAL: ${UI.currentTotal -= Number(price.textContent.replace('$', '')) * quantity}$`;

        } else {
            UI.total.textContent = `TOTAL: ${UI.currentTotal += Number(price.textContent.replace('$', ''))}$`;
        }

        destiny.appendChild(productTemplate.cloneNode(true));
        product.remove();
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
        messageZone.style.animation = 'messageAppear ease-out 0.3s';

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

    static setAnimation(element, setInitialDisplay, animation, duration, hideLater = false) {
        element.style.display = setInitialDisplay;
        element.style.animation = `${animation} ${duration} ease-in-out`;

        if (hideLater === true) {
            setTimeout(() => element.style.display = 'none', Number(duration.replace('ms', '')) + 1);
        }

    }


}