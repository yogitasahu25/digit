const canvas = document.getElementById('signature-canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let lastX, lastY;

ctx.lineWidth = 4;         // Set the thickness of the pencil
ctx.lineCap = 'round';     // Make lines rounded (this mimics pencil strokes)
ctx.strokeStyle = '#000';  // Set default pencil color (black)

// Adjust canvas size and scale based on device pixel ratio
function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;  // Get the device pixel ratio (DPR)
  const width = canvas.offsetWidth;  // Width of canvas on page
  const height = canvas.offsetHeight;  // Height of canvas

  canvas.width = width * ratio;
  canvas.height = height * ratio;

  ctx.scale(ratio, ratio);  // Scale canvas context to match the display's pixel ratio
}

// Helper function to get adjusted canvas coordinates
function getCanvasCoordinates(e) {
  let rect = canvas.getBoundingClientRect();
  let x, y;

  if (e.touches) {
    const touch = e.touches[0];  // Get the first touch point (mobile)
    x = (touch.clientX - rect.left) * (canvas.width / rect.width);
    y = (touch.clientY - rect.top) * (canvas.height / rect.height);
  } else {
    x = (e.offsetX) * (canvas.width / rect.width);  // Mouse input (desktop)
    y = (e.offsetY) * (canvas.height / rect.height);
  }

  return { x, y };
}

function startDrawing(e) {
  drawing = true;
  const { x, y } = getCanvasCoordinates(e);
  lastX = x;
  lastY = y;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);  // Begin path at the starting coordinates
}

function draw(e) {
  if (!drawing) return;
  
  const { x, y } = getCanvasCoordinates(e);
  ctx.lineTo(x, y);
  ctx.stroke();  // Draw the line
  
  lastX = x;
  lastY = y;
}

// Stop drawing
function stopDrawing() {
  drawing = false;
}

// Clear canvas on button click
document.getElementById('clear-signature').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Form submission logic for saving the signature
document.getElementById('signature-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const signatureData = canvas.toDataURL('image/png');  // Convert canvas content to PNG image
  
  const downloadLink = document.createElement('a');
  downloadLink.href = signatureData;
  downloadLink.download = 'digital_signature.png';
  downloadLink.click();
  
  alert('Digital signature saved as PNG image!');
});

// Handle mouse events (for desktops)
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Handle touch events (for mobile)
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();  // Prevent default touch actions
  startDrawing(e);
});
canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();  // Prevent default touch actions
  draw(e);
});
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

// Handle window resize event
window.addEventListener('resize', resizeCanvas);
resizeCanvas();  // Initial resize on page load

