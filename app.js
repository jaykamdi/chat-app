// app.js
document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            appendMessage('You', message);
            messageInput.value = ''; // Clear the input field
        }
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${sender}: ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

    const messagesRef = firebase.database().ref('messages');

    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            messagesRef.push().set({
                sender: 'You',
                message: message
            });
            messageInput.value = ''; // Clear the input field
        }
    });

    messagesRef.on('child_added', (snapshot) => {
        const data = snapshot.val();
        appendMessage(data.sender, data.message);
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${sender}: ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }
});
