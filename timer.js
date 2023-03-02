let timerId = null;
let startTime = 0;

function startTimer() {
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

function stopTimer() {
  // Clear the interval timer
  clearInterval(timerId);

  // Reset the start time
  startTime = 0;
}