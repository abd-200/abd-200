document.addEventListener('DOMContentLoaded', function() {
    // استرجاع اسم المستخدم من LocalStorage
    const userName = localStorage.getItem('userName');

    // عرض الاسم في الشهادة
    document.getElementById('certificate-name').textContent = userName;

    // عرض تاريخ اليوم
    const today = new Date();
    const date = today.toLocaleDateString('ar-SA'); // تنسيق التاريخ باللغة العربية
    document.getElementById('certificate-date').textContent = date;

    // وظيفة تنزيل الشهادة باستخدام jsPDF
    document.getElementById('download-certificate').addEventListener('click', function() {
        const certificate = document.querySelector('.certificate');

        // خيارات jsPDF
        const options = {
            margin: 10,
            filename: 'certificate.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        };

        // إنشاء ملف PDF
        html2pdf().from(certificate).set(options).save();
    });
});