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
  eCharacterDiv.style.width = giCharacterDivWidth + "px";
  eCharacterDiv.classList.add("Character");

  eElement.appendChild(eCharacterDiv);

  return eCharacterDiv;
}

/**
 * Entfernt alle Element hinterlegt in arNewElements und
 * entfernt außerdem die Elemente aus dem Dokument.
 * Setzt den Zähler giCurrentPosition auf 0 zurück
 */
function clearElements() {
  giCurrentPosition = 0;

  let eCharacters = document.getElementById("charactersContainer");
  while (eCharacters.firstChild) {
    eCharacters.removeChild(eCharacters.firstChild);
  }

  arNewElements.length = 0;
}

/**
 * Setzt das Element, das das aktuelle Zeichen repräsentiert
 * @param iIndex Der Index des aktuellen Zeichens. Falls -1 wird das erste Zeichen aus arNewElements auf das currentElement gesetzt
 */
function setCurrentCharacter(iIndex = -1) {
  assert(arNewElements.length > 0, "arNewElements.length <= 0");
  assert(iIndex < giCharacterBlockSizeMax, "iIndex >= giCharacterBlockSizeMax");
  assert(iIndex < arNewElements.length, "iIndex >= arNewElements.length");
  if (iIndex >= arNewElements.length) return;

  if (iIndex === -1) {
    eCurrentElement = arNewElements[0];
    eCurrentElement.classList.add(gsCurrentCharacterClass);
    eCurrentElement.id = gsCurrentCharacterId;
    return;
  }

  assert(iIndex === giCurrentPosition, "iIndex !== giCurrentPosition");

  eCurrentElement = arNewElements[iIndex];

  assert(
    eCurrentElement.id === gsCurrentCharacterId,
    "eCurrentElement.id !== " + gsCurrentCharacterId
  );

  eCurrentElement.id = "";
  eCurrentElement.classList.remove(gsCurrentCharacterClass);

  if (iIndex === arNewElements.length - 1) return;

  eNewCurrentElement = arNewElements[iIndex + 1];
  eNewCurrentElement.classList.add(gsCurrentCharacterClass);
  eNewCurrentElement.id = gsCurrentCharacterId;
}

/**
 * Fügt dem CharacterContainer ein div hinzu, das ein whitespace enthält
 */
function insertWhiteSpace() {
  const eCharacters = document.getElementById("charactersContainer");
  eNewElement = addCharacterContainer(
    eCharacters,
    gsWhiteSpaceSpecialCharacter
  );

  eNewElement.style.width = giCharacterWhiteSpaceDivWidth + "px";
  arNewElements.push(eNewElement);
}

function moveCharactersDivToStartPosition() {
  const eCharacters = document.getElementById("charactersContainer");
  eCharacters.style.top = giCharactersStartTop + "vh";
  eCharacters.style.left = giCharactersStartleft + "vw";
  const pxHalfCharacterDivWidth = -(giCharacterDivWidth / 2) + "px";
  eCharacters.style.transform = `translate(${pxHalfCharacterDivWidth}, ${giCharactersStartTransformY}px)`;
}

/**
 * Hilfsfunktion
 * Bestimmt einen RandomCharacter oder gibt gsNewLineSpecialCharacter zurück
 * @returns Gibt einen Character zurück
 */
function computeNewCharacter() {
  // Das letzte Symbol soll immer 'Enter' sein
  return arNewElements.length === giCharacterBlockSizeMax - 1
    ? gsNewLineSpecialCharacter
    : getRandomCharacter();
}

/**
 * Sets a new block of characters to be displayed on the screen
 * Entfernt alle vorher existierenden Character Divs
 * Setzt den KeyUpCounter auf 0
 * Positioniert den Characters Div Container an die Startposition
 */
function generateCharacterBlock() {
  giCurrentPosition = 0;
  clearElements();
  moveCharactersDivToStartPosition();

  let iCharactersBeforeWhiteSpaceCounter = 0;
  for (iIndex = 0; arNewElements.length < giCharacterBlockSizeMax; iIndex++) {
    if (giCorrectCharacterInputCounter + arNewElements.length >= giMaxCharacters) break;
    const sRandomCharacter = computeNewCharacter();

    // Nach jedem dritten Zeichen ein Whitespace einfügen
    // Nur, wenn das aktuelle Zeichen keine 'Enter' Symbol ist
    if (
      sRandomCharacter !== gsNewLineSpecialCharacter &&
      iCharactersBeforeWhiteSpaceCounter % 3 === 0 &&
      iCharactersBeforeWhiteSpaceCounter !== 0
    ) {
      insertWhiteSpace();
      iCharactersBeforeWhiteSpaceCounter = 0;
      continue;
    }

    const eCharacters = document.getElementById("charactersContainer");
    arNewElements.push(addCharacterContainer(eCharacters, sRandomCharacter));
    ++iCharactersBeforeWhiteSpaceCounter;

    // Bei 'Enter' Symbol ist Charcter Block vollständig
    if (sRandomCharacter === gsNewLineSpecialCharacter) break;
  }

  setCurrentCharacter();
}
