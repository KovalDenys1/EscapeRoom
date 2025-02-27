window.onload = function() {
    let preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.style.transition = "opacity 0.5s ease-out";
        preloader.style.opacity = "0";

        setTimeout(() => {
            preloader.style.display = "none";
            let heroName = prompt("Enter your character's name:");
            if (heroName !== null && heroName.trim() !== "") {
                document.querySelector(".hero-name").innerText = "Hero: " + heroName;

                // Обновляем **только имя**, не затрагивая разметку кнопок
                let welcomeText = document.getElementById("welcome-text");
                let textNode = welcomeText.firstChild; // Получаем текстовый узел внутри `#welcome-text`
                textNode.textContent = textNode.textContent.replace("Yourname", heroName);
            }
        }, 500);
    }, 750);
};