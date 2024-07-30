document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('guestForm');
    const messagesDiv = document.getElementById('messages');
    const nicknameInput = document.getElementById('nickname');
    const messageInput = document.getElementById('message');
    const emojis = document.querySelectorAll('.emoji');
    let lastMessageCount = 0;
    let userCountryCode = '';

    emojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            const emojiText = emoji.getAttribute('title');
            const cursorPos = messageInput.selectionStart;
            const textBeforeCursor = messageInput.value.substring(0, cursorPos);
            const textAfterCursor = messageInput.value.substring(cursorPos);
            messageInput.value = textBeforeCursor + emojiText + textAfterCursor;
            messageInput.setSelectionRange(cursorPos + emojiText.length, cursorPos + emojiText.length);
            messageInput.focus();
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const nickname = nicknameInput.value;
        const message = messageInput.value;

        if (nickname && message) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'submit.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    loadMessages();
                    messageInput.value = '';  // 只清空留言欄位
                }
            };
            xhr.send(`nickname=${encodeURIComponent(nickname)}&message=${encodeURIComponent(message)}&country=${encodeURIComponent(userCountryCode)}`);
        }
    });

    function loadMessages() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'messages.php', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const messages = JSON.parse(xhr.responseText);
                const wasScrolledToBottom = messagesDiv.scrollTop + messagesDiv.clientHeight >= messagesDiv.scrollHeight;
                messagesDiv.innerHTML = '';
                messages.forEach(function(msg) {
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('message');
                    messageElement.innerHTML = `
                        <div class="nickname">${msg.nickname} <span class="flag">${getFlagEmoji(msg.country)}</span></div>
                        <div class="text">${replaceEmojis(msg.message)}</div>
                        <div class="time">${msg.time}</div>
                    `;
                    messagesDiv.appendChild(messageElement);
                });
                if (wasScrolledToBottom || messages.length > lastMessageCount) {
                    messagesDiv.scrollTop = messagesDiv.scrollHeight;
                }
                lastMessageCount = messages.length;
            }
        };
        xhr.send();
    }

    function replaceEmojis(text) {
        const emojiMap = {
            ':cat-badge:': '<img src="images/cat-badge.png" class="emoji-inline">',
            ':cat-toy:': '<img src="images/cat-toy.png" class="emoji-inline">',
            ':cake:': '<img src="images/cake.png" class="emoji-inline">',
            ':pray:': '<img src="images/pray.png" class="emoji-inline">',
            ':olivine-smile:': '<img src="images/olivine-smile.png" class="emoji-inline">'
        };
        return text.replace(/:cat-badge:|:cat-toy:|:cake:|:pray:|:olivine-smile:/g, function(matched) {
            return emojiMap[matched];
        });
    }

    function getFlagEmoji(countryCode) {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    }

    function fetchUserCountry() {
        fetch('https://ipinfo.io/json')
            .then(response => response.json())
            .then(data => {
                userCountryCode = data.country || '';
            })
            .catch(error => {
                console.error('Error fetching user country:', error);
            });
    }

    fetchUserCountry();
    loadMessages();
    setInterval(loadMessages, 5000); // 每5秒更新一次留言
});
