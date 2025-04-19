document.addEventListener('DOMContentLoaded', function() {
    // Toggle categories
    document.querySelectorAll('.category-header').forEach(header => {
      header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('.toggle-icon i');
        
        // Close all other categories
        document.querySelectorAll('.category-content').forEach(otherContent => {
          if (otherContent !== content && otherContent.style.display === 'block') {
            otherContent.style.display = 'none';
            otherContent.previousElementSibling.querySelector('.toggle-icon i').className = 'fas fa-plus';
          }
        });
        
        // Toggle current category
        if (content.style.display === 'block') {
          content.style.display = 'none';
          icon.className = 'fas fa-plus';
        } else {
          content.style.display = 'block';
          icon.className = 'fas fa-minus';
          
          // Scroll to this category if not in view
          const categoryRect = this.closest('.category').getBoundingClientRect();
          if (categoryRect.top < 0 || categoryRect.bottom > window.innerHeight) {
            this.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          
          // Add animation for products
          const products = content.querySelectorAll('.product-item');
          products.forEach((product, index) => {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            setTimeout(() => {
              product.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              product.style.opacity = '1';
              product.style.transform = 'translateY(0)';
            }, 100 * index);
          });
        }
      });
    });
    
    // Search functionality with improved UX
    const searchInput = document.getElementById('product-search');
    const clearButton = document.createElement('i');
    clearButton.className = 'fas fa-times';
    clearButton.style.position = 'absolute';
    clearButton.style.right = 'calc(50% - 235px)';
    clearButton.style.top = '16px';
    clearButton.style.color = 'var(--primary-color)';
    clearButton.style.cursor = 'pointer';
    clearButton.style.display = 'none';
    searchInput.parentNode.appendChild(clearButton);
    
    clearButton.addEventListener('click', function() {
      searchInput.value = '';
      this.style.display = 'none';
      searchProducts('');
    });
    
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.trim().toLowerCase();
      clearButton.style.display = searchTerm.length > 0 ? 'block' : 'none';
      searchProducts(searchTerm);
    });
    
    function searchProducts(searchTerm) {
      const items = document.querySelectorAll('.product-list li');
      let hasResults = false;
      const noResultsMessage = document.getElementById('no-results-message') || createNoResultsMessage();
      
      // Track matching categories to count matches
      const categoryMatches = {};
      
      items.forEach(item => {
        const productName = item.querySelector('.product-name').textContent.toLowerCase();
        const companyName = item.querySelector('.product-company').textContent.toLowerCase();
        const alternatives = item.querySelector('.alternatives-list').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || companyName.includes(searchTerm) || 
            alternatives.includes(searchTerm) || searchTerm === '') {
          item.style.display = 'flex';
          hasResults = true;
          
          // Update category match count
          const categoryContent = item.closest('.category-content');
          const category = categoryContent.closest('.category');
          const categoryId = category.getAttribute('data-category-id') || 
                             category.querySelector('.category-header h3').textContent.trim();
          
          if (!categoryMatches[categoryId]) {
            categoryMatches[categoryId] = { 
              category: category, 
              content: categoryContent, 
              count: 0 
            };
          }
          categoryMatches[categoryId].count++;
          
          // Open the category if we have a search term
          if (searchTerm !== '') {
            categoryContent.style.display = 'block';
            const toggleIcon = categoryContent.previousElementSibling.querySelector('.toggle-icon i');
            toggleIcon.className = 'fas fa-minus';
          }
        } else {
          item.style.display = 'none';
        }
      });
      
      // Update badge counts and show/hide categories
      document.querySelectorAll('.category').forEach(category => {
        const categoryId = category.getAttribute('data-category-id') || 
                           category.querySelector('.category-header h3').textContent.trim();
        const badge = category.querySelector('.category-header .badge');
        
        if (categoryMatches[categoryId]) {
          const matchCount = categoryMatches[categoryId].count;
          badge.textContent = matchCount;
          category.style.display = 'block';
        } else if (searchTerm !== '') {
          category.style.display = 'none';
        } else {
          // Reset to original count if no search
          const originalCount = category.getAttribute('data-original-count') || 
                               category.querySelectorAll('.product-list li').length;
          badge.textContent = originalCount;
          category.style.display = 'block';
          category.querySelector('.category-content').style.display = 'none';
          category.querySelector('.toggle-icon i').className = 'fas fa-plus';
        }
      });
      
      // Show no results message if needed
      if (!hasResults && searchTerm !== '') {
        noResultsMessage.style.display = 'block';
      } else {
        noResultsMessage.style.display = 'none';
      }
    }
    
    function createNoResultsMessage() {
      const message = document.createElement('div');
      message.id = 'no-results-message';
      message.style.textAlign = 'center';
      message.style.padding = '30px';
      message.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      message.style.borderRadius = '10px';
      message.style.margin = '20px auto';
      message.style.maxWidth = '600px';
      message.style.boxShadow = 'var(--shadow)';
      message.style.display = 'none';
      
      message.innerHTML = `
        <div style="font-size: 3rem; color: var(--primary-color); margin-bottom: 15px;">
          <i class="fas fa-search"></i>
        </div>
        <h3 style="margin-bottom: 10px; color: var(--primary-color-dark);">لا توجد نتائج</h3>
        <p style="color: var(--text-color-light);">لم نتمكن من العثور على منتجات تطابق بحثك. جرب كلمات مختلفة أو تصفح القوائم.</p>
      `;
      
      const categoriesContainer = document.querySelector('.categories-container');
      categoriesContainer.parentNode.insertBefore(message, categoriesContainer.nextSibling);
      
      return message;
    }
    
    // Add share functionality to share buttons
    document.querySelectorAll('.action-button').forEach(button => {
      if (button.innerHTML.includes('مشاركة')) {
        button.addEventListener('click', function() {
          const productItem = this.closest('.product-item');
          const productName = productItem.querySelector('.product-name').textContent;
          const companyName = productItem.querySelector('.product-company').textContent;
          
          if (navigator.share) {
            navigator.share({
              title: 'منتجات المقاطعة - صوت فلسطين',
              text: `قاطع منتج ${productName} من شركة ${companyName} دعماً لفلسطين #مقاطعة #فلسطين`,
              url: window.location.href
            }).catch(console.error);
          } else {
            // Fallback for browsers that don't support Web Share API
            const shareText = encodeURIComponent(`قاطع منتج ${productName} من شركة ${companyName} دعماً لفلسطين #مقاطعة #فلسطين ${window.location.href}`);
            window.open(`https://twitter.com/intent/tweet?text=${shareText}`, '_blank');
          }
        });
      } else if (button.innerHTML.includes('المزيد')) {
        button.addEventListener('click', function() {
          const productItem = this.closest('.product-item');
          const productName = productItem.querySelector('.product-name').textContent;
          
          showProductDetails(productName);
        });
      }
    });
    
    // Product details modal
    function showProductDetails(productName) {
      // Create modal if it doesn't exist
      if (!document.getElementById('product-modal')) {
        const modal = document.createElement('div');
        modal.id = 'product-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '1000';
        
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.borderRadius = '10px';
        modalContent.style.padding = '30px';
        modalContent.style.maxWidth = '90%';
        modalContent.style.width = '600px';
        modalContent.style.maxHeight = '90vh';
        modalContent.style.overflow = 'auto';
        modalContent.style.position = 'relative';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '15px';
        closeBtn.style.right = '15px';
        closeBtn.style.backgroundColor = 'transparent';
        closeBtn.style.border = 'none';
        closeBtn.style.fontSize = '1.5rem';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.color = 'var(--primary-color)';
        
        closeBtn.addEventListener('click', () => {
          document.body.removeChild(modal);
        });
        
        modalContent.appendChild(closeBtn);
        
        const modalBody = document.createElement('div');
        modalBody.id = 'modal-body';
        modalContent.appendChild(modalBody);
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            document.body.removeChild(modal);
          }
        });
      } else {
        document.getElementById('product-modal').style.display = 'flex';
      }
      
      // Populate modal with product details
      const modalBody = document.getElementById('modal-body');
      
      // Find product data (this would ideally come from a database)
      const products = {
        'كوكا كولا': {
          company: 'شركة كوكا كولا',
          description: 'تعتبر شركة كوكا كولا من الشركات التي تدعم الاحتلال من خلال استثماراتها واستمرارها في العمل داخل المستوطنات.',
          reasons: [
            'تشغيل مصانع في المستوطنات الإسرائيلية',
            'دعم مالي لمؤسسات تابعة للاحتلال',
            'رفض الانسحاب من السوق الإسرائيلي رغم المطالبات'
          ],
          alternatives: [
            'المشروبات المحلية مثل عرق سوس',
            'التمر هندي',
            'عصائر طبيعية من إنتاج محلي'
          ],
          image: 'https://via.placeholder.com/300x200'
        },
        'بيبسي': {
          company: 'شركة بيبسيكو',
          description: 'تستمر بيبسي في دعم الاقتصاد الإسرائيلي من خلال استثماراتها ووجودها في السوق الإسرائيلي.',
          reasons: [
            'تعاملات مع شركات في المستوطنات',
            'استثمارات في السوق الإسرائيلي',
            'عدم اتخاذ موقف داعم للحقوق الفلسطينية'
          ],
          alternatives: [
            'المشروبات المحلية',
            'الصودا العربية',
            'المشروبات الغازية المنتجة محلياً'
          ],
          image: 'https://via.placeholder.com/300x200'
        },
        'ماكدونالدز': {
          company: 'شركة ماكدونالدز العالمية',
          description: 'تدعم ماكدونالدز الاقتصاد الإسرائيلي وتعمل بشكل مباشر في المستوطنات.',
          reasons: [
            'فروع في المستوطنات الإسرائيلية',
            'دعم مالي للمؤسسات الإسرائيلية',
            'تبرعات للجيش الإسرائيلي'
          ],
          alternatives: [
            'مطاعم الوجبات السريعة المحلية',
            'شاورما',
            'فلافل'
          ],
          image: 'https://via.placeholder.com/300x200'
        }
      };
      
      // Default product info if not found
      const product = products[productName] || {
        company: 'شركة غير معروفة',
        description: 'هذا المنتج مدرج في قائمة المقاطعة لدعمه للاحتلال الإسرائيلي.',
        reasons: ['دعم الاقتصاد الإسرائيلي'],
        alternatives: ['البدائل المحلية'],
        image: 'https://via.placeholder.com/300x200'
      };
      
      // Populate modal content
      modalBody.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
          <img src="${product.image}" alt="${productName}" style="max-width: 100%; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: var(--primary-color-dark); margin-bottom: 10px;">${productName}</h2>
          <p style="color: var(--text-color-light); margin-bottom: 20px;">${product.company}</p>
          
          <div style="text-align: right; width: 100%;">
            <p style="margin-bottom: 20px;">${product.description}</p>
            
            <h3 style="color: var(--primary-color); margin-bottom: 10px;">أسباب المقاطعة:</h3>
            <ul style="margin-bottom: 20px; list-style-position: inside; padding: 0 20px 0 0;">
              ${product.reasons.map(reason => `<li>${reason}</li>`).join('')}
            </ul>
            
            <h3 style="color: var(--primary-color); margin-bottom: 10px;">البدائل المقترحة:</h3>
            <ul style="margin-bottom: 20px; list-style-position: inside; padding: 0 20px 0 0;">
              ${product.alternatives.map(alt => `<li>${alt}</li>`).join('')}
            </ul>
          </div>
          
          <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="share-btn" style="background-color: var(--primary-color); color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
              <i class="fas fa-share-alt" style="margin-left: 5px;"></i> مشاركة
            </button>
            <button class="download-btn" style="background-color: var(--primary-color-dark); color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
              <i class="fas fa-download" style="margin-left: 5px;"></i> تحميل المعلومات
            </button>
          </div>
        </div>
      `;
      
      // Add share functionality
      modalBody.querySelector('.share-btn').addEventListener('click', function() {
        if (navigator.share) {
          navigator.share({
            title: `مقاطعة ${productName} - صوت فلسطين`,
            text: `قاطع منتج ${productName} من شركة ${product.company} دعماً لفلسطين #مقاطعة #فلسطين`,
            url: window.location.href
          }).catch(console.error);
        } else {
          const shareText = encodeURIComponent(`قاطع منتج ${productName} من شركة ${product.company} دعماً لفلسطين #مقاطعة #فلسطين ${window.location.href}`);
          window.open(`https://twitter.com/intent/tweet?text=${shareText}`, '_blank');
        }
      });
      
      // Add download functionality (simplified example)
      modalBody.querySelector('.download-btn').addEventListener('click', function() {
        // Create text content for download
        const content = `
  منتج للمقاطعة: ${productName}
  الشركة: ${product.company}
  
  الوصف:
  ${product.description}
  
  أسباب المقاطعة:
  ${product.reasons.map(reason => `- ${reason}`).join('\n')}
  
  البدائل المقترحة:
  ${product.alternatives.map(alt => `- ${alt}`).join('\n')}
  
  #مقاطعة #فلسطين
  صوت فلسطين | Voice of Palestine
  ${window.location.href}
        `;
        
        // Create blob and download
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `مقاطعة_${productName.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
    
    // Store original category counts
    document.querySelectorAll('.category').forEach(category => {
      const count = category.querySelectorAll('.product-list li').length;
      category.setAttribute('data-original-count', count);
      category.setAttribute('data-category-id', Math.random().toString(36).substr(2, 9));
    });
    
    // Add floating back-to-top button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'floating-button';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.display = 'none';
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Show/hide back-to-top button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
    
    // Create animation effect for page load
    const categories = document.querySelectorAll('.category');
    categories.forEach((category, index) => {
      category.style.opacity = '0';
      category.style.transform = 'translateY(20px)';
      setTimeout(() => {
        category.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        category.style.opacity = '1';
        category.style.transform = 'translateY(0)';
      }, 100 * index);
    });
    
    // Fix video background for better performance
    const videoElement = document.getElementById('bg-video');
    if (videoElement) {
      // Optimize video loading
      videoElement.addEventListener('loadeddata', function() {
        // Remove loading indicator if exists
        const loadingIndicator = document.getElementById('video-loading');
        if (loadingIndicator) {
          loadingIndicator.style.display = 'none';
        }
        
        // Ensure video is properly sized
        videoElement.play();
      });
      
      // Add a fallback for video loading issues
      videoElement.addEventListener('error', function() {
        const videoContainer = document.getElementById('video-container');
        if (videoContainer) {
          videoContainer.style.backgroundImage = 'url(palestine-background.jpg)';
          videoContainer.style.backgroundSize = 'cover';
          videoContainer.style.backgroundPosition = 'center';
        }
      });
    }
    
    // Mobile navigation improvements
    if (window.innerWidth <= 768) {
      const navItems = document.querySelectorAll('nav ul li a');
      navItems.forEach(item => {
        item.addEventListener('click', function() {
          // If this is a dropdown toggle on mobile, prevent default
          if (this.classList.contains('dropdown-toggle')) {
            event.preventDefault();
            const dropdown = this.nextElementSibling;
            if (dropdown.style.display === 'block') {
              dropdown.style.display = 'none';
            } else {
              dropdown.style.display = 'block';
            }
          }
        });
      });
    }
  });