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
 *
 * @param {*} eElement Get the width of the element in pixels
 * @returns The width of the element in pixels
 */
function getCharacterWidth(sElement) {
  const eCharacter = document.getElementById("currentCharacter");

  const fontWeight = getCssStyle(eCharacter, "font-weight");
  const fontSize = getCssStyle(eCharacter, "font-size");
  const font = getCssStyle(eCharacter, "font");

  var measurer = document.createElement("div");
  measurer.style.visibility = "hidden";
  measurer.style.height = "auto";
  measurer.style.width = "auto";
  measurer.style.position = "absolute";
  measurer.style.whiteSpace = "pre";
  measurer.innerHTML = sElement;
  measurer.style.font = font;
  measurer.style.fontSize = fontSize;
  measurer.style.fontWeight = fontWeight;
  document.body.appendChild(measurer);

  const iCharacterWidth = Math.ceil(measurer.clientWidth);

  document.body.removeChild(measurer);

  return iCharacterWidth;
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
 *
 * @returns An array of random characters
 */
function buildCharacterBlock() {
  let resultCharacterBlock = [];

  let tempCharacterBlock = [];
  for (let i = 0; i < giCharacterBlockSizeMax; i++)
    tempCharacterBlock.push(getRandomCharacter());

  // change the last character to a new line
  tempCharacterBlock[tempCharacterBlock.length - 1] = gsNewLineSpecialCharacter;

  // The Enter symbol should be the last character.
  // The user should then hit the enter key
  // A new block of characters should be generated and displayed
  let iCutIndex = tempCharacterBlock.indexOf(gsNewLineSpecialCharacter);
  if (iCutIndex !== -1) tempCharacterBlock.splice(iCutIndex + 1);

  // Group three characters together
  let tempString = "";

  for (let iIndex = 0; iIndex < tempCharacterBlock.length; iIndex++) {
    if (iIndex % 3 === 0 && iIndex !== 0) {
      resultCharacterBlock.push(tempString);
      tempString = "";
    }
    tempString += tempCharacterBlock[iIndex];

    if (iIndex === tempCharacterBlock.length - 1 && tempString.length > 0)
      resultCharacterBlock.push(tempString);
  }

  return resultCharacterBlock;
}

/**
 * Sets a new block of characters to be displayed on the screen
 */
function setNewCharacterBlock() {
  let eCharacter = document.getElementById("currentCharacter");
  eCharacter.innerHTML = buildCharacterBlock().join(" ");

  const sCharacter = eCharacter.innerHTML;
  const iCharacterWidth = getCharacterWidth(
    sCharacter.charAt(giKeyUpEventCounter)
  );

  // initially move the container half the character width plus half the letter-spacing width to the left
  // so that current character is perfectly centered
  const iPropertyLeft = window
    .getComputedStyle(eCharacter)
    .getPropertyValue("left");

  const iHalfCharacterWidth = Math.ceil(iCharacterWidth / 2);
  console.log("half-character width: " + iHalfCharacterWidth);

  const iLetterSpacing =
    parseInt(
      window.getComputedStyle(eCharacter).getPropertyValue("letter-spacing")
    ) || 0;
  console.log("letter-spacing: " + iLetterSpacing);

  eCharacter.style.left =
    parseInt(iPropertyLeft) - iHalfCharacterWidth - iLetterSpacing / 2 + "px";

  let iPropertyLeftNew = window
    .getComputedStyle(eCharacter)
    .getPropertyValue("left");

  console.log("left: " + iPropertyLeftNew);
}
