const canvas = document.getElementById('signature-canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// Set up the pencil tool appearance
ctx.lineWidth = 3;          // Set the thickness of the pencil
ctx.lineCap = 'round';      // Create rounded line ends (mimics a pencil's drawing effect)
ctx.strokeStyle = '#000';   // Set the default pencil color to black

// Event listeners for drawing on the canvas (using the "pencil")
canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});

canvas.addEventListener('mouseup', () => (drawing = false));
canvas.addEventListener('mouseout', () => (drawing = false));

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
