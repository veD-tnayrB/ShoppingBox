const shoppingBoxButton = document.getElementById('shopping-box-button');
const shoppingBox = document.getElementById('selected-section');

shoppingBoxButton.addEventListener('click', e => {
    shoppingBox.style.display = 'flex';
    shoppingBox.style.animation = 'shoppingBoxAppear 0.2s ease-out';
    
    shoppingBoxButton.style.display = 'none';
});


const backButton = document.getElementById('close-button');

backButton.addEventListener('click', e => {
    shoppingBox.style.animation = 'shoppingBoxDisappear 0.2s ease-out';
    shoppingBox.style.display = 'none';

    shoppingBoxButton.style.display = 'flex';
})