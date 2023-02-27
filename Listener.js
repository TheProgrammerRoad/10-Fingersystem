/*****************************************************************************************************************************************
 * Listener for a key press
 ****************************************************************************************************************************************/
function moveCharacterBlockLeft() {
  const eCharacter = document.getElementById("charactersContainer");

  // Aktuelle Position
  const iPropertyLeft = parseInt(
    window.getComputedStyle(eCharacter).getPropertyValue("left")
  );

  // Verschieben um Hälfte des linken Zeichens
  // um Hälfte des rechten Zeichens
  // um Letter Abstände
  /* getComputedStyle(document.documentElement).getPropertyValue('--pxCharacterWidth') */
  eCharacter.style.left =
    iPropertyLeft - giCharacterDivWidth +
    "px";
}

/**
 * Gets called when the user presses the right key
 */
function correctKeyInput(sCurrentCharacter) {
  console.log("correct character");

  // Wenn Enter gedrückt wurde fängt alles von vorne an
  if (sCurrentCharacter === gsNewLineSpecialCharacter) {
    generateCharacterBlock();
    return;
  }

  moveCharacterBlockLeft();

  setCurrentCharacter(giKeyUpEventCounter);

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
 * Überprüft, ob die Eingabe in keyUpEvent gleich sCurrentCharacter ist
 * @param {*} keyUpEvent Das KeyUpEvent
 * @param {*} sCurrentCharacter Der Wert, den der KeyUpEvent darstellt sollte
 * @returns true, wenn KeyUpEvent den Wert aus sCurrentCharacter darstellt, sonst false
 */
function isKeyAndCurrentCharacterSame(keyUpEvent, sCurrentCharacter) {
  if (gAltGrCharacters.includes(sCurrentCharacter)) {
    if (keyUpEvent.getModifierState("AltGraph")) {
      if (sCurrentCharacter === "{" && keyUpEvent.key === "7") return true;
      if (sCurrentCharacter === "}" && keyUpEvent.key === "0") return true;
      if (sCurrentCharacter === "[" && keyUpEvent.key === "8") return true;
      if (sCurrentCharacter === "]" && keyUpEvent.key === "9") return true;
      if (sCurrentCharacter === "\\" && keyUpEvent.key === "ß") return true;
      if (sCurrentCharacter === "@" && keyUpEvent.key === "q") return true;
      if (sCurrentCharacter === "~" && keyUpEvent.key === "+") return true;
      if (sCurrentCharacter === "|" && keyUpEvent.key === "<") return true;
    }
    return false;
  }

  return translateTextToHtml(keyUpEvent.key) == sCurrentCharacter;
}

/**
 * Listening if a Key gets pressed (When key goes up)
 */
document.addEventListener("keyup", function (event) {
  if (event.defaultPrevented) {
    return;
  }

  if (ignoreKey(event)) return;

  const eCharacter = document.getElementById(gsCurrentCharacterId);
  const sCharacter = eCharacter.innerHTML;

  if (isKeyAndCurrentCharacterSame(event, sCharacter)) {
    correctKeyInput(sCharacter);
  } else {
    wrongKeyInput();
  }
});
