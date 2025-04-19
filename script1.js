document.querySelector('form').addEventListener('submit', function(e) {
    var cardNumber = document.getElementById('card-number').value;
    var expiryDate = document.getElementById('expiry-date').value;
    var cvv = document.getElementById('cvv').value;

    if (!cardNumber || !expiryDate || !cvv) {
        alert("يرجى إدخال جميع المعلومات الخاصة بالبطاقة.");
        e.preventDefault();  // منع إرسال النموذج
    }
});
