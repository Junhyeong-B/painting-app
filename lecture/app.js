const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 800;

const ctx = canvas.getContext("2d");
ctx.lineWidth = 5;
ctx.lineCap = "round";
let isPainting = false;

const onMouseMove = (event) => {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
};

const onMouseDown = () => {
  ctx.beginPath();
  isPainting = true;
};

const cancelPainting = () => {
  isPainting = false;
  ctx.closePath();
};

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

const lineWidth = document.getElementById("line-width");
const onLineWidthChange = (event) => {
  ctx.lineWidth = event.currentTarget.value;
};
lineWidth.addEventListener("change", onLineWidthChange);

const lineColor = document.getElementById("line-color");
const onLineColorChange = (event) => {
  ctx.strokeStyle = event.currentTarget.value;
  ctx.fillStyle = event.currentTarget.value;
};
lineColor.addEventListener("change", onLineColorChange);

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
