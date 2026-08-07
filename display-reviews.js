// ============================================
// DISPLAY GOOGLE REVIEWS
// ============================================

let currentReviewIndex = 0;

// ============================================
// MAIN DISPLAY
// ============================================
function displayReviews() {
    if (!googleReviewsData || !googleReviewsData.reviews) {
        console.error('❌ No reviews data found!');
        return;
    }
    
    updateReviewSummary();
    renderReviewCards();
    updateDots();
}

// ============================================
// SUMMARY
// ============================================
function updateReviewSummary() {
    const { rating, totalReviews, googleUrl } = googleReviewsData.summary;
    
    const ratingElement = document.getElementById('google-rating');
    if (ratingElement) ratingElement.textContent = rating;
    
    const totalElement = document.getElementById('google-total-reviews');
    if (totalElement) totalElement.textContent = `${totalReviews}+ reviews`;
    
    const reviewLink = document.getElementById('google-review-link');
    if (reviewLink) reviewLink.href = googleUrl;
}

// ============================================
// RENDER CARDS
// ============================================
function renderReviewCards() {
    const track = document.getElementById('reviews-track');
    if (!track) return;
    
    track.innerHTML = '';
    
    googleReviewsData.reviews.forEach((review, index) => {
        const card = createReviewCard(review, index);
        track.appendChild(card);
    });
    
    addShowMoreListeners();
}

function createReviewCard(review, index) {
    const card = document.createElement('div');
    card.className = 'review-card flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3';
    
    const starsHTML = generateStars(review.rating);
    const avatarHTML = review.photo 
        ? `<img src="${review.photo}" alt="${review.name}" class="w-12 h-12 rounded-full object-cover">`
        : `<div class="w-12 h-12 rounded-full ${getAvatarColor(index)} flex items-center justify-center text-white font-bold text-lg">${getInitials(review.name)}</div>`;
    
    const isLongText = review.text.length > 150;
    
    card.innerHTML = `
        <div class="bg-dark-800 border border-white/8 rounded-2xl p-6 md:p-8 h-full flex flex-col hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-center gap-4 mb-4">
                ${avatarHTML}
                <div class="flex-1">
                    <h4 class="text-white font-semibold">${review.name}</h4>
                    <p class="text-stone-500 text-xs">${review.time}</p>
                </div>
                <img src="https://www.google.com/favicon.ico" alt="Google" class="w-5 h-5 flex-shrink-0">
            </div>
            <div class="flex gap-1 mb-3">${starsHTML}</div>
            <div class="review-text-container flex-1">
                <p class="text-stone-300 text-sm leading-relaxed review-preview ${isLongText ? '' : 'hidden'}">${review.text.substring(0, 150)}...</p>
                <p class="text-stone-300 text-sm leading-relaxed review-full ${isLongText ? 'hidden' : ''}">"${review.text}"</p>
                ${isLongText ? `
                    <button class="show-more-btn text-gold-400 text-xs font-medium mt-2 hover:text-gold-300 transition-colors cursor-pointer bg-transparent border-none p-0">
                        Show More ↓
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// ============================================
// SHOW MORE / SHOW LESS
// ============================================
function addShowMoreListeners() {
    document.querySelectorAll('.show-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const container = btn.closest('.review-text-container');
            const preview = container.querySelector('.review-preview');
            const full = container.querySelector('.review-full');
            
            if (full.classList.contains('hidden')) {
                preview.classList.add('hidden');
                full.classList.remove('hidden');
                btn.textContent = 'Show Less ↑';
            } else {
                preview.classList.remove('hidden');
                full.classList.add('hidden');
                btn.textContent = 'Show More ↓';
            }
        });
    });
}

// ============================================
// STARS
// ============================================
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating 
            ? `<svg class="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
            : `<svg class="w-4 h-4 text-stone-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    }
    return stars;
}

// ============================================
// HELPERS
// ============================================
function getInitials(name) {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
}

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

// ============================================
// DOTS
// ============================================
function updateDots() {
    const dotsContainer = document.getElementById('review-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    
    const cardsPerView = getCardsPerView();
    const totalReviews = googleReviewsData.reviews.length;
    const totalDots = Math.max(1, totalReviews - cardsPerView + 1);
    
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.className = `review-dot w-3 h-3 rounded-full transition-all duration-300 ${i === 0 ? 'bg-gold-500' : 'bg-white/20 hover:bg-white/40'}`;
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', () => goToReview(i));
        dotsContainer.appendChild(dot);
    }
}

function updateActiveDot() {
    const dots = document.querySelectorAll('.review-dot');
    dots.forEach((dot, index) => {
        if (index === currentReviewIndex) {
            dot.classList.add('bg-gold-500');
            dot.classList.remove('bg-white/20', 'hover:bg-white/40');
            dot.style.width = '24px';
            dot.style.borderRadius = '6px';
        } else {
            dot.classList.remove('bg-gold-500');
            dot.classList.add('bg-white/20', 'hover:bg-white/40');
            dot.style.width = '12px';
            dot.style.borderRadius = '50%';
        }
    });
}

// ============================================
// SIMPLE CAROUSEL - SCROLL TO CARD
// ============================================
function goToReview(index) {
    const track = document.getElementById('reviews-track');
    if (!track) return;
    
    const cards = track.querySelectorAll('.review-card');
    if (cards.length === 0) return;
    
    const maxIndex = Math.max(0, cards.length - getCardsPerView());
    currentReviewIndex = Math.max(0, Math.min(index, maxIndex));
    
    // نجيب الكارت اللي عايزين نروح له
    const targetCard = cards[currentReviewIndex];
    
    // نعمل scroll للكارت ده
    targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
    });
    
    updateActiveDot();
}

function updateCarousel() {
    const track = document.getElementById('reviews-track');
    if (!track) return;
    
    const cards = track.querySelectorAll('.review-card');
    if (cards.length === 0) return;
    
    const targetCard = cards[currentReviewIndex];
    if (targetCard) {
        targetCard.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',    // ← المهم: nearest مش start
            inline: 'start'
        });
    }
}

function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

// ============================================
// INIT CAROUSEL
// ============================================
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
            const maxIndex = Math.max(0, googleReviewsData.reviews.length - getCardsPerView());
            if (currentReviewIndex < maxIndex) {
                currentReviewIndex++;
                updateCarousel();
                updateActiveDot();
            }
        });
    }
    
    window.addEventListener('resize', () => {
        const maxIndex = Math.max(0, googleReviewsData.reviews.length - getCardsPerView());
        if (currentReviewIndex > maxIndex) currentReviewIndex = maxIndex;
        updateDots();
        updateActiveDot();
    });
    
    // تشغيل تلقائي بعد 8 ثواني (بدل 5)
setInterval(() => {
    const reviewsSection = document.getElementById('reviews');
    if (!reviewsSection) return;
    
    const rect = reviewsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // لو الـ reviews section مش باين بالكامل، متحركش
    if (rect.bottom < 100 || rect.top > windowHeight - 100) {
        return;
    }
    
    const maxIndex = Math.max(0, googleReviewsData.reviews.length - getCardsPerView());
    currentReviewIndex = currentReviewIndex >= maxIndex ? 0 : currentReviewIndex + 1;
    updateCarousel();
    updateActiveDot();
}, 8000); // 8 ثواني بدل 5
}

// ============================================
// START
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    displayReviews();
    initCarousel();
});