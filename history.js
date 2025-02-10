// js/history.js

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const body = document.body;

    // دالة لتفعيل/تعطيل الوضع الداكن
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode); // حفظ الحالة في localStorage
    }

    // دالة لتغيير اللغة (مثال بسيط، يمكن تطويرها)
    function toggleLanguage() {
        const currentLanguage = document.documentElement.lang;
        const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        document.documentElement.lang = newLanguage;
        document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('language', newLanguage); // حفظ اللغة في localStorage
        // يمكنك هنا إعادة تحميل الصفحة أو تغيير محتوى اللغة ديناميكيًا
        location.reload(); // أبسط طريقة لتغيير اللغة (إعادة تحميل الصفحة)
    }

    // فحص حالة الوضع الداكن واللغة المحفوظة في localStorage عند تحميل الصفحة
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        document.documentElement.lang = savedLanguage;
        document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    }

    // إضافة مستمعي الأحداث لأزرار التبديل
    darkModeToggle.addEventListener('click', toggleDarkMode);
    languageToggle.addEventListener('click', toggleLanguage);
});