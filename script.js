const display = document.getElementById("display");
const answer = document.getElementById("answer");
const resultDisplay = document.getElementById("resultDisplay");
const themeToggle = document.getElementById("themeToggle");
const copyBtn = document.getElementById("copyBtn");

// Live Clock
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
  document.getElementById('clock').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// Calculator Functions
function input(val) {
  display.value += val;
}

function displayanswer() {
  try {
    const result = eval(display.value);
    answer.value = result;
  } catch {
    answer.value = "Error";
  }
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function clearDisplay() {
  display.value = '';
  answer.value = '';
}

// Quadratic Solver
function openModal() {
  document.getElementById('quadraticModal').style.display = 'block';
}
function closeModal() {
  document.getElementById('quadraticModal').style.display = 'none';
}

function solveQuadratic() {
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const c = parseFloat(document.getElementById('c').value);

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    resultDisplay.value = "Invalid input";
    return;
  }

  const d = b * b - 4 * a * c;
  if (d > 0) {
    const r1 = (-b + Math.sqrt(d)) / (2 * a);
    const r2 = (-b - Math.sqrt(d)) / (2 * a);
    resultDisplay.value = `Roots: ${r1.toFixed(2)}, ${r2.toFixed(2)}`;
  } else if (d === 0) {
    const r = -b / (2 * a);
    resultDisplay.value = `Root: ${r.toFixed(2)}`;
  } else {
    const real = (-b / (2 * a)).toFixed(2);
    const imag = (Math.sqrt(-d) / (2 * a)).toFixed(2);
    resultDisplay.value = `Roots: ${real} ± ${imag}i`;
  }

  closeModal();
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
  const body = document.body;
  const isDark = body.classList.toggle('light-theme');
  body.classList.toggle('dark-theme', !isDark);
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Copy to Clipboard
copyBtn.addEventListener('click', () => {
  if (answer.value) {
    navigator.clipboard.writeText(answer.value);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy Result"), 1500);
  }
});

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById('quadraticModal');
  if (event.target === modal) {
    closeModal();
  }
};
