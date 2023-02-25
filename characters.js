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
 * Adds a <span> Element to the Characters Container
 */
function addCharacterDivElementToCharactersContainer(eElement, sCharacter) {
  const eCharacterDiv = document.createElement("div");
  eCharacterDiv.innerHTML = sCharacter;
  eCharacterDiv.classList.add('Character');

  eElement.appendChild(eCharacterDiv);
}

/**
 * Sets a new block of characters to be displayed on the screen
 */
function generateCharacterBlock() {
  for (iCounter = 0; iCounter < giCharacterBlockSizeMax; iCounter++) {
    const eCharacters = document.getElementById("charactersContainer");
    addCharacterDivElementToCharactersContainer(eCharacters, getRandomCharacter());
  }
}
