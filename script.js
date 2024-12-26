const canvas = document.getElementById('signature-canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// Set up the pencil tool appearance
ctx.lineWidth = 3;          // Set the thickness of the pencil
ctx.lineCap = 'round';      // Create rounded line ends (mimics a pencil's drawing effect)
ctx.strokeStyle = '#000';   // Set the default pencil color to black

// Helper function to get the canvas coordinates based on either mouse or touch event
function getCanvasCoordinates(e) {
  let rect = canvas.getBoundingClientRect();
  let x, y;
  
  if (e.touches) {
    // For touch events (mobile), use the first touch point
    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;
  } else {
    // For mouse events (desktop)
    x = e.offsetX;
    y = e.offsetY;
  }
  
  return { x, y };
}

// Mouse events for desktop devices
canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  const { x, y } = getCanvasCoordinates(e);
  ctx.beginPath();
  ctx.moveTo(x, y);
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    const { x, y } = getCanvasCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
});

canvas.addEventListener('mouseup', () => (drawing = false));
canvas.addEventListener('mouseout', () => (drawing = false));

// Touch events for mobile devices
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevent the default touch action (like scrolling)
  drawing = true;
  const { x, y } = getCanvasCoordinates(e);
  ctx.beginPath();
  ctx.moveTo(x, y);
});

canvas.addEventListener('touchmove', (e) => {
  if (drawing) {
    const { x, y } = getCanvasCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
});

canvas.addEventListener('touchend', () => (drawing = false));
canvas.addEventListener('touchcancel', () => (drawing = false));

// Clear the signature canvas
document.getElementById('clear-signature').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Handle form submission and conversion to image (PNG or JPG)
document.getElementById('signature-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Convert the canvas content to a PNG image
  const signatureData = canvas.toDataURL('image/png');

  // Create a temporary link to download the image
  const downloadLink = document.createElement('a');
  downloadLink.href = signatureData;

  // Set the download file name
  downloadLink.download = 'digital_signature.png'; // You can change the extension to `.jpg` for JPG format
  downloadLink.click();

  alert('Digital signature saved as PNG image!');
});
