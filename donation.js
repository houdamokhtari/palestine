document.addEventListener('DOMContentLoaded', function() {
    // التبديل بين أنواع التبرع
    const donationTypes = document.querySelectorAll('.donation-type');
    const donationTypeInput = document.getElementById('donation_type');

    donationTypes.forEach(type => {
        type.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأنواع
            donationTypes.forEach(t => t.classList.remove('active'));
            // إضافة الفئة النشطة للنوع المحدد
            this.classList.add('active');
            // تحديث قيمة النموذج
            donationTypeInput.value = this.getAttribute('data-type');
        });
    });

    // اختيار مبلغ التبرع
    const amountOptions = document.querySelectorAll('.amount-option:not(.custom)');
    const customAmountInput = document.getElementById('custom-amount');
    let selectedAmount = null;

    // تحديد المبلغ عند النقر على الخيار
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            // إزالة الفئة المحددة من جميع الخيارات
            amountOptions.forEach(opt => opt.classList.remove('selected'));
            // إضافة الفئة المحددة للخيار المحدد
            this.classList.add('selected');
            // تحديث المبلغ المحدد
            selectedAmount = this.getAttribute('data-amount');
            // إعادة تعيين حقل المبلغ المخصص
            customAmountInput.value = '';
        });
    });

    // تحديث عند إدخال مبلغ مخصص
    customAmountInput.addEventListener('focus', function() {
        // إزالة الفئة المحددة من جميع الخيارات
        amountOptions.forEach(opt => opt.classList.remove('selected'));
        // إعادة تعيين المبلغ المحدد
        selectedAmount = null;
    });

    // تنسيق رقم البطاقة أثناء الكتابة
    const cardNumberInput = document.getElementById('card-number');
    
    cardNumberInput.addEventListener('input', function(e) {
        // إزالة جميع الرموز غير الرقمية
        let value = this.value.replace(/\D/g, '');
        
        // تنسيق الرقم بإضافة شرطة بعد كل 4 أرقام
        if (value.length > 0) {
            value = value.match(/.{1,4}/g).join('-');
        }
        
        // تحديث قيمة الحقل
        this.value = value;
    });

    // تنسيق تاريخ انتهاء الصلاحية
    const expiryDateInput = document.getElementById('expiry-date');
    
    expiryDateInput.addEventListener('input', function(e) {
        // إزالة جميع الرموز غير الرقمية
        let value = this.value.replace(/\D/g, '');
        
        // تنسيق MM/YY
        if (value.length > 0) {
            if (value.length <= 2) {
                this.value = value;
            } else {
                let month = value.substring(0, 2);
                let year = value.substring(2, 4);
                
                if (parseInt(month) > 12) {
                    month = '12';
                }
                
                this.value = month + (year ? '/' + year : '');
            }
        }
    });

    // تحقق وتحديث CVV
    const cvvInput = document.getElementById('cvv');
    
    cvvInput.addEventListener('input', function(e) {
        // التأكد من أن القيمة أرقام فقط وليست أكثر من 4 أرقام
        this.value = this.value.replace(/\D/g, '').substring(0, 4);
    });

    // التحقق من النموذج قبل الإرسال
    const donationForm = document.getElementById('donation-form');
    
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault(); // إيقاف الإرسال الافتراضي

        let isValid = true;
        let errorMessage = '';

        // التحقق من تحديد مبلغ
        if (!selectedAmount && !customAmountInput.value) {
            isValid = false;
            errorMessage = 'يرجى تحديد مبلغ التبرع أو إدخال مبلغ مخصص.';
        }

        // التحقق من صحة رقم البطاقة (تبسيط - فقط التأكد من الطول)
        if (cardNumberInput.value.replace(/\D/g, '').length !== 16) {
            isValid = false;
            errorMessage = 'يرجى إدخال رقم بطاقة صحيح (16 رقم).';
        }

        // التحقق من تاريخ الانتهاء
        const expiryValue = expiryDateInput.value;
        if (!/^\d{2}\/\d{2}$/.test(expiryValue)) {
            isValid = false;
            errorMessage = 'يرجى إدخال تاريخ انتهاء صالح (MM/YY).';
        }

        // التحقق من CVV
        if (cvvInput.value.length < 3) {
            isValid = false;
            errorMessage = 'يرجى إدخال رمز CVV صالح.';
        }

        if (!isValid) {
            alert(errorMessage);
            return;
        }

        // إذا كان كل شيء صالحًا، إرسال النموذج إلى معالج PHP
        // للتطوير المحلي، يمكننا محاكاة الإرسال الناجح
        alert("شكراً لتبرعك! تم استلام طلبك بنجاح وسيتم معالجته قريباً.");
        
        // إعادة تعيين النموذج بعد الإرسال الناجح
        donationForm.reset();
        
        // بإمكانك تفعيل السطر التالي لإرسال النموذج فعليًا عندما يكون معالج PHP جاهزًا
        // this.submit();
    });

    // إضافة سلوك الزر العائم
    const floatingButton = document.querySelector('.floating-button');
    
    floatingButton.addEventListener('click', function() {
        // انتقل إلى أعلى الصفحة بسلاسة
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});