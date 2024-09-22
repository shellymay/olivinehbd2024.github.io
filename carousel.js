let index = 0;
let isPaused = false;

function showSlides() {
    if (!isPaused) {
        const slides = document.querySelectorAll('.carousel-image');
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
        });
        slides[index].classList.add('active');
        updateThumbnails();
        index = (index + 1) % slides.length;
    }
    setTimeout(showSlides, 5000); // 每5秒切換一次圖片
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

showSlides();

// 左右按鈕
document.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + document.querySelectorAll('.carousel-image').length) % document.querySelectorAll('.carousel-image').length;
    updateSlide();
});

document.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % document.querySelectorAll('.carousel-image').length;
    updateSlide();
});

function updateSlide() {
    const slides = document.querySelectorAll('.carousel-image');
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    updateThumbnails();
}

// 點擊縮圖跳轉到對應圖片
document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
        index = i;
        updateSlide();
    });
});

// 點擊圖片彈出燈箱
const images = document.querySelectorAll('.carousel-image img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.imageclose');

images.forEach(image => {
    image.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = image.src;
        lightboxImg.classList.add('show');
        isPaused = true; // 暫停輪播
    });
});

// 關閉燈箱
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    isPaused = false; // 重啟輪播
    lightboxImg.classList.remove('show');
});

// 燈箱左右按鈕切換
document.querySelector('.lightbox-prev').addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    updateLightbox();
});

document.querySelector('.lightbox-next').addEventListener('click', () => {
    index = (index + 1) % images.length;
    updateLightbox();
});

function updateLightbox() {
    const image = images[index];
    lightboxImg.src = image.src;
}

// 點擊燈箱外部關閉
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        isPaused = false; // 重啟輪播
        lightboxImg.classList.remove('show');
    }
});