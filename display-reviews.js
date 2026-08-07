// ============================================
// DISPLAY GOOGLE REVIEWS
// ============================================

// دالة عرض التقييمات
function displayReviews() {
    // التحقق من وجود بيانات
    if (!googleReviewsData || !googleReviewsData.reviews) {
        console.error('❌ No reviews data found!');
        return;
    }
    
    // تحديث ملخص التقييمات
    updateReviewSummary();
    
    // عرض كروت التقييمات
    renderReviewCards();
    
    // تحديث نقاط التنقل (dots)
    updateDots();
}

// تحديث ملخص التقييمات (النجوم والتقييم العام)
function updateReviewSummary() {
    const { rating, totalReviews, googleUrl } = googleReviewsData.summary;
    
    // تحديث الرقم
    const ratingElement = document.getElementById('google-rating');
    if (ratingElement) ratingElement.textContent = rating;
    
    // تحديث عدد التقييمات
    const totalElement = document.getElementById('google-total-reviews');
    if (totalElement) totalElement.textContent = `${totalReviews}+ reviews`;
    
    // تحديث رابط كتابة تقييم
    const reviewLink = document.getElementById('google-review-link');
    if (reviewLink) reviewLink.href = googleUrl;
}

// عرض كروت التقييمات
function renderReviewCards() {
    const track = document.getElementById('reviews-track');
    if (!track) return;
    
    // مسح المحتوى القديم
    track.innerHTML = '';
    
    // إنشاء كارت لكل تقييم
    googleReviewsData.reviews.forEach((review, index) => {
        const card = createReviewCard(review, index);
        track.appendChild(card);
    });
}

// إنشاء كارت تقييم واحد
function createReviewCard(review, index) {
    const card = document.createElement('div');
    card.className = 'review-card flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3';
    
    // توليد نجوم HTML
    const starsHTML = generateStars(review.rating);
    
    // توليد صورة البروفايل أو الأحرف الأولى
    const avatarHTML = review.photo 
        ? `<img src="${review.photo}" alt="${review.name}" class="w-12 h-12 rounded-full object-cover">`
        : `<div class="w-12 h-12 rounded-full ${getAvatarColor(index)} flex items-center justify-center text-white font-bold text-lg">${getInitials(review.name)}</div>`;
    
    card.innerHTML = `
        <div class="bg-dark-800 border border-white/8 rounded-2xl p-6 md:p-8 h-full flex flex-col hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1">
            <!-- Header: صورة + اسم + تاريخ -->
            <div class="flex items-center gap-4 mb-4">
                ${avatarHTML}
                <div class="flex-1">
                    <h4 class="text-white font-semibold">${review.name}</h4>
                    <p class="text-stone-500 text-xs">${review.time}</p>
                </div>
            </div>
            
            <!-- النجوم -->
            <div class="flex gap-1 mb-3">
                ${starsHTML}
            </div>
            
            <!-- نص التقييم -->
            <p class="text-stone-300 text-sm leading-relaxed flex-1">"${review.text}"</p>
        </div>
    `;
    
    return card;
}

// توليد نجوم HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            // نجمة مملوءة (ذهبية)
            stars += `
                <svg class="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>`;
        } else {
            // نجمة فاضية (رمادية)
            stars += `
                <svg class="w-4 h-4 text-stone-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>`;
        }
    }
    return stars;
}

// استخراج الأحرف الأولى من الاسم
function getInitials(name) {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

// اختيار لون خلفية للـ avatar
function getAvatarColor(index) {
    const colors = [
        'bg-gradient-to-br from-gold-400 to-gold-600',
        'bg-gradient-to-br from-blue-400 to-purple-600',
        'bg-gradient-to-br from-pink-400 to-rose-600',
        'bg-gradient-to-br from-green-400 to-teal-600',
        'bg-gradient-to-br from-orange-400 to-red-600',
        'bg-gradient-to-br from-indigo-400 to-blue-600',
        'bg-gradient-to-br from-yellow-400 to-orange-600',
        'bg-gradient-to-br from-teal-400 to-cyan-600'
    ];
    return colors[index % colors.length];
}

// تحديث نقاط التنقل (dots)
function updateDots() {
    const dotsContainer = document.getElementById('review-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    
    const cardsPerView = getCardsPerView();
    const totalReviews = googleReviewsData.reviews.length;
    
    // عدد المجموعات = عدد التقييمات - عدد الكروت اللي بتظهر + 1
    const totalDots = Math.max(1, totalReviews - cardsPerView + 1);
    
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.className = `review-dot w-3 h-3 rounded-full transition-all duration-300 ${
            i === 0 ? 'bg-gold-500 active' : 'bg-white/20 hover:bg-white/40'
        }`;
        dot.setAttribute('data-index', i);
        dot.setAttribute('aria-label', `Review group ${i + 1}`);
        
        dot.addEventListener('click', () => {
            goToReview(i);
        });
        
        dotsContainer.appendChild(dot);
    }
    
    console.log(`✅ Reviews: ${totalReviews}, Cards per view: ${cardsPerView}, Dots: ${totalDots}`);
}

// التنقل لتقييم معين
function goToReview(index) {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, googleReviewsData.reviews.length - cardsPerView);
    
    // منع الانتقال لأبعد من آخر تقييم
    if (index > maxIndex) {
        index = maxIndex;
    }
    if (index < 0) {
        index = 0;
    }
    
    currentReviewIndex = index;
    updateCarousel();
    updateActiveDot();
}

// تحديث الكاروسيل
function updateCarousel() {
    const track = document.getElementById('reviews-track');
    if (!track) return;
    
    const cards = track.querySelectorAll('.review-card');
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth + 24; // width + gap (px-3 = 12px on each side)
    const offset = currentReviewIndex * cardWidth;
    
    track.style.transform = `translateX(-${offset}px)`;
}

// تحديث النقطة النشطة
function updateActiveDot() {
    const dots = document.querySelectorAll('.review-dot');
    dots.forEach((dot, index) => {
        if (index === currentReviewIndex) {
            dot.classList.add('bg-gold-500', 'active');
            dot.classList.remove('bg-white/20', 'hover:bg-white/40');
            dot.style.width = '24px';
            dot.style.borderRadius = '6px';
        } else {
            dot.classList.remove('bg-gold-500', 'active');
            dot.classList.add('bg-white/20', 'hover:bg-white/40');
            dot.style.width = '12px';
            dot.style.borderRadius = '50%';
        }
    });
}

// ============================================
// CAROUSEL CONTROLS
// ============================================
let currentReviewIndex = 0;

function initCarousel() {
    const prevBtn = document.getElementById('reviews-prev');
    const nextBtn = document.getElementById('reviews-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentReviewIndex > 0) {
                currentReviewIndex--;
                updateCarousel();
                updateActiveDot();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const cardsPerView = getCardsPerView();
            const maxIndex = Math.max(0, googleReviewsData.reviews.length - cardsPerView);
            
            if (currentReviewIndex < maxIndex) {
                currentReviewIndex++;
                updateCarousel();
                updateActiveDot();
            }
            // في دالة initCarousel()، بعد window.addEventListener('resize'...)
window.addEventListener('resize', () => {
    const maxIndex = Math.max(0, googleReviewsData.reviews.length - getCardsPerView());
    if (currentReviewIndex > maxIndex) {
        currentReviewIndex = maxIndex;
    }
    updateDots();        // ← أضف السطر ده
    updateCarousel();
    updateActiveDot();
});
        });
    }
    
    // تحديث عند تغيير حجم الشاشة
    window.addEventListener('resize', () => {
        const maxIndex = Math.max(0, googleReviewsData.reviews.length - getCardsPerView());
        if (currentReviewIndex > maxIndex) {
            currentReviewIndex = maxIndex;
        }
        updateCarousel();
        updateActiveDot();
    });
    
    // تشغيل تلقائي كل 5 ثواني
    setInterval(() => {
        const cardsPerView = getCardsPerView();
        const maxIndex = Math.max(0, googleReviewsData.reviews.length - cardsPerView);
        
        if (currentReviewIndex < maxIndex) {
            currentReviewIndex++;
        } else {
            currentReviewIndex = 0;
        }
        updateCarousel();
        updateActiveDot();
    }, 5000);
}

function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;  // Desktop
    if (window.innerWidth >= 768) return 2;   // Tablet
    return 1;                                  // Mobile
}

// ============================================
// START EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    displayReviews();
    initCarousel();
});