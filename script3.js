 // Toggle categories
    document.querySelectorAll('.category-header').forEach(header => {
      header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('.toggle-icon i');
        
        if (content.style.display === 'block') {
          content.style.display = 'none';
          icon.className = 'fas fa-plus';
        } else {
          content.style.display = 'block';
          icon.className = 'fas fa-minus';
        }
      });
    });
    
    // Search functionality
    document.getElementById('product-search').addEventListener('keyup', function() {
      const searchTerm = this.value.toLowerCase();
      const items = document.querySelectorAll('.product-list li');
      let hasResults = false;
      
      items.forEach(item => {
        const productName = item.querySelector('.product-name').textContent.toLowerCase();
        const companyName = item.querySelector('.product-company').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || companyName.includes(searchTerm)) {
          item.style.display = 'flex';
          hasResults = true;
          
          // If this item is visible, make sure its parent category is open
          const categoryContent = item.closest('.category-content');
          categoryContent.style.display = 'block';
          const toggleIcon = categoryContent.previousElementSibling.querySelector('.toggle-icon i');
          toggleIcon.className = 'fas fa-minus';
        } else {
          item.style.display = 'none';
        }
      });
      
      // If search has results, show all categories with results
      document.querySelectorAll('.category').forEach(category => {
        const visibleItems = category.querySelectorAll('.product-list li[style="display: flex;"]');
        if (visibleItems.length === 0 && searchTerm !== '') {
          category.style.display = 'none';
        } else {
          category.style.display = 'block';
        }
      });
      
      // If search is empty, reset all categories to default state
      if (searchTerm === '') {
        document.querySelectorAll('.category').forEach(category => {
          category.style.display = 'block';
          category.querySelector('.category-content').style.display = 'none';
          category.querySelector('.toggle-icon i').className = 'fas fa-plus';
        });
      }
    });
    
    // Create animation effect for page load
    document.addEventListener('DOMContentLoaded', function() {
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
    });