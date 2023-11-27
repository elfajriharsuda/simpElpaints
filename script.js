const colorPicker = document.getElementById('colorPicker');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let isDrawing = false;
let currentColor = 'black';
let lastX = 0;
let lastY = 0;

const getCanvasMousePosition = (event) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
};

const clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

colorPicker.addEventListener('change', () => {
  currentColor = colorPicker.value;
});

document.getElementById('clearButton').addEventListener('click', clearCanvas);

function startDrawing(event) {
  isDrawing = true;
  const { x, y } = getCanvasMousePosition(event);
  lastX = x;
  lastY = y;
}

function draw(event) {
  if (!isDrawing) return;

  const { x, y } = getCanvasMousePosition(event);
  
  context.lineWidth = 5;
  context.lineCap = 'round';
  context.strokeStyle = currentColor;

  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(x, y);
  context.stroke();

  lastX = x;
  lastY = y;
}

function stopDrawing() {
  isDrawing = false;
}
