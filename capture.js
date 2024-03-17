const video = document.getElementById('video');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const tCanvas = document.getElementById('canvas-output');
const tCtx = tCanvas.getContext('2d');

const click = document.getElementById('contract');
const capturedImg = document.getElementById('capturedImg');

const img = new Image();
img.src = './p400.png';

const sideImage = new Image();
sideImage.src = './logojbg.png';

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    video.srcObject = stream;
  })
  .catch(function (err) {
    console.error('Error accessing the webcam: ', err);
  });

video.addEventListener('loadedmetadata', function () {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
});

function draw() {
  // Clear canvas and draw video frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0);
  // drawRectangle(ctx);
  drawImage(
    ctx,
    () => {
      requestAnimationFrame(draw);
    },
    canvas
  );
}

function drawRectangle(ctx) {
  if (!ctx) return;
  const rectX = 10; // X coordinate of top-left corner of rectangle
  const rectY = 10; // Y coordinate of top-left corner of rectangle
  const rectWidth = 200; // Width of the rectangle
  const rectHeight = 150; // Height of the rectangle

  // Clear previous drawings
  // overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

  // Draw rectangle
  ctx.strokeStyle = 'red'; // Rectangle border color
  ctx.lineWidth = 2; // Border width
  ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
}

const drawImage = (ctx, drawCallback, canvas) => {
  const x = (canvas.width - img.width) / 2;
  const y = canvas.height - img.height;
  // Set the source of the image (replace 'image.png' with your PNG image file)

  // When the image has loaded, draw it onto the canvas
  // Clear any existing content on the canvas
  // Draw the image onto the canvas
  ctx.drawImage(img, x, y);
  drawCallback();
};

const drawSideImage = (ctx, drawCallback) => {
  // Set the source of the image (replace 'image.png' with your PNG image file)

  // When the image has loaded, draw it onto the canvas
  // Clear any existing content on the canvas
  // Draw the image onto the canvas
  console.log(tCanvas.width, 80);
  ctx.drawImage(sideImage, 0, 0, 100, 100);
  ctx.drawImage(sideImage, tCanvas.width - 100, 0, 100, 100);

  drawCallback();
};

click.addEventListener('click', () => {
  tCanvas.width = canvas.width;
  tCanvas.height = canvas.height;
  tCtx.drawImage(canvas, 0, 0);
  // drawRectangle(tCtx);

  drawSideImage(tCtx, () => {}, tCanvas);

  capturedImg.src = tCanvas.toDataURL('image/jpeg');
  capturedImg.style.display = 'block';
});

video.addEventListener('play', draw);
