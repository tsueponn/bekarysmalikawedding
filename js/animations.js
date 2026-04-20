// Анимация при прокрутке (Scroll Animation)
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const checkVisibility = () => {
        const triggerBottom = window.innerHeight * 0.85; // Триггер на 85% высоты экрана

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('active'); // Добавляем класс, запускающий CSS-анимацию
            }
            // Если хочешь, чтобы анимация срабатывала каждый раз, убери комментарий ниже:
            // else {
            //     element.classList.remove('active');
            // }
        });
    };

    // Проверяем видимость при загрузке и при прокрутке
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
});