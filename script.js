import scrollama from "https://cdn.skypack.dev/scrollama";
// Dynamically load BeerSlider UMD bundle

const scroller = scrollama();
const steps = document.querySelectorAll(".step");

const input = document.getElementById('userMessage');
const output = document.getElementById('binaryOutput');

let currentTitle = '';

// BeerSlider instantiation
const lsbEl = document.getElementById('lsb_slider');
const msbEl = document.getElementById('msb_slider');
const lsbSlider = new BeerSlider(document.getElementById('lsb_slider'));
const msbSlider = new BeerSlider(document.getElementById('msb_slider'));

// Force beerslider start at 10%
setTimeout(() => {
    document.querySelector('#lsb_slider .beer-handle').style.left = '10%';
    document.querySelector('#lsb_slider .beer-reveal').style.width = '10%';

    document.querySelector('#msb_slider .beer-handle').style.left = '10%';
    document.querySelector('#msb_slider .beer-reveal').style.width = '10%';
}, 0);

// Rest of your setup code...
if (input && output) {
  input.addEventListener('input', () => {
    const msg = input.value.slice(0, 50);
    const binary = msg.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    output.textContent = `${binary}`;
  });
}
function updateSidebar(title, subtitle) {
  const titleEl = document.getElementById('sidebar-title');
  const subtitleEl = document.getElementById('sidebar-subtitle');

  if (!titleEl || !subtitleEl) return;

  titleEl.textContent = title;
  subtitleEl.textContent = subtitle;

  // Responsive style switching
  if (window.innerWidth < 768) {
    titleEl.classList.remove('fs-1');
    titleEl.classList.add('fs-5');
    subtitleEl.classList.remove('fs-4');
    subtitleEl.classList.add('fs-6');
  } else {
    titleEl.classList.remove('fs-5');
    titleEl.classList.add('fs-1');
    subtitleEl.classList.remove('fs-6');
    subtitleEl.classList.add('fs-4');
  }
}

scroller
  .setup({
    step: ".step",
    offset: 0.45,
      // debug: true
  })
  .onStepEnter(({ element }) => {
      console.log("STEP ENTER:", element.dataset.title);
    const title = element.getAttribute("data-title")?.trim();
    const subtitle = element.getAttribute("data-sub")?.trim();

    if (title || subtitle) {
      updateSidebar(title || '', subtitle || '');
      currentTitle = subtitle || title;
    }

    steps.forEach(step => step.classList.remove("is-active"));
    element.classList.add("is-active");
  });

// CONTENT LOADED
window.addEventListener('DOMContentLoaded', function() {
  var titles = document.getElementById('titles');
  var scrolly = document.getElementById('scrolly');
  scrolly.style.marginTop = titles.offsetHeight *2 + 'px';
});

// RESIZING
window.addEventListener('resize', () => {
    // update titles
  updateSidebar(currentTitle, currentTitle);  // both title and subtitle for consistency

    // update offset
  var titles = document.getElementById('titles');
  var scrolly = document.getElementById('scrolly');
  scrolly.style.marginTop = titles.offsetHeight + 'px';
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

    document.getElementById('slider_bit').setAttribute('fill',`rgb(${r},${g},${b})`);
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


// Image swaps
function flipImage(img, flippedSrc, originalSrc) {
  img.classList.add('flip-animation');

  // Toggle the src
  img.src = img.src.includes(flippedSrc) ? originalSrc : flippedSrc;

  // Remove the animation class after it's done so it can replay on next click
  setTimeout(() => {
    img.classList.remove('flip-animation');
  }, 400);
}

const lsb = document.getElementById('lsb_flip');
const msb = document.getElementById('msb_flip');

lsb.addEventListener('click', () => {
  flipImage(lsb, 'lsb_flipped_large.png', 'original_large.png');
});

msb.addEventListener('click', () => {
  flipImage(msb, 'msb_flipped_large.png', 'original_large.png');
});

// Links open in new windows
document.querySelectorAll('a[href]').forEach(link => {
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
});


function getRandomBinaryString(length) {
    let s = '';
    for (let i = 0; i < length; i++) {
        s += Math.random() > 0.5 ? '1' : '0';
        // Add a space every 8 digits for effect
        if ((i + 1) % 8 === 0) s += ' ';
    }
    return s;
}

function createBinaryLine(width) {
    // Estimate the number of digits needed based on width
    const digits = Math.ceil(width / 11); // Roughly 1ch per digit+space
    const binary = getRandomBinaryString(digits);
    const line = document.createElement('div');
    line.textContent = binary;
    line.style.position = 'absolute';
    line.style.whiteSpace = 'nowrap';
    line.style.fontFamily = 'monospace';
    line.style.fontSize = '20px';
    // line.style.opacity = (Math.random() * 0.3 + 0.08).toFixed(2); // 0.08–0.38
    line.style.opacity = (Math.random() * 0.11 + 0.04).toFixed(2); // 0.04–0.15
    line.style.color = 'white';
    line.style.left = '100%'; // Start just outside right edge
    // Random vertical position within header
    // const top = Math.random() * 500;
    const top = Math.random() * window.innerHeight;
    line.style.top = `${top}px`;
    // Animation duration
    const duration = (Math.random() * 10 + 10).toFixed(1); // 10–20s
    line.style.transition = `transform ${duration}s linear`;
    // Animate after insertion
    setTimeout(() => {
        line.style.transform = `translateX(-${width + 400}px)`; // Fly fully to left
    }, 50);

    // Remove after animation completes
    setTimeout(() => {
        line.remove();
    }, duration * 1000 + 100);

    return line;
}

function spawnBinaryLines() {
    const container = document.getElementById('binary-bg');
    const width = container.offsetWidth || window.innerWidth;
    // Spawn new line every 700ms
    setInterval(() => {
        const line = createBinaryLine(width);
        container.appendChild(line);
    }, 1200);
}

// Start after DOM loads
window.addEventListener('DOMContentLoaded', spawnBinaryLines);

