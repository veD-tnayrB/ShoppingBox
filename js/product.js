export class product {
    constructor(img, name, price, maker) {
        this._img = img;
        this._name = name;
        this._price = price;
        this._maker = maker;
    }

    createlistedProduct() {
        const template = document.getElementById('listed-product').content;
        
        const productImg = template.querySelector('.product-image');
        productImg.setAttribute('src', this._img);

        const productName = template.querySelector('.product-name');
        productName.textContent = this._name;

        const productPrice = template.querySelector('.product-price');
        productPrice.textContent = this._price;

        const productMaker = template.querySelector('.product-maker');
        productMaker.textContent = this._maker;

        return template.cloneNode(true);
    }

    createSelectedProduct() {
        const template = document.getElementById('selected-product').content;
        
        const productImg = template.querySelector('.product-selected-img');
        productImg.setAttribute('src', this._img);

        const productName = template.querySelector('.product-name');
        productName.textContent = this._name;

        const productPrice = template.querySelector('.product-price');
        productPrice.textContent = this._price;

        const productMaker = template.querySelector('.product-maker');
        productMaker.textContent = this._maker;

        const countButtons = template.querySelector('.count-cont');
        countButtons.style.display = 'initial';

        const deleteButton = template.querySelector('.delete-button');
        deleteButton.style.display = 'initial';

        return template.cloneNode(true);
    }

}