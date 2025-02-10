document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signup-form');
    const messageDiv = document.getElementById('message');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const body = document.body;

    // Dark Mode Functionality
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode);
        darkModeToggle.querySelector('i').classList.toggle('fa-moon');
        darkModeToggle.querySelector('i').classList.toggle('fa-sun');
    });

    // Language Toggle Functionality
    languageToggle.addEventListener('click', () => {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        document.documentElement.lang = newLang;
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        location.reload(); // Simple reload for demonstration
    });

    // Check for dark mode preference in local storage
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.add('fa-sun');
    } else {
        darkModeToggle.querySelector('i').classList.add('fa-moon');
    }

    // Form Submission Handler
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirm_password = document.getElementById('confirm_password').value;
        const website = document.getElementById('website').value;

        if (password !== confirm_password) {
            showMessage('كلمة المرور وتأكيد كلمة المرور غير متطابقتين.', 'error');
            return;
        }

        // حفظ اسم المستخدم في local storage
        localStorage.setItem('userName', name);

        // إعادة التوجيه إلى صفحة معلومات العمل
        window.location.href = "work-info.html";
    });

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 5000);
    }
});