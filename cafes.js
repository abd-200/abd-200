// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

// Cookie Notice
const cookieNotice = document.querySelector('.cookie-notice');
const acceptCookiesButton = document.getElementById('accept-cookies');

// Show the cookie notice if the user hasn't accepted cookies yet
if (!localStorage.getItem('cookiesAccepted')) {
    cookieNotice.style.display = 'block';
}

acceptCookiesButton.addEventListener('click', () => {
    // Hide the cookie notice
    cookieNotice.style.display = 'none';
    // Store a value in local storage to indicate that the user has accepted cookies
    localStorage.setItem('cookiesAccepted', 'true');
});

// Language Toggle (placeholder - you'll need to implement actual language switching)
const languageToggle = document.getElementById('language-toggle');

languageToggle.addEventListener('click', () => {
    alert('Language switching functionality not yet implemented.'); // Replace with actual logic
});