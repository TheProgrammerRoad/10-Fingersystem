/******************************************************************************************************/
/* Key Pressed */
/******************************************************************************************************/
function moveCharacterBlockLeft() {
  const eCharacter = document.getElementById(gsIDCharactersContainer);
  const eCurrentCharacter = document.getElementById(gsIDCurrentCharacter);

  const isCurrentWhiteSpace =
    eCurrentCharacter.innerHTML === gsWhiteSpaceSpecialCharacter;

  let isNextWhiteSpace = false;
  if (
    eCurrentCharacter.innerHTML !== gsNewLineSpecialCharacter &&
    giCurrentPosition < arNewElements.length
  ) {
    eNextCharacter = arNewElements[giCurrentPosition + 1];
    isNextWhiteSpace =
      eNextCharacter.innerHTML === gsWhiteSpaceSpecialCharacter;
  }

  const iCurrentCharacterWidth = isCurrentWhiteSpace
    ? giCharacterWhiteSpaceDivWidth
    : giCharacterDivWidth;
  const iNextCharacterWidth = isNextWhiteSpace
    ? giCharacterWhiteSpaceDivWidth
    : giCharacterDivWidth;

  const iMovingDistance = iCurrentCharacterWidth / 2 + iNextCharacterWidth / 2;

  // Aktuelle Position
  const iPropertyLeft = parseInt(
    window.getComputedStyle(eCharacter).getPropertyValue("left")
  );

  // Verschieben um Hälfte des linken Zeichens
  // um Hälfte des rechten Zeichens
  // um Letter Abstände
  eCharacter.style.left = iPropertyLeft - iMovingDistance + "px";
}

/**
 * Gets called when the user presses the right key
 */
function correctKeyInput(sCurrentCharacter) {
  assert(
    giCorrectCharacterInputCounter < giMaxCharacters,
    "Mehr Eingabeninput als möglich"
  );
  ++giCorrectCharacterInputCounter;

  if (giCorrectCharacterInputCounter === giMaxCharacters) {
    terminate(giCorrectCharacterInputCounter === giMaxCharacters);
    return;
  }

  const eCharacter = document.getElementById(gsIDCharactersContainer);

  // Remove, damit letzte Transition sofort beendet wird
  eCharacter.classList.remove("MoveToLeftTransition");

  // Wenn Enter gedrückt wurde fängt alles von vorne an
  if (sCurrentCharacter === gsNewLineSpecialCharacter) {
    generateCharacterBlock();
    return;
  }

  moveCharacterBlockLeft();

  // Neue Transition soll beginnen
  eCharacter.classList.add("MoveToLeftTransition");

  setCurrentCharacter(giCurrentPosition);

  // In the end we need to reference the next current character
  ++giCurrentPosition;
}

/**
 * Gets called when the user presses the wrong key
 */
function wrongKeyInput() {
  assert(giCorrectCharacterInputCounter < giMaxCharacters, "wrongKeyInput Fehler");
  terminate(giCorrectCharacterInputCounter === giMaxCharacters /*Dieser Ausdruck wird immer false zurück geben, was auch richtig sein soll*/);
}

/**
 *
 * @param {*} sKey The key that was pressed
 * @returns true if the pressed key should be ignored (Shift, AltGr), false instead
 */
function ignoreKey(keyEvent) {
  if (keyEvent.key === "Shift") {
    return true;
  } else if (keyEvent.key === "Control") {
    return true;
  } else if (keyEvent.key === "AltGraph") {
    return true;
  }

  return false;
}

/**
 * Listening if a Key gets pressed (When key goes up)
 */
document.addEventListener("keydown", function (keyDownEvent) {
  if (keyDownEvent.defaultPrevented) {
    return;
  }

  if (ignoreKey(keyDownEvent)) return;

  // Soll das Spiel neu begonnen werden? Geht nur, wenn Spiel beendet wurde
  if ((translateTextToHtml(keyDownEvent.key) === gsNewLineSpecialCharacter) &&
    (Boolean(gbGameFinished))) {
    restartGame();
    return;
  }

  if (giCorrectCharacterInputCounter === 0)
    startTimer();

  const eCharacter = document.getElementById(gsIDCurrentCharacter);
  const sCurrentCharacter = eCharacter.innerHTML;

  if (translateTextToHtml(keyDownEvent.key) === sCurrentCharacter) {
    correctKeyInput(sCurrentCharacter);
  } else {
    wrongKeyInput();
  }
});





/******************************************************************************************************/
/* Mouse moves */
/******************************************************************************************************/
/**
 * Listener if mouse is currently moved
 */

document.addEventListener('mousemove', function () {

  // Wenn das Spiel gerade läuft, soll das Settings Icon nicht angezeigt werden
  if (gbTimerRunning) {
    return;
  }

  const eSettingsIcon = document.getElementById(gsIDSettingsIcon);

  eSettingsIcon.style.opacity = 1;
  clearTimeout(gMouseMoverTimer);
  gMouseMoverTimer = setTimeout(function () {
    eSettingsIcon.style.opacity = 0;
  }, 5000);
});





/******************************************************************************************************/
/* Click on Settings Icon */
/******************************************************************************************************/
document.getElementById(gsIDSettingsIcon).addEventListener('click', function () {
  // Nicht "klicken" können, wenn opacitiy 1 ist.
  if (parseInt(window.getComputedStyle(this).getPropertyValue("opacity")) === 0)
    return;



  // Settings reinsliden lassen
  const eSettings = document.getElementById(gsIDSettings);
  eSettings.style.top = this.classList.contains('clicked') ? '-240px' : '0';

  // Icon togglen. 
  // Am Ende togglen
  this.classList.toggle('clicked');
});