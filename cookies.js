document.addEventListener('DOMContentLoaded', function() {
    const cookieNotice = document.querySelector('.cookie-notice');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    // دالة للتحقق مما إذا كانت ملفات تعريف الارتباط مقبولة بالفعل
    function areCookiesAccepted() {
        return localStorage.getItem('cookiesAccepted') === 'true';
    }

    // إذا لم يتم قبول ملفات تعريف الارتباط، اعرض الإشعار
    if (!areCookiesAccepted()) {
        cookieNotice.style.display = 'block';
    }

    // عند النقر فوق الزر "موافق"، قم بتعيين علامة في Local Storage وإخفاء الإشعار
    acceptCookiesButton.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieNotice.style.display = 'none';
    });
});