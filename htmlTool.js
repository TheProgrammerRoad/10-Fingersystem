function translateTextToHtml(text) {
  if (text === "&") return "&amp;";
  else if (text === " ") return gsWhiteSpaceSpecialCharacter;
  else if (text === "Enter") return gsNewLineSpecialCharacter;
  return text;
}
