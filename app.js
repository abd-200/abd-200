document.addEventListener('DOMContentLoaded', function () {

    // ---  DOM elements ----
    const body = document.body;
    const darkModeToggleButtons = document.querySelectorAll('#dark-mode-toggle');
    const languageToggleButtons = document.querySelectorAll('#language-toggle');
    const aiToggleButtons = document.querySelectorAll('#ai-toggle');
    const aiContainers = document.querySelectorAll('.ai-assistant-container');
    const scrollToTopButton = document.querySelector(".scroll-to-top");
    const scrollToBottomButton = document.querySelector(".scroll-to-bottom");
    const loginContainer = document.getElementById('login-container');
    const chatContainer = document.getElementById('chat-container');
    const loginForm = document.getElementById('login-form');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const logoutButton = document.getElementById('logout-button');
    //  ------------------ Variables --------------------------------
    let username = '';

    // ---------------------- App Initialize --------------
    loadPreferences();
    updateIcons();
    const storedUser = loadFromLocalStorage('chatUser')
    if (storedUser) {
        const user = JSON.parse(storedUser);
        username = user.username;
        showChat(username);
    } else {
        showLogin();
    }
    // -----   Function For Handle Listener Events ---------------
    darkModeToggleButtons.forEach(button => button.addEventListener('click', function () {
        toggleDarkMode();
    }));
    languageToggleButtons.forEach(button => button.addEventListener('click', function () {
        toggleLanguage();
    }));
    aiToggleButtons.forEach(button => button.addEventListener('click', toggleAiContainer));


    loginForm.addEventListener('submit', handleLoginSubmit);
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
    logoutButton.addEventListener('click', handleLogout);


    window.addEventListener('scroll', toggleScrollButtonDisplay);

    if (scrollToTopButton) scrollToTopButton.addEventListener('click', scrollToTop)
    if (scrollToBottomButton) scrollToBottomButton.addEventListener('click', scrollToBottom);
    document.querySelectorAll('.show-more').forEach(button =>
        button.addEventListener('click', toggleInfoVisibility))


    document.addEventListener('click', closeAiContainerOnClickOutSide);
    // --------------- localStorage Functions ---------------
    function saveToLocalStorage(key, value) {
        try {
            let allData = JSON.parse(localStorage.getItem('appState') || '{}');
            allData[key] = value;
            localStorage.setItem('appState', JSON.stringify(allData));
            console.log(`LocalStorage - Save: key: ${key}, value: ${value}`, allData);
        } catch (e) {
            console.error(`localStorage - save Error`, e)
        }
    }

    function loadFromLocalStorage(key) {

        try {
            let allData = JSON.parse(localStorage.getItem('appState') || '{}');
            const value = allData[key]

            console.log(`LocalStorage - Load: key:${key},value :${value}  allData:`, allData);
            return value;

        } catch (e) {
            console.error(`localStorage - Load error  `, e)
            return null
        }
    }

    // -------- Function To Manage Themes (Light And Dark Modes) --------

    function toggleDarkMode() {
        console.log("toggleDarkMode function was Called");

        if (body.classList.contains('dark-mode')) {
            removeDarkMode();
        } else {
            applyDarkMode();
        }
        updateIcons()

    }


    function applyDarkMode() {
        body.classList.add('dark-mode');
        saveToLocalStorage('darkMode', 'enabled');
    }


    function removeDarkMode() {
        body.classList.remove('dark-mode');
        saveToLocalStorage('darkMode', 'disabled');
    }



    //-------------- functions to manage Languages -------------------

    function toggleLanguage() {
        console.log("toggleLanguage Function was Called");

        const currentLanguage = loadFromLocalStorage('language') || 'ar';
        const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        changeLanguage(newLanguage);

    }

    function changeLanguage(lang) {
        console.log("changeLanguage Function was Called , Parameter :", lang);
        const htmlTag = document.querySelector('html');

        if (lang === 'en') {
            htmlTag.setAttribute('lang', 'en');
            htmlTag.setAttribute('dir', 'ltr');
            saveToLocalStorage('language', 'en');
        } else {
            htmlTag.setAttribute('lang', 'ar');
            htmlTag.setAttribute('dir', 'rtl');
            saveToLocalStorage('language', 'ar');

        }

        updateIcons();

    }


    // function To update All Buttons Icon in Mode and language buttons
    function updateIcons() {
        console.log('Update Icon Was Called');

        darkModeToggleButtons.forEach(button => {
            if (body.classList.contains('dark-mode')) {

                button.innerHTML = '<i class="fas fa-sun"></i>';
            } else {

                button.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
        languageToggleButtons.forEach(button => {
            if (loadFromLocalStorage('language') === 'en') {
                button.innerHTML = '<i class="fas fa-globe-africa"></i>';

            } else {

                button.innerHTML = '<i class="fas fa-globe"></i>';

            }

        })

    }

    //   function To Load app state
    function loadPreferences() {

        const savedMode = loadFromLocalStorage('darkMode');

        if (savedMode === 'enabled') {

            body.classList.add('dark-mode');


        }
        const savedLanguage = loadFromLocalStorage('language') || 'ar';
        changeLanguage(savedLanguage)

    }

    // ----------- function for Handle AI Assiatant Box and functionality-----------

    function toggleAiContainer() {
        aiContainers.forEach(container => {
            container.classList.toggle('active');
        });

    }

    function closeAiContainerOnClickOutSide(event) {
        aiContainers.forEach(container => {

            if (!container.contains(event.target) && !event.target.closest('#ai-toggle')) {
                container.classList.remove('active');
            }
        })
    }

    // ----- function for helper for chat app State  -----------------
    function handleLoginSubmit(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (email && password) {
            username = prompt('أدخل اسم المستخدم (اختياري):') || 'مستخدم';
            const user = {
                email: email,
                username: username
            };
            saveToLocalStorage('chatUser', JSON.stringify(user));
            showChat(username);

        } else {
            alert('الرجاء إدخال البريد الإلكتروني وكلمة المرور.');
        }
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;
        appendMessage(message, username);
        saveMessage(message, username);
        messageInput.value = '';
    }

    function handleLogout() {
        localStorage.removeItem('chatUser');
        showLogin();
    }

    function setSuggestedMessage(messageText) {
        messageInput.value = messageText;
        messageInput.focus();

    }


    function appendMessage(message, user) {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message', 'user-message');
        newMessage.innerHTML = `<span class="username">${user}</span>${message}`
        chatMessages.appendChild(newMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }


    function saveMessage(message, user) {
        let messages = JSON.parse(loadFromLocalStorage('chatMessages') || '[]');
        messages.push({
            user: user,
            text: message
        });
        if (messages.length > 50) {
            messages = messages.slice(-50);
        }

        saveToLocalStorage('chatMessages', JSON.stringify(messages));
    }

    function loadMessages() {
        const messages = JSON.parse(loadFromLocalStorage('chatMessages') || '[]');
        messages.forEach(message => {
            appendMessage(message.text, message.user)
        })

    }

    function showChat(username) {
        loginContainer.style.display = 'none';
        chatContainer.style.display = 'flex';
        loadMessages();

    }

    function showLogin() {
        loginContainer.style.display = 'flex';
        chatContainer.style.display = 'none';
    }

    //--------------- Helper function For show more visibility-----------------------------

    function toggleInfoVisibility(event) {
        event.preventDefault();
        const moreInfo = this.previousElementSibling;
        if (moreInfo.style.display === 'none' || moreInfo.style.display === '') {
            moreInfo.style.display = 'block';
            this.textContent = 'إخفاء التفاصيل';
        } else {
            moreInfo.style.display = 'none';
            this.textContent = 'عرض المزيد';
        }

    }

    // -------- Helper Function For Top And Bottom Scroll ----------
    function toggleScrollButtonDisplay() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            if (scrollToTopButton) scrollToTopButton.style.display = "inline-block";
        } else {
            if (scrollToTopButton) scrollToTopButton.style.display = "none";
        }
    }


    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }


    function scrollToBottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
});// JavaScript (js/app.js)
const darkModeToggle = document.getElementById('dark-mode-toggle');
const languageToggle = document.getElementById('language-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // You can also save the user's preference in local storage
});
