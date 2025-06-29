const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const cards = document.querySelectorAll(".slider-card");
const track = document.getElementById("sliderTrack");
const container = document.getElementById("slider");
let slideCount = 0;
let intervalId = null;
let startX = 0;
let endX = 0;

const visibleCards = () => {
    const width = window.innerWidth;
    if (width >= 1200) return 3;
    if (width <= 480) return 1;
    return 2;
};
let maxIndex = cards.length - visibleCards();
const getCardWidth = () => {
    const card = document.querySelector('.slider-card');
    return card.offsetWidth + 20; // margin included
};

const updateActiveDot = () => {
    const dots = document.querySelectorAll(".dot");

    // Clamp the index to stay within range
    const index = Math.max(0, Math.min(slideCount, dots.length - 1));

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
};

const moveToSlide = () => {
    const cardWidth = getCardWidth();

    let index = Math.max(0, Math.min(slideCount, maxIndex));
    slideCount = index;

    track.style.transform = `translateX(-${index * cardWidth}px)`;
    updateActiveDot();
};


next.addEventListener("click", () => {
    slideCount++;
    moveToSlide();
});

prev.addEventListener("click", () => {
    slideCount--;
    moveToSlide();
});

const updateValue = () => {
    slideCount++;
    if (slideCount > maxIndex) {
        slideCount = 0;
    }
    moveToSlide();
}
const startAutoUpdate = () => {
    if (!intervalId) {
        intervalId = setInterval(updateValue, 1000);
    }
};
const stopAutoUpdate = () => {
    clearInterval(intervalId);
    intervalId = null;
};

container.addEventListener('mouseenter', stopAutoUpdate);
container.addEventListener('mouseleave', startAutoUpdate);

startAutoUpdate();

const handleSwipe = () => {
    const diff = endX - startX;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
        if (diff < 0) {
            slideCount++;
            moveToSlide();
        } else {
            slideCount--;
            moveToSlide();
        }
    }
};

container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

container.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});