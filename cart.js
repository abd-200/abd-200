document.addEventListener('DOMContentLoaded', function() {
  // لنفترض أن لديك طريقة ما لتحديد إذا كانت العربة فارغة
  // هنا مثال بسيط يعتمد على وجود متغير باسم `cartItems`
  // يمكنك استبدال هذا الجزء بمنطق التحقق الخاص بك

  let cartItems = localStorage.getItem('cartItems'); // أو أي طريقة تخزين أخرى تستخدمها
  let cartIsEmpty = !cartItems || cartItems.length === 0;

  const emptyCartMessage = document.getElementById('empty-cart-message');
  const storeContent = document.getElementById('store-content');

  if (cartIsEmpty) {
    emptyCartMessage.style.display = 'block'; // عرض رسالة العربة الفارغة
    storeContent.style.display = 'none'; // إخفاء محتوى المتجر
  } else {
    emptyCartMessage.style.display = 'none'; // إخفاء رسالة العربة الفارغة
    storeContent.style.display = 'block'; // عرض محتوى المتجر
  }
});document.addEventListener('DOMContentLoaded', function() {
  // 1. تحديث عدد العناصر في أيقونة العربة (في كل الصفحات)
  function updateCartItemCount() {
    let cartItems = localStorage.getItem('cartItems');
    let itemCount = cartItems ? JSON.parse(cartItems).length : 0; // عدد العناصر

    const cartItemCountElement = document.getElementById('cart-item-count');
    if (cartItemCountElement) {
      cartItemCountElement.textContent = itemCount.toString();
    }
  }

  // 2. في صفحة عربة التسوق (cart.html)، عرض محتوى العربة أو رسالة "فارغة"
  if (document.body.classList.contains('cart-container')) { // تحقق إذا كانت الصفحة هي cart.html
    let cartItems = localStorage.getItem('cartItems');
    let cartIsEmpty = !cartItems || JSON.parse(cartItems).length === 0;

    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartContent = document.getElementById('cart-content');

    if (cartIsEmpty) {
      emptyCartMessage.style.display = 'block';
      cartContent.style.display = 'none';
    } else {
      emptyCartMessage.style.display = 'none';
      cartContent.style.display = 'block';
      // TODO: هنا قم بملء div الـ cartContent بمحتويات العربة
      // (إنشاء عناصر HTML ديناميكيًا لعرض المنتجات)
      displayCartItems(JSON.parse(cartItems));
    }
  }
    function displayCartItems(items) {
        const cartContent = document.getElementById('cart-content');
        cartContent.innerHTML = ''; // مسح المحتوى السابق

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item'); // يمكنك إضافة CSS لتنسيق العناصر

            itemElement.textContent = `اسم المنتج: ${item.name}, السعر: ${item.price}`;

            cartContent.appendChild(itemElement);
        });
    }

  // تحديث عدد العناصر عند تحميل الصفحة
  updateCartItemCount();
});