import { getRandomNumber, getRainbowColor } from './luckyModule.js';

const playButton = document.getElementById('playButton');
const resultEl = document.getElementById('result');
// Get the inner container of each reel
const reelElements = [
  document.querySelector('#reel1 .reel-inner'),
  document.querySelector('#reel2 .reel-inner'),
  document.querySelector('#reel3 .reel-inner')
];

const itemHeight = 80; // height (px) of each number
const cycles = 3;      // full cycles of numbers (1 to 9) before stopping

/**
 * Animates a reel element by dynamically building its content and scrolling upward.
 * @param {HTMLElement} reelInner - The inner container for the reel.
 * @param {number} finalNumber - The final number (1-9) to stop on.
 */
function animateReel(reelInner, finalNumber) {
  // Build the reel content: full cycles (1-9) then a partial cycle ending with finalNumber.
  let contentHTML = '';
  for (let i = 0; i < cycles; i++) {
    for (let num = 1; num <= 9; num++) {
      contentHTML += `<div class="reel-number" style="color: ${getRainbowColor(num)};">${num}</div>`;
    }
  }
  // Append the final partial cycle (numbers 1 to finalNumber)
  for (let num = 1; num <= finalNumber; num++) {
    contentHTML += `<div class="reel-number" style="color: ${getRainbowColor(num)};">${num}</div>`;
  }
  reelInner.innerHTML = contentHTML;

  // Force a reflow so the browser registers the new content before animating.
  void reelInner.offsetWidth;

  // Total number of items in this reel.
  const totalItems = cycles * 9 + finalNumber;
  // Calculate the final offset so that the last item (the final number) is shown.
  const finalOffset = -((totalItems - 1) * itemHeight);

  // Apply the transform to animate the reel.
  reelInner.style.transform = `translateY(${finalOffset}px)`;
}

playButton.addEventListener('click', () => {
  playButton.disabled = true;
  // Clear any previous result.
  resultEl.textContent = '';

  // Generate final numbers for each reel.
  const finalNumbers = [
    getRandomNumber(1, 9),
    getRandomNumber(1, 9),
    getRandomNumber(1, 9)
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
    if (finalNumbers[0] === 7 && finalNumbers[1] === 7 && finalNumbers[2] === 7) {
      resultEl.textContent = 'Lucky Seven! You win!';
    } else {
      resultEl.textContent = 'Try again!';
    }

    playButton.disabled = false;
  }, 1500 + (reelElements.length - 1) * 200);
});

