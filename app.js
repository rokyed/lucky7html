import { getRandomNumber, getRainbowColor, getEmojiNumber, slotSymbols } from './luckyModule.js';

const playButton = document.getElementById('playButton');
const resultEl = document.getElementById('result');
const creditsEl = document.getElementById('credits');

let credits = 100;
const costPerRound = 5;

// Array of winning combinations and the points they pay out
const winningCombinations = [
  { combo: [7, 7, 7], points: 100 },
  { combo: [6, 6, 6], points: 50 },
  { combo: [5, 5, 5], points: 40 },
  { combo: [4, 4, 4], points: 30 },
  { combo: [3, 3, 3], points: 20 },
  { combo: [2, 2, 2], points: 10 },
  { combo: [1, 2, 3], points: 5 }
];

function updateCreditsDisplay() {
  creditsEl.textContent = `Credits: ${credits}`;
}
// Get the inner container of each reel
const reelElements = [
  document.querySelector('#reel1 .reel-inner'),
  document.querySelector('#reel2 .reel-inner'),
  document.querySelector('#reel3 .reel-inner')
];

// Display starting credits
updateCreditsDisplay();

const numSymbols = slotSymbols.length;
const itemHeight = 80; // height (px) of each symbol
const cycles = 3;      // full cycles of symbols before stopping

/**
 * Animates a reel element by dynamically building its content and scrolling upward.
 * @param {HTMLElement} reelInner - The inner container for the reel.
 * @param {number} finalNumber - The final symbol index to stop on.
 */
function animateReel(reelInner, finalNumber) {
  // Build the reel content: full cycles of all symbols then a partial cycle ending with finalNumber.
  let contentHTML = '';
  for (let i = 0; i < cycles; i++) {
    for (let num = 1; num <= numSymbols; num++) {
      contentHTML += `<div class="reel-number" style="color: ${getRainbowColor(num)};">${getEmojiNumber(num)}</div>`;
    }
  }
  // Append the final partial cycle (numbers 1 to finalNumber)
  for (let num = 1; num <= finalNumber; num++) {
    contentHTML += `<div class="reel-number" style="color: ${getRainbowColor(num)};">${getEmojiNumber(num)}</div>`;
  }
  reelInner.innerHTML = contentHTML;

  // Force a reflow so the browser registers the new content before animating.
  void reelInner.offsetWidth;

  // Total number of items in this reel.
  const totalItems = cycles * numSymbols + finalNumber;
  // Calculate the final offset so that the last item (the final number) is shown.
  const finalOffset = -((totalItems - 1) * itemHeight);

  // Apply the transform to animate the reel.
  reelInner.style.transform = `translateY(${finalOffset}px)`;
}

playButton.addEventListener('click', () => {
  if (credits < costPerRound) {
    resultEl.textContent = 'Not enough credits!';
    return;
  }

  credits -= costPerRound;
  updateCreditsDisplay();

  playButton.disabled = true;
  // Clear any previous result.
  resultEl.textContent = '';

  // Generate final numbers for each reel.
  const finalNumbers = [
    getRandomNumber(1, numSymbols),
    getRandomNumber(1, numSymbols),
    getRandomNumber(1, numSymbols)
  ];

  // Reset all reels to starting position (translateY(0))
  reelElements.forEach(reelInner => {
    reelInner.style.transition = 'none';
    reelInner.style.transform = 'translateY(0)';
  });

  // Force reflow to ensure the reset is applied.
  void reelElements[0].offsetWidth;

  // Animate each reel with a slight cascading delay.
  reelElements.forEach((reelInner, index) => {
    // Ensure the transition is set for the spin animation.
    reelInner.style.transition = `transform 1.5s cubic-bezier(0.33, 1, 0.68, 1)`;
    // Delay each reel's start for a cascading effect.
    setTimeout(() => {
      animateReel(reelInner, finalNumbers[index]);
    }, index * 200); // 200ms delay between reels
  });

  // Check the win condition after the longest animation completes.
  setTimeout(() => {
    const win = winningCombinations.find(entry =>
      entry.combo.every((num, idx) => num === finalNumbers[idx])
    );

    if (win) {
      credits += win.points;
      resultEl.textContent = `You win ${win.points} credits!`;
    } else {
      resultEl.textContent = 'Try again!';
    }

    updateCreditsDisplay();
    playButton.disabled = credits < costPerRound;
  }, 1500 + (reelElements.length - 1) * 200);
});

