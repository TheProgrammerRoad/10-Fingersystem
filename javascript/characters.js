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

  let eCharacters = document.getElementById(gsIDCharactersContainer);
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
    eCurrentElement.classList.add(gsCLASSCurrentCharacter);
    eCurrentElement.id = gsIDCurrentCharacter;
    return;
  }

  assert(iIndex === giCurrentPosition, "iIndex !== giCurrentPosition");

  eCurrentElement = arNewElements[iIndex];

  assert(
    eCurrentElement.id === gsIDCurrentCharacter,
    "eCurrentElement.id !== " + gsIDCurrentCharacter
  );

  eCurrentElement.id = "";
  eCurrentElement.classList.remove(gsCLASSCurrentCharacter);

  if (iIndex === arNewElements.length - 1) return;

  eNewCurrentElement = arNewElements[iIndex + 1];
  eNewCurrentElement.classList.add(gsCLASSCurrentCharacter);
  eNewCurrentElement.id = gsIDCurrentCharacter;
}

/**
 * Fügt dem CharacterContainer ein div hinzu, das ein whitespace enthält
 */
function insertWhiteSpace() {
  const eCharacters = document.getElementById(gsIDCharactersContainer);
  eNewElement = addCharacterContainer(
    eCharacters,
    gsWhiteSpaceSpecialCharacter
  );

  eNewElement.style.width = giCharacterWhiteSpaceDivWidth + "px";
  arNewElements.push(eNewElement);
}

function moveCharactersDivToStartPosition() {
  const eCharacters = document.getElementById(gsIDCharactersContainer);
  eCharacters.style.top = giCharactersStartTop + "vh";
  eCharacters.style.left = giCharactersStartleft + "vw";
  const pxHalfCharacterDivWidth = -(giCharacterDivWidth / 2) + "px";
  eCharacters.style.transform = `translate(${pxHalfCharacterDivWidth}, ${giCharactersStartTransformY}px)`;
}

/**
 * Setzt den Characters Div auf die Endposition
 */
function moveCharactersDivToEndPosition() {
  const eCharacters = document.getElementById(gsIDCharactersContainer);
  eCharacters.style.top = giCharactersStartTop + "vh";
  eCharacters.style.left = giCharactersStartleft + "vw";
  // reset any previously set transformations
  eCharacters.style.transform = "";

  const eTerminateDiv = document.getElementById(gsIDTerminateDiv);
  assert(eTerminateDiv, "Try to delete TerminateDiv failed");
  if (eTerminateDiv === null)
    return;

  const iTerminateWidth = parseInt(
    window.getComputedStyle(eTerminateDiv).getPropertyValue("width")
  );

  console.log("iTerminateWidth: " + iTerminateWidth);

  const pxHalfWidth = -(iTerminateWidth / 2) + "px";
  eCharacters.style.transform = `translate(${pxHalfWidth}, ${giCharactersStartTransformY}px)`;
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
 * Fügt den "Beendet" Div Container hinzu
 */
function addTerminateDiv(bGameFinished) {
  const eCharacters = document.getElementById(gsIDCharactersContainer);
  const eTerminateDiv = document.createElement("div");
  eTerminateDiv.setAttribute("id", gsIDTerminateDiv);

  if (Boolean(bGameFinished)) {
    eTerminateDiv.classList.add("FinishedWithoutErrorContainer");
    eTerminateDiv.innerHTML = "Beendet";
  }
  else {
    eTerminateDiv.classList.add("FinishedWithErrorContainer");
    eTerminateDiv.innerHTML = "Failed";
  }
  eCharacters.appendChild(eTerminateDiv);
}

/**
 * Beendet den aktuellen Lauf.
 * Sollte nur aufgerufen werden, wenn alle Zeichen korrekt eingegeben worden sind
 */
function terminate(bGameFinished) {
  stopTimer();

  giCurrentPosition = 0;
  clearElements();
  addTerminateDiv(bGameFinished);
  moveCharactersDivToEndPosition();

  gbGameFinished = true;

  console.log("Beendet");
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
    if (giCorrectCharacterInputCounter + arNewElements.length >= giMaxCharacters)
      break;

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

    const eCharacters = document.getElementById(gsIDCharactersContainer);
    arNewElements.push(addCharacterContainer(eCharacters, sRandomCharacter));
    ++iCharactersBeforeWhiteSpaceCounter;

    // Bei 'Enter' Symbol ist Charcter Block vollständig
    if (sRandomCharacter === gsNewLineSpecialCharacter) break;
  }

  setCurrentCharacter();
}

/**
 * Setzt das Spiel auf den Startzustand zurück
 */
function restartGame() {
  gbGameFinished = false;
  giCorrectCharacterInputCounter = 0;
  resetTimer();
  generateCharacterBlock();
}
