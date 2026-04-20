document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('weddingAudio');
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = document.getElementById('music-icon');

    // 1. Функция обновления внешнего вида кнопки
    function updateUI() {
        if (!audio.paused) {
            // Если играет — светимся и ставим иконку паузы
            musicBtn.classList.add('music-playing');
            musicIcon.classList.replace('bi-music-note-beamed', 'bi-pause-fill');
        } else {
            // Если на паузе — тушим свет и ставим ноту
            musicBtn.classList.remove('music-playing');
            musicIcon.classList.replace('bi-pause-fill', 'bi-music-note-beamed');
        }
    }

    // 2. Функция переключения (Play/Pause)
    function toggleMusic() {
        if (audio.paused) {
            audio.play().then(() => updateUI());
        } else {
            audio.pause();
            updateUI();
        }
    }

    // 3. Логика для ПЕРВОГО запуска (Автоплей для мобилок)
    const handleFirstInteraction = () => {
        if (audio.paused) {
            audio.play().then(() => {
                updateUI();
                removeInteractionListeners();
            }).catch(err => console.log("Ждем клика..."));
        }
    };

    function removeInteractionListeners() {
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);
    }

    // Вешаем "будильники" для первой активности
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction, { once: true });

    // 4. Работа самой кнопки
    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Важно: не дает сработать handleFirstInteraction
            toggleMusic();
        });
    }

    // --- Таймер обратного отсчета ---
    const targetDate = new Date("July 15, 2026 18:00:00").getTime();
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff > 0) {
            document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        } else {
            clearInterval(countdownInterval);
        }
    }, 1000);
});
