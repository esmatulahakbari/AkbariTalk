// Simulated user and chat data
let currentUser = null;
const chats = [
    { id: 1, name: "Group Chat", type: "group", members: [1, 2, 3], messages: [] },
    { id: 2, name: "Private: User2", type: "private", members: [1, 2], messages: [] }
];

// Login button event
document.getElementById('login-button').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        currentUser = { id: 1, username: username, profilePhoto: 'default-profile.png', isAdmin: false };
        document.getElementById('profile-name').textContent = currentUser.username;
        document.getElementById('profile-photo').src = currentUser.profilePhoto;
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('chat-container').style.display = 'flex';
        displayChats();
    }
});

// Display chats in sidebar
function displayChats() {
    const chatList = document.getElementById('chat-list');
    chatList.innerHTML = '';
    chats.forEach(chat => {
        if (chat.members.includes(currentUser.id)) {
            const li = document.createElement('li');
            li.textContent = chat.name;
            li.dataset.id = chat.id;
            li.addEventListener('click', () => selectChat(chat.id));
            chatList.appendChild(li);
        }
    });
}

// Select a chat
let selectedChat = null;
function selectChat(chatId) {
    selectedChat = chatId;
    const chat = chats.find(c => c.id == chatId);
    document.getElementById('chat-title').textContent = chat.name;
    displayMessages(chat.messages);
}

// Display messages
function displayMessages(messages) {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML = '';
    messages.forEach(message => {
        const div = document.createElement('div');
        div.classList.add('message', message.sender === 'me' ? 'me' : 'other');
        if (message.type === 'text') {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.textContent = message.content;
            div.appendChild(bubble);
        } else if (message.type === 'photo' || message.type === 'gift') {
            const img = document.createElement('img');
            img.src = message.content;
            img.style.maxWidth = '200px';
            div.appendChild(img);
        }
        chatWindow.appendChild(div);
    });
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Send message, photo, or gift
document.getElementById('send-button').addEventListener('click', () => {
    if (!selectedChat) return;
    const chat = chats.find(c => c.id == selectedChat);
    const messageInput = document.getElementById('message-input');
    const photoInput = document.getElementById('photo-input');
    let message;

    if (photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
            message = { sender: 'me', type: 'photo', content: reader.result, timestamp: new Date() };
            chat.messages.push(message);
            displayMessages(chat.messages);
            photoInput.value = '';
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else if (messageInput.value.trim()) {
        message = { sender: 'me', type: 'text', content: messageInput.value.trim(), timestamp: new Date() };
        chat.messages.push(message);
        displayMessages(chat.messages);
        messageInput.value = '';
    }
});

// Send gift
document.getElementById('gift-button').addEventListener('click', () => {
    if (!selectedChat) return;
    const chat = chats.find(c => c.id == selectedChat);
    const giftMessage = { sender: 'me', type: 'gift', content: 'gift.png', timestamp: new Date() };
    chat.messages.push(giftMessage);
    displayMessages(chat.messages);
});

// Create chat (placeholder for backend integration)
document.getElementById('create-chat').addEventListener('click', () => {
    alert('Create a new private or group chat (requires backend integration).');
});
if (currentUser.isAdmin) {
    // Show admin panel with all chats
}