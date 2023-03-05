const efontSettingsSelect = document.getElementById('fontSettingsSelect');

// Get the available system fonts using the FontFace API
const fonts = [...document.fonts].map(font => font.family);

// Populate the select element with the system fonts
fonts.forEach(font => {
  const option = document.createElement('option');
  option.textContent = font;
  efontSettingsSelect.appendChild(option);
});