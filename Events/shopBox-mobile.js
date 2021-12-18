const shoppingBoxButton = document.getElementById('shopping-box-button');
const shoppingBox = document.getElementById('selected-section');

// Show the Shopping Box
shoppingBoxButton.addEventListener('click', e => {
    shoppingBox.style.display = 'flex';
    shoppingBox.style.animation = 'shoppingBoxAppear 0.4s ease-out';
    
    shoppingBoxButton.style.display = 'none';
});

// Hide the Shopping Box
const backButton = document.getElementById('close-button');
backButton.addEventListener('click', e => {
    shoppingBox.style.animation = 'shoppingBoxDisappear 0.4s ease-out';
    setTimeout(() => shoppingBox.style.display = 'none', 300) //Wait for the animation to finish executing to hide it
    shoppingBoxButton.style.display = 'flex';
})