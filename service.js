document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const logo = document.querySelector('header img');
    let currentLanguage = localStorage.getItem('language') || 'ar';

    function applyLanguage(lang) {
        let direction = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', direction);

        document.querySelectorAll('nav a').forEach(link => {
            if (link.href) {
                let currentHref = link.href;
                let newHref;

                if (lang === 'en') {
                    newHref = currentHref.replace(/\.html$/, '_en.html').replace(/\/ar\//, '/en/');
                } else {
                    newHref = currentHref.replace(/_en\.html$/, '.html').replace(/\/en\//, '/ar/');
                }

                if (newHref !== currentHref && isValidPage(newHref)) {
                    link.href = newHref;
                }
            }
        });
        localStorage.setItem('language', lang);
    }

    function isValidPage(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            console.error("Invalid URL:", url);
            return false;
        }
    }

    function updateLanguageToggleText(lang) {
        languageToggle.innerHTML = lang === 'ar' ? '<i class="fas fa-globe"></i>' : '<i class="fas fa-globe"></i>';
    }

    languageToggle.addEventListener('click', function(event) {
        event.preventDefault();
        currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        applyLanguage(currentLanguage);
        updateLanguageToggleText(currentLanguage);
    });

    // Dark mode functionality
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', body.classList.contains('dark-mode'));
    });

    // Cookie notice functionality
    const cookieNotice = document.querySelector('.cookie-notice');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    // Function to set a cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Check if the user has already accepted cookies
    if (getCookie('cookiesAccepted') === 'true') {
        cookieNotice.style.display = 'none';
    }

    // Handle the accept cookies button click
    acceptCookiesButton.addEventListener('click', function() {
        setCookie('cookiesAccepted', 'true', 365); // Cookie valid for 365 days
        cookieNotice.style.display = 'none';
    });

    //check is it a dark mode or not?
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
    }
    updateLanguageToggleText(currentLanguage);
    applyLanguage(currentLanguage);
});