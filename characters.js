/**
 *
 * @param {*} element The element to get the css style from
 * @param {*} prop the property to get the value of
 * @returns The Css Style of the specified property
 */
function getCssStyle(element, prop) {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}

/**
 * Choses a random character from the characters array
 * @returns a random character from the characters array
 */
function getRandomCharacter() {
  let sRandomCharacter =
    gCharacters[Math.floor(Math.random() * gCharacters.length)];

  // Concert the new line symbol to a printable character
  if (sRandomCharacter === "\n") {
    sRandomCharacter = gsNewLineSpecialCharacter;
  }
  return sRandomCharacter;
}

/**
 * Fügt dem Element eElement ein Div hinzu, dass den Inhalt sCharacter hat
 * @param {*} eElement Das Element zu dem das div hinzugefügt werden soll
 * @param {*} sCharacter Der Inhalt, den das neue Element haben soll
 * @returns Das neue Element
 */
function addCharacterContainer(eElement, sCharacter) {
  const eCharacterDiv = document.createElement("div");
  eCharacterDiv.innerHTML = sCharacter;
  eCharacterDiv.classList.add("Character");

  eElement.appendChild(eCharacterDiv);

  return eCharacterDiv;
}

/**
 * Sets a new block of characters to be displayed on the screen
 */
function generateCharacterBlock() {
  for (iIndex = 0; iIndex < giCharacterBlockSizeMax; iIndex++) {
    const eCharacters = document.getElementById("charactersContainer");

    // Das letzte Symbol soll immer 'Enter' sein
    const sRandomCharacter =
      iIndex === giCharacterBlockSizeMax - 1
        ? gsNewLineSpecialCharacter
        : getRandomCharacter();

    // 'Enter' soll das letzte Symbol sein
    if (sRandomCharacter !== gsNewLineSpecialCharacter) {
      if (iIndex % 3 === 0 && iIndex !== 0) {
        addCharacterContainer(eCharacters, "&nbsp;");
      }
    }

    eNewElement = addCharacterContainer(eCharacters, sRandomCharacter);
    if (iIndex % 2 === 0) {
      eNewElement.style.backgroundColor = "lightblue";
    }
    else {
      eNewElement.style.backgroundColor = "lightpink";
    }

    if (sRandomCharacter === gsNewLineSpecialCharacter)
      break;  
  }
}
