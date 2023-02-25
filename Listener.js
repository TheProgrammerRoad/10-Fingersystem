/*****************************************************************************************************************************************
 * Listener for a key press
 ****************************************************************************************************************************************/
function moveCharacterBlockLeft() {
  const eCharacter = document.getElementById("currentCharacter");
  const sCharacter = eCharacter.innerHTML;

  //Zeichenbreite Linkes Zeichen
  const iCharacterWidthLeft = getCharacterWidth(
    sCharacter.charAt(giKeyUpEventCounter)
  );

  //Zeichenbreite Rechtes Zeichen
  const iCharacterWidthRight = getCharacterWidth(
    sCharacter.charAt(giKeyUpEventCounter + 1)
  );

  // Aktuelle Position
  const iPropertyLeft = parseInt(window
    .getComputedStyle(eCharacter)
    .getPropertyValue("left"));

  // Letter Abstände beachten
  const iLetterSpacing =
    parseInt(
      window.getComputedStyle(eCharacter).getPropertyValue("letter-spacing")
    ) || 0;

  // Jeweils die Hälften der Zeichenbreite bestimmen
  const iHalfCharacterWidthLeft = Math.ceil(iCharacterWidthLeft / 2);
  const iHalfCharacterWidthRight = Math.ceil(iCharacterWidthRight / 2);

  // Verschieben um Hälfte des linken Zeichens
  // um Hälfte des rechten Zeichens
  // um Letter Abstände
  eCharacter.style.left =
    iPropertyLeft -
    iHalfCharacterWidthLeft -
    iLetterSpacing -
    iHalfCharacterWidthRight +
    "px";
}

/**
 * Gets called when the user presses the right key
 */
function correctKeyInput() {
  console.log("correct character");
  moveCharacterBlockLeft();

  // In the end we need to reference the next current character
  ++giKeyUpEventCounter;
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
document.addEventListener("keyup", function (event) {
  if (event.defaultPrevented) {
    return;
  }

  if (ignoreKey(event)) return;

  const eCharacter = document.getElementById("currentCharacter");
  const sCharacter = eCharacter.innerHTML;

  if (event.key === sCharacter.charAt(giKeyUpEventCounter)) {
    correctKeyInput();
  } else {
    wrongKeyInput();
  }
});
