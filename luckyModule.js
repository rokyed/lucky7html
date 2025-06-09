// Function to generate a random number between min and max (inclusive)
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to return a rainbow color based on the number
export function getRainbowColor(num) {
  // Map numbers 1 through 13 to a set of rainbow-inspired colors
  const rainbowColors = {
    1: '#FF0000',   // Red
    2: '#FF7F00',   // Orange
    3: '#FFFF00',   // Yellow
    4: '#00FF00',   // Green
    5: '#0000FF',   // Blue
    6: '#4B0082',   // Indigo
    7: '#8F00FF',   // Violet
    8: '#FF1493',   // Deep Pink
    9: '#00CED1',   // Dark Turquoise
    10: '#FFD700',  // Gold
    11: '#00FF7F',  // Spring Green
    12: '#DC143C',  // Crimson
    13: '#1E90FF'   // Dodger Blue
  };
  return rainbowColors[num] || '#FFFFFF';
}

export const slotSymbols = [
  '🍒', // Cherry
  '🔔', // Bell
  '🍋', // Lemon
  '🍇', // Grapes
  '🍊', // Orange
  '7️⃣', // Number 7
  '💎', // Diamond
  '⭐', // Star
  '🍉', // Watermelon
  '🍀', // Four-leaf clover
  '🃏', // Joker
  '💰', // Money bag
  '🎰'  // Slot machine
];

// Map numbers to slot symbols for display
export function getEmojiNumber(num) {
  return slotSymbols[num - 1] || '?';
}

