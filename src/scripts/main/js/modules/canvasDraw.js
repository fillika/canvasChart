import { getMinMax } from './utils';

function draw(ctx, data, config) {
  // draw line
  drawLine(ctx, data, config);

  // draw horizontal lines asisY
  drawHorizontalLines(ctx, data, config);

  // draw vertical line

  // draw asisX
}

function drawLine(ctx, data, config) {
  const { innerHeight, padding } = config;

  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 3;

  for (const [x, y] of data) {
    ctx.lineTo(x, innerHeight - y - padding);
  }

  ctx.stroke();
  ctx.closePath();
}

function drawHorizontalLines(ctx, data, config) {
  const { rowsCount, innerWidth, viewHeight, padding } = config;
  const [yMin, yMax] = getMinMax(data);
  const step = viewHeight / rowsCount;
  const textStep = (yMax - yMin) / rowsCount;

  ctx.beginPath();
  ctx.strokeStyle = '#bbb';
  ctx.lineWidth = 1;
  ctx.font = 'normal 20px Helvetica, sans-serif';
  ctx.fillStyle = '#fff';

  for (let j = 1; j <= rowsCount; j++) {
    const y = step * j + padding;
    const text = yMax - textStep * j;
    ctx.fillText(text, 5, y - 5);
    ctx.moveTo(0, y);
    ctx.lineTo(innerWidth, y);
  }

  ctx.stroke();
  ctx.closePath();
}
export { draw };
