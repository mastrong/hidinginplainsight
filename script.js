import scrollama from "https://cdn.skypack.dev/scrollama";

const scroller = scrollama();
const steps = document.querySelectorAll(".step");
const sidebarTitle = document.getElementById("sidebar-title");
const sidebarSubTitle = document.getElementById("sidebar-subtitle");
let currentTitle = sidebarTitle.textContent;

scroller
  .setup({
    step: ".step",
    offset: 0.45,
      // debug: true
  })
  .onStepEnter(({ element }) => {
    const title = element.getAttribute("data-title")?.trim();
    if (title && title !== currentTitle) {
      sidebarTitle.textContent = title;
      currentTitle = title;
    }
    const subtitle = element.getAttribute("data-sub")?.trim();
    if (subtitle && subtitle !== currentTitle) {
      sidebarSubTitle.textContent = subtitle;
      currentTitle = subtitle;
    }
    steps.forEach(step => step.classList.remove("is-active"));
    element.classList.add("is-active");
  });


// Live input binary
document.addEventListener('DOMContentLoaded', () => {
  // const canvas = document.getElementById('userCanvas');
  const input = document.getElementById('userMessage');
  const output = document.getElementById('binaryOutput');

  if (input && output) {
    input.addEventListener('input', () => {
      const msg = input.value.slice(0, 50);
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


// Initialize comparison sliders when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.comparison-slider');
  
  sliders.forEach(slider => {
    const before = slider.querySelector('.comparison-before');
    const handle = slider.querySelector('.comparison-slider-handle');
    const sliderLine = slider.querySelector('.slider-line');
    const sliderHandle = slider.querySelector('.slider-handle');
    let isDragging = false;
    
    // Update slider position
    const updateSlider = (value) => {
      const percent = Math.min(100, Math.max(0, value));
      before.style.width = `${percent}%`;
      
      // Update the position of the slider line and handle
      if (sliderLine) {
        sliderLine.style.left = `${percent}%`;
      }
      if (sliderHandle) {
        sliderHandle.style.left = `${percent}%`;
      }
      
      // Update the slider value
      if (handle) {
        handle.value = percent;
      }
    };
    
    // Handle input events from range input
    if (handle) {
      handle.addEventListener('input', (e) => {
        updateSlider(e.target.value);
      });
    }
    
    // Handle mouse/touch events for drag
    const startDragging = (e) => {
      isDragging = true;
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', stopDragging);
      document.addEventListener('touchmove', onDrag, { passive: false });
      document.addEventListener('touchend', stopDragging);
      e.preventDefault();
      updateSlider(getPosition(e));
    };
    
    const getPosition = (e) => {
      const rect = slider.getBoundingClientRect();
      let x = 0;
      
      if (e.type.includes('touch')) {
        x = e.touches[0].clientX - rect.left;
      } else {
        x = e.clientX - rect.left;
      }
      
      return (x / rect.width) * 100;
    };
    
    const onDrag = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      updateSlider(getPosition(e));
    };
    
    const stopDragging = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDragging);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', stopDragging);
    };
    
    // Add event listeners
    slider.addEventListener('mousedown', startDragging);
    slider.addEventListener('touchstart', startDragging, { passive: true });
    
    // Prevent image drag
    const images = slider.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });
    
    // Set initial position
    updateSlider(20);
  });
});


// Links open in new windows
document.querySelectorAll('a[href]').forEach(link => {
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
});
