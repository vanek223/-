const startButton = document.getElementById('startButton');
const nextButton = document.getElementById('nextButton');
const loveButton = document.getElementById('loveButton');
const messageBox = document.getElementById('messageBox');
const textContainer = document.getElementById('textContainer');
const finalMessage = document.getElementById('finalMessage');
const heartFireworks = document.getElementById('heartFireworks');

const loveLines = [
  'моя любимая девочка, ты самая лучашя девушка в мире солнце',
  'ты моя радость и счастье, моя любовь и вдохновение',
  'и ты тот самый лучик солнца в самые темные дни',
  'и я благодарю судьбу, что она подарила мне тебя',
  'ты моя любовь котик знай это'
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let isSequenceRunning = false;

startButton.addEventListener('click', async () => {
  if (isSequenceRunning) return;
  isSequenceRunning = true;

  startButton.classList.add('hidden');
  messageBox.classList.remove('hidden');
  messageBox.classList.remove('final-stage');
  finalMessage.classList.add('hidden');
  nextButton.classList.add('hidden');
  loveButton.classList.add('hidden');
  textContainer.classList.remove('fade-out');
  textContainer.innerHTML = '';
  heartFireworks.innerHTML = '';

  for (let i = 0; i < loveLines.length; i += 1) {
    const line = document.createElement('p');
    line.className = 'message-line';
    line.textContent = loveLines[i];
    textContainer.appendChild(line);
    await delay(500 + i * 260);
  }

  nextButton.classList.remove('hidden');
  nextButton.disabled = false;
});

nextButton.addEventListener('click', async () => {
  if (nextButton.disabled) return;
  nextButton.disabled = true;
  nextButton.classList.add('hidden');

  textContainer.classList.add('fade-out');
  await delay(500);

  messageBox.classList.add('final-stage');
  finalMessage.classList.remove('hidden');
  createHeartFireworks();

  await delay(1200);
  loveButton.classList.remove('hidden');
  loveButton.disabled = false;
});

loveButton.addEventListener('click', async () => {
  if (loveButton.disabled) return;
  loveButton.disabled = true;
  loveButton.classList.add('pressed');
  finalMessage.classList.add('pulse');

  const finalText = document.querySelector('.final-text');
  if (finalText) {
    finalText.classList.add('fade-out');
  }

  for (let i = 0; i < 7; i += 1) {
    createHeartFireworks();
    await delay(500);
  }

  if (finalText) {
    finalText.textContent = 'в этот праздник я дарю тебе весь этот мир, он твой';
    finalText.classList.remove('fade-out');
  }

  loveButton.textContent = 'Люблю тебя';
});

function createHeartFireworks() {
  const burstCount = 32;
  heartFireworks.innerHTML = '';

  for (let i = 0; i < burstCount; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'burst-heart';

    const angle = (Math.PI * 2 * i) / burstCount;
    const distance = 52 + Math.random() * 100;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const size = 12 + Math.random() * 18;

    heart.style.setProperty('--dx', `${x}px`);
    heart.style.setProperty('--dy', `${y}px`);
    heart.style.setProperty('--size', `${size}px`);
    heart.style.animationDelay = `${Math.random() * 180}ms`;

    heartFireworks.appendChild(heart);
  }
}
