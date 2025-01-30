export const getCountryFlag = (code) => {
  try {
    const countryCode = code.slice(0, 2).toUpperCase();
    const OFFSET = 127397; // This is the ASCII offset for regional indicator symbols
    const firstChar = countryCode.charCodeAt(0) + OFFSET;
    const secondChar = countryCode.charCodeAt(1) + OFFSET;
    return String.fromCodePoint(firstChar) + String.fromCodePoint(secondChar);
  } catch (error) {
    return '🌐'; // fallback icon
  }
};
