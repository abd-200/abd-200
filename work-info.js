document.addEventListener('DOMContentLoaded', function() {
    const agreementCheckbox = document.getElementById('agreement-checkbox');
    const proceedButton = document.getElementById('proceed-to-training');

    // تعطيل الزر في البداية
    proceedButton.disabled = true;

    agreementCheckbox.addEventListener('change', function() {
        // تفعيل الزر إذا تم تحديد مربع الاختيار، وإلا تعطيله
        proceedButton.disabled = !this.checked;
    });

    proceedButton.addEventListener('click', function() {
        window.location.href = "training-module.html"; // إعادة التوجيه إلى الدورة التدريبية
    });
});