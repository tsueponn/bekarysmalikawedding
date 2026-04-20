// Запрещаем браузеру восстанавливать позицию скролла
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// Принудительно скроллим вверх при загрузке
window.scrollTo(0, 0);

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

/**
 * 1. Логика проверки устройства (Mobile Only)
 */
function checkDevice() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const blocker = document.getElementById('desktop-blocker');
    
    if (blocker) {
        if (!isMobile && window.innerWidth > 768) {
            blocker.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        } else {
            blocker.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

/**
 * 2. Логика управления музыкой + Синхронизация с анимацией кнопки
 */
let isPlaying = false;

function toggleMusic() {
    const music = document.getElementById('bg-music');
    const musicIcon = document.getElementById('music-icon');
    const musicBtn = document.querySelector('.btn-music-hero'); // Находим саму кнопку
    
    if (!music) return;

    if (isPlaying) {
        music.pause();
        // Меняем иконку
        musicIcon.classList.replace('bi-volume-up-fill', 'bi-music-note-beamed');
        // Убираем золотую пульсацию кнопки
        if (musicBtn) musicBtn.classList.remove('music-playing');
    } else {
        music.play().catch(e => console.log("Браузер блокирует автоплей"));
        // Меняем иконку
        musicIcon.classList.replace('bi-music-note-beamed', 'bi-volume-up-fill');
        // Добавляем золотую пульсацию кнопки
        if (musicBtn) musicBtn.classList.add('music-playing');
    }
    isPlaying = !isPlaying;
}
// Функция для запуска музыки
function playWeddingMusic() {
    const audio = document.getElementById('weddingAudio'); // Проверь, что у твоего <audio> такой id
    if (audio) {
        audio.play().then(() => {
            console.log("Музыка пошла!");
            // Удаляем обработчик после первого запуска, чтобы музыка не перезапускалась при каждом клике
            document.removeEventListener('click', playWeddingMusic);
            document.removeEventListener('touchstart', playWeddingMusic);
        }).catch(error => {
            console.log("Браузер всё еще блокирует:", error);
        });
    }
}

// Ждем клика или касания (для телефонов)
document.addEventListener('click', playWeddingMusic);
document.addEventListener('touchstart', playWeddingMusic);

/**
 * 3. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (Для календаря и приглашения)
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15 // Анимация сработает, когда 15% секции покажется на экране
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Если хочешь, чтобы анимация была одноразовой, раскомментируй строку ниже:
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Находим все элементы с классом анимации и следим за ними
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * ЛОГИКА ТАЙМЕРА
 */
function updateCountdown() {
    const weddingDate = new Date("July 15, 2026 17:00:00").getTime();
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = d < 10 ? '0' + d : d;
        document.getElementById("hours").innerText = h < 10 ? '0' + h : h;
        document.getElementById("minutes").innerText = m < 10 ? '0' + m : m;
        document.getElementById("seconds").innerText = s < 10 ? '0' + s : s;
    } else {
        document.querySelector(".countdown-container").innerHTML = "<h4>Той басталды!</h4>";
    }
}

// Запускаем таймер каждую секунду
setInterval(updateCountdown, 1000);
updateCountdown(); // И сразу при загрузке

/**
 * 4. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
 */
document.addEventListener('DOMContentLoaded', function() {
    // Запуск анимаций скролла
    initScrollAnimations();

    // Авто-закрытие меню при клике на ссылку
    const offcanvasMenu = document.getElementById('offcanvasMenu');
    if (offcanvasMenu) {
        const navLinks = offcanvasMenu.querySelectorAll('.nav-link');
        const closeBtn = offcanvasMenu.querySelector('.btn-close');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (closeBtn) closeBtn.click();
            });
        });
    }
});

// Слушатели событий устройства
window.addEventListener('load', checkDevice);
window.addEventListener('resize', checkDevice);
