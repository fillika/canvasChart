import { getMinMax } from './utils';

function draw(ctx, data, config) {
  const { viewHeight } = config;

  data.forEach(dataArr => {
    const [yMin, yMax] = getMinMax(dataArr);

    if (yMin < config.yMin) {
      config.yMin = yMin;
    }

    if (yMax > config.yMax) {
      config.yMax = yMax;
    }
  });

  config.yRatio = viewHeight / (config.yMax - config.yMin);

  // draw horizontal lines asisY
  drawHorizontalLines(ctx, config);

  // draw line
  data.forEach(dataArr => {
    drawLine(ctx, dataArr, config);
  });
  // draw vertical line

  // draw asisX
}

function drawLine(ctx, data, config) {
  const { innerHeight, padding, yRatio, viewWidth } = config;

  const xxx = viewWidth / data.length; // TODO Посчитать ratio
  const xRatio = 10.446428571428571;

  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 3;

  for (const [x, y] of data) {
    const yCoord = innerHeight - padding - y * yRatio;
    const xCoord = x * xRatio;
    ctx.lineTo(xCoord, yCoord);
  }

  ctx.stroke();
  ctx.closePath();
}

function drawHorizontalLines(ctx, config) {
  const { innerWidth, viewHeight, rowsCount, padding, yMin, yMax } = config;
  const step = viewHeight / rowsCount;
  const textStep = (yMax - yMin) / rowsCount;

  ctx.beginPath();
  ctx.strokeStyle = '#bbb';
  ctx.lineWidth = 1;
  ctx.font = 'normal 20px Helvetica, sans-serif';
  ctx.fillStyle = '#fff';

  for (let j = 1; j <= rowsCount; j++) {
    const y = step * j + padding;
    const text = Math.round(yMax - textStep * j);

    ctx.fillText(text, 5, y - 5);
    ctx.moveTo(0, y);
    ctx.lineTo(innerWidth, y);
  }

  ctx.stroke();
  ctx.closePath();
}
export { draw };
