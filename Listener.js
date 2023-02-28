/*****************************************************************************************************************************************
 * Listener for a key press
 ****************************************************************************************************************************************/
function moveCharacterBlockLeft() {
  const eCharacter = document.getElementById("charactersContainer");
  const eCurrentCharacter = document.getElementById(gsCurrentCharacterId);


  const isCurrentWhiteSpace = eCurrentCharacter.innerHTML === gsWhiteSpaceSpecialCharacter;

  let isNextWhiteSpace = false;
  if ((eCurrentCharacter.innerHTML !== gsNewLineSpecialCharacter) &&
      (giKeyDownEventCounter < arNewElements.length)) {
    eNextCharacter = arNewElements[giKeyDownEventCounter + 1];
    isNextWhiteSpace = eNextCharacter.innerHTML === gsWhiteSpaceSpecialCharacter;
  }

  const iCurrentCharacterWidth = isCurrentWhiteSpace ? giCharacterWhiteSpaceDivWidth : giCharacterDivWidth;
  const iNextCharacterWidth = isNextWhiteSpace ? giCharacterWhiteSpaceDivWidth : giCharacterDivWidth;

  const iMovingDistance = (iCurrentCharacterWidth / 2) + (iNextCharacterWidth / 2);

  // Aktuelle Position
  const iPropertyLeft = parseInt(
    window.getComputedStyle(eCharacter).getPropertyValue("left")
  );

  // Verschieben um Hälfte des linken Zeichens
  // um Hälfte des rechten Zeichens
  // um Letter Abstände
  eCharacter.style.left =
    iPropertyLeft - iMovingDistance +
    "px";
}

/**
 * Gets called when the user presses the right key
 */
function correctKeyInput(sCurrentCharacter) {
  console.log("correct character");

  const eCharacter = document.getElementById("charactersContainer");

  // Remove, damit letzte Transition sofort beendet wird
  eCharacter.classList.remove('MoveToLeftTransition');

  // Wenn Enter gedrückt wurde fängt alles von vorne an
  if (sCurrentCharacter === gsNewLineSpecialCharacter) {
    generateCharacterBlock();
    return;
  }

  moveCharacterBlockLeft();

  // Neue Transition soll beginnen
  eCharacter.classList.add('MoveToLeftTransition');

  setCurrentCharacter(giKeyDownEventCounter);

  // In the end we need to reference the next current character
  ++giKeyDownEventCounter;
}

/**
 * Gets called when the user presses the wrong key
 */
function wrongKeyInput() {
  console.log("wrong character");
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

  const eCharacter = document.getElementById(gsCurrentCharacterId);
  const sCurrentCharacter = eCharacter.innerHTML;

  if (translateTextToHtml(keyDownEvent.key) == sCurrentCharacter) {
    correctKeyInput(sCurrentCharacter);
  } else {
    wrongKeyInput();
  }
});
