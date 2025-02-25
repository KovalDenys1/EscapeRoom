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
