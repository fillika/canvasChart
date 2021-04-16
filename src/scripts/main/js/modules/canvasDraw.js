import { getMinMax } from './utils';

function draw(ctx, data, config) {
  const { viewHeight, viewWidth, dpi } = config;
  const { yLines, xLines, columnsCount } = data;

  console.log(data);
  yLines.forEach(dataArr => {
    const [yMin, yMax] = getMinMax(dataArr.coords);

    if (yMin < config.yMin) {
      config.yMin = yMin;
    }

    if (yMax > config.yMax) {
      config.yMax = yMax;
    }
  });

  config.yRatio = viewHeight / (config.yMax - config.yMin);
  config.xRatio = viewWidth / (xLines.length - 2 * dpi);

  // draw horizontal lines asisY
  drawHorizontalLines(ctx, config);

  //drawVerticalLines
  drawVerticalLines(ctx, config);

  drawXLineText(ctx, config);
  // draw line
  yLines.forEach(dataArr => {
    drawLine(ctx, dataArr, config);
  });
  // draw vertical line

  // draw asisX
}

function drawLine(ctx, { coords, color }, config) {
  const { innerHeight, padding, yRatio, xRatio } = config;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;

  for (const [x, y] of coords) {
    const yCoord = innerHeight - padding - y * yRatio;
    const xCoord = x * xRatio - padding;
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
    ctx.lineTo(innerWidth - padding, y);
  }

  ctx.stroke();
  ctx.closePath();
}

function drawVerticalLines(ctx, config) {
  const { viewHeight, viewWidth, columnsCount, padding } = config;
  const step = viewWidth / columnsCount;

  ctx.beginPath();
  ctx.strokeStyle = '#bbb';
  ctx.lineWidth = 1;

  for (let j = 1; j <= columnsCount; j++) {
    const x = Math.floor(step * j);
    ctx.moveTo(x, 0);
    ctx.lineTo(x, viewHeight + padding);
  }

  ctx.stroke();
  ctx.closePath();
}

function drawXLineText(ctx, config) {
  const { viewHeight, viewWidth, columnsCount, padding, dpi } = config;
  const step = viewWidth / columnsCount;

  ctx.save();
  ctx.beginPath();
  ctx.font = 'normal 20px Helvetica, sans-serif';
  ctx.fillStyle = '#fff';
  ctx.save();
  
  for (let j = 1; j <= columnsCount; j++) {
    const x = Math.floor(step * j + padding);
    ctx.fillText('15:35', x - padding * 2, viewHeight + padding * 2);
  }
  ctx.restore();

  ctx.stroke();
  ctx.closePath();
}

export { draw };
