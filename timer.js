let timerId = null;
let startTime = 0;

/**
 * Startet den Timer bei 0
 */
function startTimer() {
  gbTimerRunning = true;
  const minutesDisplay = document.getElementById("minutes");
  const secondsDisplay = document.getElementById("seconds");
  const millisecondsDisplay = document.getElementById("milliseconds");

  // Set Start Time to 0
  startTime = Date.now();

  // Update the timer display every millisecond
  timerId = setInterval(() => {
    // Calculate the elapsed time
    const elapsedTime = Date.now() - startTime;

    // Calculate the minutes, seconds, and milliseconds
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;

    // Display the minutes, seconds, and milliseconds
    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
    millisecondsDisplay.textContent = milliseconds.toString().padStart(3, "0");
  }, 1);
}

/**
 * Stoppt den aktuell laufenden Timer
 */
function stopTimer() {
  // Clear the interval timer
  clearInterval(timerId);

  gbTimerRunning = false;
}

/**
 * Setzt den Timer zurück und zeigt wieder 00min 00sek und 000ms an
 */
function resetTimer() {
  startTime = Date.now();

  const minutesDisplay = document.getElementById("minutes");
  const secondsDisplay = document.getElementById("seconds");
  const millisecondsDisplay = document.getElementById("milliseconds");

  minutesDisplay.innerHTML = "00";
  secondsDisplay.innerHTML = "00";
  millisecondsDisplay.innerHTML = "000";
}