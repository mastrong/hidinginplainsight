// import { initIntroModal } from './intro-modal.js';
// initIntroModal();

import scrollama from "https://cdn.skypack.dev/scrollama";

const scroller = scrollama();
const steps = document.querySelectorAll(".step");
const sidebarTitle = document.getElementById("sidebar-title");
let currentTitle = sidebarTitle.textContent;

scroller
  .setup({
    step: ".step",
    offset: 0.5
  })
  .onStepEnter(({ element }) => {
    const title = element.getAttribute("data-title")?.trim();
    if (title && title !== currentTitle) {
      sidebarTitle.textContent = title;
      currentTitle = title;
    }
    steps.forEach(step => step.classList.remove("is-active"));
    element.classList.add("is-active");
  });

// Module 2 LSB canvas toggle
function drawLSBImage(flip) {
  const canvas = document.getElementById('lsbCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const r = flip ? 145 : 144;
      ctx.fillStyle = `rgb(${r},144,144)`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  canvas.onclick = () => drawLSBImage(!flip);
}

// Module 3 embed binary
function drawPixels(bits) {
  const canvas = document.getElementById('embedCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const pxSize = 40;
  for (let i = 0; i < bits.length; i++) {
    const bit = bits[i];
    const r = 144 + parseInt(bit);
    ctx.fillStyle = `rgb(${r},144,144)`;
    ctx.fillRect(i * pxSize, 0, pxSize - 2, 40);
    ctx.fillStyle = '#F5F5F5';
    ctx.font = '12px monospace';
    ctx.fillText(`${r.toString(2).padStart(8, '0')}`, i * pxSize + 2, 30);
  }
}

// Module 4 live message
document.addEventListener('DOMContentLoaded', () => {
  // const canvas = document.getElementById('userCanvas');
  const input = document.getElementById('userMessage');
  const output = document.getElementById('binaryOutput');

  if (input && output) {
    input.addEventListener('input', () => {
      const msg = input.value.slice(0, 8);
      const binary = msg.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
      output.textContent = `${binary}`;
    });
  }
});

// RGB Sliders
const redRange = document.getElementById('redRange');
const greenRange = document.getElementById('greenRange');
const blueRange = document.getElementById('blueRange');

redRange.addEventListener('input', updateColors);
greenRange.addEventListener('input', updateColors);
blueRange.addEventListener('input', updateColors);

function updateColors() {
    const r = redRange.value;
    const g = greenRange.value;
    const b = blueRange.value;

    document.getElementById('redBox').setAttribute('fill', `rgb(${r},0,0)`);
    document.getElementById('greenBox').setAttribute('fill', `rgb(0,${g},0)`);
    document.getElementById('blueBox').setAttribute('fill', `rgb(0,0,${b})`);

    document.getElementById('redText').textContent = r;
    document.getElementById('greenText').textContent = g;
    document.getElementById('blueText').textContent = b;
}

// Pixel Grid
const grid = document.getElementById('grid');
const pixelSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 84.28 85">
  <g>
    <rect fill="#fff" stroke="#fff" stroke-width="3" x="1.5" y="1.5" width="81.28" height="82" rx="5" ry="5"/>
    <rect fill="#ec1e24" stroke="#fff" stroke-width="1.5" stroke-linejoin="round" x="4.99" y="3.31" width="24.77" height="78.38"/>
    <rect fill="#69bc45" stroke="#fff" stroke-width="1.5" stroke-miterlimit="10" x="29.76" y="3.31" width="24.77" height="78.38"/>
    <rect fill="#3853a3" stroke="#fff" stroke-width="1.5" stroke-linejoin="round" x="54.52" y="3.31" width="24.77" height="78.38"/>
  </g>
</svg>`;

for (let i = 0; i < 2500; i++) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = pixelSVG;
  grid.appendChild(wrapper.firstElementChild);
}