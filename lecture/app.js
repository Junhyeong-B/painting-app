const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const INITIAL_BACKGROUND_COLOR = "#fff";

const canvas = document.querySelector("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext("2d");
ctx.lineWidth = 5;

let isPainting = false;
let isFillMode = false;

let restoreArray = [];
let index = -1;

const onMouseMove = (event) => {
  if (isPainting && isFillMode) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    return;
  }

  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
};

const onMouseDown = () => {
  if (isFillMode) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    return;
  }

  ctx.beginPath();
  isPainting = true;
};

const cancelPainting = (event) => {
  isPainting = false;
  ctx.closePath();

  event.preventDefault();

  if (event.type !== "mouseleave") {
    restoreArray.push(ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));
    index++;
  }
};

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

// range 버튼 - 굵기 지정
const lineWidth = document.getElementById("line-width");
const onLineWidthChange = (event) => {
  ctx.lineWidth = event.currentTarget.value;
};
lineWidth.addEventListener("change", onLineWidthChange);

// input color 버튼 - 라인 색상
const lineColor = document.getElementById("line-color");
const onLineColorChange = (event) => {
  ctx.strokeStyle = event.currentTarget.value;
  ctx.fillStyle = event.currentTarget.value;
};
lineColor.addEventListener("change", onLineColorChange);

// div color 버튼 - 라인 색상
const colorOption = document.getElementById("color-options");
const onColorOptionClick = (event) => {
  const { color } = event.target.dataset;
  if (!color) {
    return;
  }

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};
colorOption.addEventListener("click", onColorOptionClick);

// clear 버튼
const clearButton = document.getElementById("clear");
const clearCanvas = () => {
  ctx.fillStyle = INITIAL_BACKGROUND_COLOR;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  restoreArray = [];
  index = -1;
};
clearButton.onclick = clearCanvas;

// fill mode 버튼
const fillModeButton = document.getElementById("fill-mode");
fillModeButton.onclick = function () {
  if (isFillMode) {
    fillModeButton.innerText = "pencil";
  } else {
    fillModeButton.innerText = "fill";
  }

  isFillMode = !isFillMode;
};

// eraser 버튼
const eraserButton = document.getElementById("eraser");
eraserButton.onclick = function () {
  ctx.strokeStyle = "#fff";
  ctx.fillStyle = "#fff";
};

// undo 버튼
const undoButton = document.getElementById("undo");
undoButton.onclick = function () {
  if (index <= 0) {
    clearCanvas();
    return;
  }

  restoreArray.pop();
  index--;
  ctx.putImageData(restoreArray[index], 0, 0);
};

// image input
const imageInput = document.getElementById("image-file");
imageInput.onchange = function (event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    image.value = null;
  };
};

// text input
const textInput = document.getElementById("text-input");
const onDoubleClick = (event) => {
  if (!textInput.value) {
    return;
  }

  ctx.save();
  const text = textInput.value;
  ctx.lineWidth = 1;
  ctx.font = "48px serif";
  ctx.fillText(text, event.offsetX, event.offsetY);
  ctx.restore();
};
canvas.addEventListener("dblclick", onDoubleClick);
