let timerId = null;
let startTime = 0;

/**
 * Startet den Timer bei 0
 */
function startTimer() {
  gbTimerRunning = true;
  const eMinutesDisplay = document.getElementById("minutes");
  const eSecondsDisplay = document.getElementById("seconds");
  const eMillisecondsDisplay = document.getElementById("milliseconds");

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
    eMinutesDisplay.textContent = minutes.toString().padStart(2, "0");
    eSecondsDisplay.textContent = seconds.toString().padStart(2, "0");
    eMillisecondsDisplay.textContent = milliseconds.toString().padStart(3, "0");
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

  const eMinutesDisplay = document.getElementById("minutes");
  const eSecondsDisplay = document.getElementById("seconds");
  const eMillisecondsDisplay = document.getElementById("milliseconds");

  eMinutesDisplay.innerHTML = "00";
  eSecondsDisplay.innerHTML = "00";
  eMillisecondsDisplay.innerHTML = "000";
}