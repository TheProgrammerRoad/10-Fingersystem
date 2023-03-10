/**************************************************************************************************************************************
 * Global Variables
 ***************************************************************************************************************************************/

/***********************************************************************************************/
// Html 
const gsNewLineSpecialCharacter = "\u21B5";
const gsWhiteSpaceSpecialCharacter = "&nbsp;";

/***********************************************************************************************/
// Global Game
let gbGameFinished = false;
let giCorrectCharacterInputCounter = 0; /* Zähler der korrekten Eingaben. Es gilt immer giCorrectCharacterInputCounter < giMaxCharacter - 1 */

/***********************************************************************************************/
// Array of Characters
let arNewElements = []; /* Hier werden die neuen Element zwischen gespeichert*/

/***********************************************************************************************/
// Characters Numbers
const giMaxCharacters = 120; /* Die maximale Anzahl an Characters bevor eine neue Zeit gestoppt wird*/
const giCharacterBlockSizeMax = 50; /*Maximale Anzahl an Zeichen bis zum ersten 'Enter' Symbol*/

/***********************************************************************************************/
// Current Character Position in Array
let giCurrentPosition = 0; /* Die aktuelle Position im Character Array. Wird auf 0 zurückgesetzt, wenn das Entersymbol korrekt eingegeben wurde*/

/***********************************************************************************************/
// Layout-Position Values
const giCharactersStartTop = 50;
const giCharactersStartleft = 50;
const giCharactersStartTransformY = -40;
const giCharacterDivWidth = 32; /* Für Whitespaces ist die Breite größer, siehe unten. Es muss giCharacterDivWidth % 2 === 0 gelten*/
const giCharacterWhiteSpaceDivWidth = 50; /* Breite des Current Character für Whitespaces. Es muss giCharacterWhiteSpaceDivWidth % 2 === 0 gelten */

/***********************************************************************************************/
// Timer Time
let gbTimerRunning = false;

// Mouse Moves
let gMouseMoverTimer = null;

/***********************************************************************************************/
// Settings

/***********************************************************************************************/
// Class and ID Names that are used often
const gsCLASSCurrentCharacter = "CurrentCharacter";
const gsCLASSCharactersContainer = "CharactersContainer";
const gsIDCurrentCharacter = "currentCharacter";
const gsIDCharactersContainer = "charactersContainer";
const gsIDTerminateDiv = "terminateDiv";
const gsIDSettingsIcon = "settingsIcon";
const gsIDSettings = "settings";

/***********************************************************************************************/
// All the Characters that get displayed as Random Character
const gCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
  "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
  "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
  "ß", "!", "$", "%", "&", "/", "(", ")", "=", "?", ",", ".", "-", ";", ":", "_", "#", "'", "~", "|", "@", "{",
  "}", "[", "]", "\\", "\n", "\n" /*double the propability of the new line character by adding it twice*/];
