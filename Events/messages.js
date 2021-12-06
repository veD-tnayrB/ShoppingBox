const messageCont = document.getElementById('message-zone-cont');

// Show a message, could be an error or not :)
export default function showMessage(message, color = '#13d301') {
    const messageZone = document.createElement('div');
    messageZone.className = 'message-zone';
    messageZone.style.display = 'flex';
    messageZone.style.background = color;
    messageZone.textContent = message;
    messageZone.style.animation = 'appear ease-out 0.2s';

    messageCont.appendChild(messageZone)

    setTimeout(() => {
        messageZone.style.display = 'none';
    }, 3000)
};