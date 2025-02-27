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
    toggleElements(false); // Скрыть стартовые элементы и показать новые
});

document.querySelector(".back-to-home").addEventListener("click", () => {
    toggleElements(true); // Скрыть новые элементы и вернуть стартовые
});

function toggleElements(isReturning) {
    const elementsToHide = document.querySelectorAll(".background-text, .hero-name, .danger, .play-btn");
    const elementsToShow = document.querySelectorAll(".welcome-div");
    const specificImage = document.querySelector(".target-image");

    if (isReturning) {
        // Вернуть стартовые элементы
        elementsToHide.forEach(element => {
            element.style.display = "block";
            element.style.opacity = "0";
            element.style.transition = "opacity 1s ease-in";
            
            setTimeout(() => {
                element.style.opacity = "1";
            }, 900);
        });

        // Вернуть картинку
        if (specificImage) {
            specificImage.style.display = "block";
            specificImage.style.opacity = "0";
            specificImage.style.transition = "opacity 1.1s ease-in";

            setTimeout(() => {
                specificImage.style.opacity = "1";
            }, 100);
        }

        // Скрыть welcome-div
        elementsToShow.forEach(element => {
            element.style.transition = "opacity 0.7s ease-out";
            element.style.opacity = "0";

            setTimeout(() => {
                element.style.display = "none";
            }, 700);
        });
    } else {
        // Исчезновение стартовых элементов
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

        // Исчезновение картинки
        if (specificImage) {
            setTimeout(() => {
                specificImage.style.transition = "opacity 1.1s ease-out";
                specificImage.style.opacity = "0";

                setTimeout(() => {
                    specificImage.style.display = "none";
                }, 1100);
            }, 300);
        }

        // Появление новых элементов
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
    }
}

document.querySelector(".first-puzzle").addEventListener("click", () => {
    const welcomeDiv = document.querySelector(".welcome-div");
    const puzzleContainer = document.querySelector(".puzzle-container");

    // Сначала плавно меняем фон на синий градиент
    document.body.style.background = "linear-gradient(to bottom, #013779, #016BC3)"; 

    // Скрываем welcome-div с плавной анимацией
    welcomeDiv.style.transition = "opacity 1s ease-out";
    welcomeDiv.style.opacity = "0";

    setTimeout(() => {
        welcomeDiv.style.display = "none"; // Полностью скрываем
        puzzleContainer.style.display = "block"; // Показываем головоломку
        puzzleContainer.style.opacity = "0"; // Делаем её невидимой
        puzzleContainer.style.transition = "opacity 1s ease-in"; // Анимация появления

        setTimeout(() => {
            puzzleContainer.style.opacity = "1"; // Плавное появление
        }, 100);
    }, 1000); // Подождать 1 секунду перед скрытием welcome-div
});


function checkAnswer(answerId, currentPuzzleId, nextPuzzleId) {
    const userAnswer = document.getElementById(answerId).value ? document.getElementById(answerId).value.toLowerCase() : document.getElementById(answerId).innerText.toLowerCase();
    let correctAnswer;

    // Define the correct answers for each puzzle
    if (currentPuzzleId === 'puzzle1') {
        correctAnswer = "nikol and denys".toLowerCase();
    } else if (currentPuzzleId === 'puzzle2') {
        correctAnswer = "7";
    } else if (currentPuzzleId === 'puzzle3') {
        correctAnswer = "future";
    } else if (currentPuzzleId === 'puzzle4') {
        correctAnswer = "console";
    }

    const feedback = document.getElementById('feedback' + currentPuzzleId.charAt(6));

    if (userAnswer === correctAnswer) {
        feedback.innerHTML = "<span class='correct-answer' style='color: green;'>Correct answer!</span>";

        const correctText = feedback.querySelector(".correct-answer");
        correctText.style.opacity = "0"; // Начинаем с нуля
        correctText.style.transition = "opacity 0.5s ease-in"; // Плавное появление
        
        setTimeout(() => {
            correctText.style.opacity = "1"; // Появление
        }, 50);

        setTimeout(() => {
            const currentPuzzle = document.getElementById(currentPuzzleId);
            const nextPuzzle = document.getElementById(nextPuzzleId);

            if (currentPuzzle) {
                currentPuzzle.style.transition = "opacity 1.5s ease-out";
                currentPuzzle.style.opacity = "0";

                setTimeout(() => {
                    currentPuzzle.style.display = "none";

                    if (nextPuzzle) {
                        nextPuzzle.style.display = "flex";
                        nextPuzzle.style.opacity = "0";
                        nextPuzzle.style.transition = "opacity 1.5s ease-in";

                        setTimeout(() => {
                            nextPuzzle.style.opacity = "1";
                        }, 100);
                    }
                }, 1500);
            }
        }, 1000);

        // Change background color to yellow gradient on the third puzzle
        if (currentPuzzleId === 'puzzle2') {
            document.body.style.background = 'linear-gradient(to bottom, #FFAA01, #FFD401)';
        }
    } else {
        // Анимация плавного появления текста ошибки
        feedback.innerHTML = "<span class='incorrect-answer' style='color: #F62336;'>Incorrect answer</span>";
        
        const incorrectText = feedback.querySelector(".incorrect-answer");
        incorrectText.style.opacity = "0"; // Начинаем с нуля
        incorrectText.style.transition = "opacity 0.5s ease-in"; // Плавное появление
        
        setTimeout(() => {
            incorrectText.style.opacity = "1"; // Появление
        }, 50);
    }

    // For the 4th puzzle, log the answer in the console
    if (currentPuzzleId === 'puzzle3') {
        console.log("The secret answer is: console");
    }
}