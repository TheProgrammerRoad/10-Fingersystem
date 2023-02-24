/** * Todo
 *
 * Version 2
 * 
 * Include transition: I think I need to use translateX instead of left = ...
 *
 * A Enter hit doesn't get recognized as correct. Also it starts with &. What happens currently if the current character is coincidently & too?
 *
 * There should at least three characters displayed not only the enter symbol or two more. At least three 'normal' characters
 *
 * Setup Git so that I have a file control system. With this I can make tags.
 *
 * Change Prettier settings. I don't like when the array gets formatted like this, see below
 *
 * Highlight the current character. Maybe give the current character a bigger font size
 *
 * Use different font-family, what is the difference?
 * 
 * Ich glaube beim Verschieben ist das '/ 2' ein Problem, da sich das häuft und dadurch zu weit nach rechts driftet
 *
 */

/*****************************************************************************************************************************************
 * All the character stuff
 ****************************************************************************************************************************************/

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

/**
 * The Start of the script
 */

function start() {
  setNewCharacterBlock();
}

start();
