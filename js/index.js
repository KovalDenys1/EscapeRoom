window.onload = function() {
    // Показываем всплывающее окно для ввода имени персонажа
     var heroName = prompt("Enter your character's name:");
  
    // Если пользователь что-то ввел, меняем текст в div
    if (heroName !== null && heroName !== "") {
      document.querySelector(".hero-name").textContent = "Hero: " + heroName;
    }
  };

  const dangerElement = document.querySelector(".danger");
  const dangerBtn = document.querySelector(".danger-btn");
  
  document.addEventListener("mousemove", (event) => {
      const btnRect = dangerBtn.getBoundingClientRect();
      const cursorX = event.clientX;
      const cursorY = event.clientY;
  
      // Проверяем, находится ли курсор внутри кнопки
      if (
          cursorX >= btnRect.left &&
          cursorX <= btnRect.right &&
          cursorY >= btnRect.top &&
          cursorY <= btnRect.bottom
      ) {
          dangerElement.textContent = "Danger 100%";
      } else {
          // Вычисляем расстояние от курсора до кнопки
          const dx = Math.max(btnRect.left - cursorX, cursorX - btnRect.right, 0);
          const dy = Math.max(btnRect.top - cursorY, cursorY - btnRect.bottom, 0);
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          // Чем дальше курсор, тем меньше процент (ограничиваем от 0% до 99%)
          let percentage = Math.max(0, 99 - distance / 10); 
          dangerElement.textContent = `Danger ${Math.round(percentage)}%`;
      }
  });


  document.querySelector(".play-btn").addEventListener("click", () => {
    const elementsToHide = document.querySelectorAll(".background-text, .hero-name, .danger, .play-btn");
    const elementsToShow = document.querySelectorAll(".welcome-div");
    const specificImage = document.querySelector(".target-image"); // Определённая картинка

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

    // Обрабатываем только указанную картинку
    if (specificImage) {
        setTimeout(() => {
            specificImage.style.transition = "opacity 1.1s ease-out";
            specificImage.style.opacity = "0";

            setTimeout(() => {
                specificImage.style.display = "none";
            }, 1100);
        }, 300); // Задержка перед исчезновением
    }

    // Добавляем задержку перед появлением новых элементов
    setTimeout(() => {
        elementsToShow.forEach(element => {
            element.style.display = "flex";
            element.style.opacity = "0";
            element.style.transition = "opacity 1s ease-in";

            setTimeout(() => {
                element.style.opacity = "1";
            }, 100);
        });
    }, 1200);
});


function checkAnswer(answerId, currentPuzzleId, nextPuzzleId) {
    const userAnswer = document.getElementById(answerId).value ? document.getElementById(answerId).value.toLowerCase() : document.getElementById(answerId).innerText.toLowerCase();
    let correctAnswer;

    // Define the correct answers for each puzzle
    if (currentPuzzleId === 'puzzle1') {
        correctAnswer = "denys and nikol".toLowerCase(); // Correct answer for first puzzle
    } else if (currentPuzzleId === 'puzzle2') {
        correctAnswer = "8"; // Correct answer for second puzzle
    } else if (currentPuzzleId === 'puzzle3') {
        correctAnswer = "future"; // Correct answer for third puzzle
    } else if (currentPuzzleId === 'puzzle4') {
        correctAnswer = "console"; // Correct answer for fourth puzzle (found in the console)
    } else if (currentPuzzleId === 'puzzle5') {
        correctAnswer = "option3"; // Correct answer for 5th puzzle
    }

    // Check if the answer is correct
    if (userAnswer === correctAnswer) {
        document.getElementById('feedback' + currentPuzzleId.charAt(6)).innerHTML = "<span style='color: green;'>Correct answer!</span>";

        // Hide current puzzle and show next puzzle
        document.getElementById(currentPuzzleId).style.display = 'none';

        if (nextPuzzleId) {
            document.getElementById(nextPuzzleId).style.display = 'block';
        }
    } else {
        document.getElementById('feedback' + currentPuzzleId.charAt(6)).innerHTML = "<span style='color: red;'>Incorrect answer. Try again.</span>";
    }

    // For the 4th puzzle, log the answer in the console
    if (currentPuzzleId === 'puzzle4') {
        console.log("The secret answer is: console");
    }
}
