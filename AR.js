document.addEventListener('DOMContentLoaded', function() {
    // Modal handling
    var registerModal = document.getElementById('registerModal');
    var loginModal = document.getElementById('loginModal');
    var registerButton = document.getElementById('registerButton');
    var loginButton = document.getElementById('loginButton');
    var closeRegisterModal = document.getElementById('closeRegisterModal');
    var closeLoginModal = document.getElementById('closeLoginModal');

    if (registerButton) {
        registerButton.onclick = function() {
            registerModal.style.display = "block";
        }
    }

    if (loginButton) {
        loginButton.onclick = function() {
            loginModal.style.display = "block";
        }
    }

    if (closeRegisterModal) {
        closeRegisterModal.onclick = function() {
            registerModal.style.display = "none";
        }
    }

    if (closeLoginModal) {
        closeLoginModal.onclick = function() {
            loginModal.style.display = "none";
        }
    }

    // Close modal if clicked outside of it
    window.onclick = function(event) {
        if (event.target == registerModal) {
            registerModal.style.display = "none";
        }
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
    }

    // Check for AR support and show message if not supported
    if (!navigator.xr) {
        const arSection = document.querySelector('.sketchfab-section');
        if (arSection) {
            arSection.style.display = 'none';
            const message = document.createElement('p');
            message.textContent = 'تقنية الواقع المعزز غير مدعومة في هذا المتصفح.';
            arSection.parentNode.insertBefore(message, arSection);
        }
    }
});