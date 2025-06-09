// Function to generate a random number between min and max (inclusive)
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to return a rainbow color based on the number
export function getRainbowColor(num) {
  // Map numbers 1 through 9 to a set of rainbow-inspired colors
  const rainbowColors = {
    1: '#FF0000',   // Red
    2: '#FF7F00',   // Orange
    3: '#FFFF00',   // Yellow
    4: '#00FF00',   // Green
    5: '#0000FF',   // Blue
    6: '#4B0082',   // Indigo
    7: '#8F00FF',   // Violet
    8: '#FF1493',   // Deep Pink
    9: '#00CED1'    // Dark Turquoise
  };
  return rainbowColors[num] || '#FFFFFF';
}

// Map numbers to emoji digits for display
export function getEmojiNumber(num) {
  const emojiNumbers = {
    1: '1\uFE0F\u20E3', // 1️⃣
    2: '2\uFE0F\u20E3',
    3: '3\uFE0F\u20E3',
    4: '4\uFE0F\u20E3',
    5: '5\uFE0F\u20E3',
    6: '6\uFE0F\u20E3',
    7: '7\uFE0F\u20E3',
    8: '8\uFE0F\u20E3',
    9: '9\uFE0F\u20E3'
  };
  return emojiNumbers[num] || '?';
}

