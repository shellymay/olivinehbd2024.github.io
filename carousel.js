const carousels = [
    { id: 1, index: 0, isPaused: false },
    { id: 2, index: 0, isPaused: false },
    { id: 3, index: 0, isPaused: false },
    { id: 4, index: 0, isPaused: false }
];

let currentCarouselId = null;
let currentSlideIndex = 0;

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".imageclose");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

carousels.forEach(carousel => {
    const slides = document.querySelectorAll(`#carousel-${carousel.id} .slide-item`);
    const thumbnails = document.querySelectorAll(`#thumbnails-${carousel.id} .thumbnail`);

    function showSlides() {
        if (!carousel.isPaused) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[carousel.index].classList.add('active');
            updateThumbnails();
            carousel.index = (carousel.index + 1) % slides.length;
        }
        setTimeout(showSlides, 3000); // 每3秒切換一次圖片
    }

    function updateThumbnails() {
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === carousel.index);
        });
    }

    showSlides();

    // 左右按鈕事件
    document.querySelector(`#carousel-${carousel.id} .prev`).addEventListener('click', () => {
        carousel.index = (carousel.index - 1 + slides.length) % slides.length;
        updateSlide();
    });

    document.querySelector(`#carousel-${carousel.id} .next`).addEventListener('click', () => {
        carousel.index = (carousel.index + 1) % slides.length;
        updateSlide();
    });

    function updateSlide() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[carousel.index].classList.add('active');
        updateThumbnails();
    }

    // 縮圖點擊事件
    thumbnails.forEach((thumb, i) => {
        thumb.addEventListener('click', () => {
            carousel.index = i;
            updateSlide();
        });
    });

    // 燈箱點擊圖片事件
    slides.forEach((slide, i) => {
        slide.querySelector("img").addEventListener("click", () => {
            openLightbox(carousel.id, i);
        });
    });
});

// 燈箱打開邏輯
function openLightbox(carouselId, slideIndex) {
    currentCarouselId = carouselId;
    currentSlideIndex = slideIndex;

    // 暫停對應的輪播
    const currentCarousel = carousels.find(carousel => carousel.id === carouselId);
    currentCarousel.isPaused = true;

    lightbox.style.display = "block";
    showLightboxImage();
}

// 顯示燈箱圖片
function showLightboxImage() {
    const carouselSlides = document.querySelectorAll(`#carousel-${currentCarouselId} .slide-item img`);
    const currentImg = carouselSlides[currentSlideIndex].src;
    lightboxImg.src = currentImg;
}

// 關閉燈箱
lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none";

    // 恢復輪播
    const currentCarousel = carousels.find(carousel => carousel.id === currentCarouselId);
    currentCarousel.isPaused = false;
});

// 燈箱切換上一張圖片
lightboxPrev.addEventListener("click", () => {
    currentSlideIndex = (currentSlideIndex - 1 + document.querySelectorAll(`#carousel-${currentCarouselId} .slide-item`).length) % document.querySelectorAll(`#carousel-${currentCarouselId} .slide-item`).length;
    showLightboxImage();
});

// 燈箱切換下一張圖片
lightboxNext.addEventListener("click", () => {
    currentSlideIndex = (currentSlideIndex + 1) % document.querySelectorAll(`#carousel-${currentCarouselId} .slide-item`).length;
    showLightboxImage();
});

// 點擊燈箱以外的區域關閉燈箱
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.style.display = "none";

        // 恢復輪播
        const currentCarousel = carousels.find(carousel => carousel.id === currentCarouselId);
        currentCarousel.isPaused = false;
    }
});
