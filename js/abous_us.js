document.querySelector('#about-us-link').addEventListener('click', function(event) {
    event.preventDefault(); // Отменяет стандартное поведение (переход по ссылке)

    // Скрытие ненужных элементов
    const elementsToHide = document.querySelectorAll(".hero-name, .danger, .play-btn");
    const specificImage = document.querySelector(".target-image");

    elementsToHide.forEach(element => {
        let duration = 0.7;
        let delay = 0;

        if (element.classList.contains("background-text")) {
            duration = 0.6;
        } else if (element.classList.contains("play-btn")) {
            duration = 1.4;
        }

        setTimeout(() => {
            element.style.transition = `opacity ${duration}s ease-out`;
            element.style.opacity = "0";

            setTimeout(() => {
                element.style.display = "none";
            }, duration * 1000);
        }, delay * 1000);
    });

    // Скрытие картинки
    if (specificImage) {
        setTimeout(() => {
            specificImage.style.transition = "opacity 1.1s ease-out";
            specificImage.style.opacity = "0";

            setTimeout(() => {
                specificImage.style.display = "none";
            }, 1100);
        }, 300); // Задержка перед исчезновением
    }

    // Показ окна "About us"
    const aboutUs = document.getElementById('about-us');
    if (aboutUs) {
        aboutUs.style.display = 'flex';
        console.log('About us window shown');
    }

    // Показ изображения поверх
    const imageWrapper = document.getElementById('image-wrapper');
    if (imageWrapper) {
        imageWrapper.style.display = 'block';
    }
});
