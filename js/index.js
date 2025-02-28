  const dangerElement = document.querySelector(".danger");
  const dangerBtn = document.querySelector(".danger-btn");
  
  document.addEventListener("mousemove", (event) => {
      const btnRect = dangerBtn.getBoundingClientRect();
      const cursorX = event.clientX;
      const cursorY = event.clientY;
  
      if (
          cursorX >= btnRect.left &&
          cursorX <= btnRect.right &&
          cursorY >= btnRect.top &&
          cursorY <= btnRect.bottom
      ) {
          dangerElement.textContent = "Danger 100%";
      } else {
          const dx = Math.max(btnRect.left - cursorX, cursorX - btnRect.right, 0);
          const dy = Math.max(btnRect.top - cursorY, cursorY - btnRect.bottom, 0);
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          let percentage = Math.max(0, 99 - distance / 10); 
          dangerElement.textContent = `Danger ${Math.round(percentage)}%`;
      }
  });


  document.querySelector(".play-btn").addEventListener("click", () => {
    toggleElements(false); 
});

document.querySelector(".back-to-home").addEventListener("click", () => {
    toggleElements(true); 
});

function toggleElements(isReturning) {
    const elementsToHide = document.querySelectorAll(".background-text, .hero-name, .danger, .play-btn");
    const elementsToShow = document.querySelectorAll(".welcome-div");
    const specificImage = document.querySelector(".target-image");

    if (isReturning) {

        elementsToHide.forEach(element => {
            element.style.display = "block";
            element.style.opacity = "0";
            element.style.transition = "opacity 1s ease-in";
            
            setTimeout(() => {
                element.style.opacity = "1";
            }, 900);
        });

        if (specificImage) {
            specificImage.style.display = "block";
            specificImage.style.opacity = "0";
            specificImage.style.transition = "opacity 1.1s ease-in";

            setTimeout(() => {
                specificImage.style.opacity = "1";
            }, 100);
        }

        elementsToShow.forEach(element => {
            element.style.transition = "opacity 0.7s ease-out";
            element.style.opacity = "0";

            setTimeout(() => {
                element.style.display = "none";
            }, 700);
        });
    } else {
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

        if (specificImage) {
            setTimeout(() => {
                specificImage.style.transition = "opacity 1.1s ease-out";
                specificImage.style.opacity = "0";

                setTimeout(() => {
                    specificImage.style.display = "none";
                }, 1100);
            }, 300);
        }

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

    welcomeDiv.style.transition = "opacity 1s ease-out";
    welcomeDiv.style.opacity = "0";

    setTimeout(() => {
        welcomeDiv.style.display = "none"; 
        puzzleContainer.style.display = "block"; 
        puzzleContainer.style.opacity = "0"; 
        puzzleContainer.style.transition = "opacity 1s ease-in"; 

        setTimeout(() => {
            puzzleContainer.style.opacity = "1"; 
        }, 100);

        document.body.style.transition = "background 1s ease";
        document.body.style.background = "linear-gradient(to bottom, #013779, #016BC3)";
    }, 1400);
});



function checkAnswer(answerId, currentPuzzleId, nextPuzzleId) {
    const userAnswer = document.getElementById(answerId).value ? document.getElementById(answerId).value.toLowerCase() : document.getElementById(answerId).innerText.toLowerCase();
    let correctAnswer;

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
        correctText.style.opacity = "0"; 
        correctText.style.transition = "opacity 0.5s ease-in"; 
        
        setTimeout(() => {
            correctText.style.opacity = "1"; 
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

        
        if (currentPuzzleId === 'puzzle2') {
            setTimeout(() => {
                document.body.style.background = 'linear-gradient(to bottom, #FFAA01, #FFD401)';
            }, 2000);
        }        
    } else {
        
        feedback.innerHTML = "<span class='incorrect-answer' style='color: #F62336;'>Incorrect answer</span>";
        
        const incorrectText = feedback.querySelector(".incorrect-answer");
        incorrectText.style.opacity = "0"; 
        incorrectText.style.transition = "opacity 0.5s ease-in"; 
        
        setTimeout(() => {
            incorrectText.style.opacity = "1"; 
        }, 50);
    }

    if (currentPuzzleId === 'puzzle3') {
        console.log("The secret answer is: console");
    }
    if (currentPuzzleId === 'puzzle4') {
        setTimeout(() => {
            const finalDiv = document.createElement("div");
            finalDiv.classList.add("final-div");
            finalDiv.innerText = "Congratulations, you have completed all the puzzles! Now the robots will help you return to present time!";
            finalDiv.style.position = "fixed";
            finalDiv.style.top = "50%";
            finalDiv.style.left = "50%";
            finalDiv.style.transform = "translate(-50%, -50%)";
            finalDiv.style.padding = "20px";
            finalDiv.style.background = "rgba(20, 20, 20, 0.8)";
            finalDiv.style.color = "white";
            finalDiv.style.fontSize = "24px";
            finalDiv.style.borderRadius = "10px";
            finalDiv.style.textAlign = "center";
            finalDiv.style.zIndex = "1000";
            finalDiv.style.opacity = "0";
            finalDiv.style.transition = "opacity 1.5s ease-in";
    
            document.body.appendChild(finalDiv);
    
            setTimeout(() => {
                finalDiv.style.opacity = "1";
            }, 100);
        }, 2000);
    }
    
}


let aboutUsVisible = false; // Флаг, чтобы отслеживать состояние блока

document.querySelector("#about-us-link").addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение ссылки

    toggleAboutUs();
});

document.querySelector("#home").addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение ссылки

    if (aboutUsVisible) {
        toggleAboutUs(); // Возвращаемся к начальному состоянию
    }
});

function toggleAboutUs() {
    const backgroundText = document.querySelector(".background-text");
    const heroName = document.querySelector(".hero-name");
    const danger = document.querySelector(".danger");
    const img = document.querySelector("img");
    const playBtn = document.querySelector(".play-btn");
    const aboutUsDiv = document.querySelector(".about_us");

    const elementsToHide = [backgroundText, heroName, danger, img, playBtn];

    if (aboutUsVisible) {
        // Если about_us показан, скрываем его и показываем остальные элементы
        aboutUsDiv.style.transition = "opacity 1s ease-out";
        aboutUsDiv.style.opacity = "0";

        setTimeout(() => {
            aboutUsDiv.style.display = "none";

            elementsToHide.forEach(element => {
                element.style.display = "block";
                element.style.opacity = "0"; // Начинаем с нуля, чтобы анимация сработала
                setTimeout(() => {
                    element.style.transition = "opacity 1s ease-in";
                    element.style.opacity = "1"; // Плавное появление
                }, 100);
            });
        }, 1000);
    } else {
        // Если about_us скрыт, скрываем остальные элементы
        elementsToHide.forEach(element => {
            element.style.transition = "opacity 1s ease-out";
            element.style.opacity = "0";
        });

        setTimeout(() => {
            elementsToHide.forEach(element => {
                element.style.display = "none"; // Полностью скрываем
            });

            // Исправление бага: сначала ставим display, а потом меняем opacity с задержкой
            aboutUsDiv.style.display = "block";
            aboutUsDiv.style.opacity = "0";
            setTimeout(() => {
                aboutUsDiv.style.transition = "opacity 1s ease-in";
                aboutUsDiv.style.opacity = "1"; // Плавное появление блока
            }, 50); // Небольшая задержка, чтобы браузер успел применить display: block
        }, 1000);
    }

    aboutUsVisible = !aboutUsVisible; // Переключаем флаг
}