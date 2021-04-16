import { getMinMax, toDate } from './utils';

function draw(ctx, data, config) {
  const { viewHeight, viewWidth } = config;
  const { yLines, xLines } = data;

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
  config.xRatio = viewWidth / xLines.length;
  config.xCoords = xLines;

  // draw horizontal lines asisY
  drawHorizontalLines(ctx, config);

  //drawVerticalLines
  drawVerticalLines(ctx, config);

  // draw line
  yLines.forEach(dataArr => {
    drawLine(ctx, dataArr, config);
  });

  drawXLineText(ctx, config);
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
    const xCoord = x * xRatio + padding;
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

  for (let j = 0; j <= rowsCount; j++) {
    const y = step * j + padding;
    const text = Math.round(yMax - textStep * j);

    ctx.fillText(text, 5 + padding, y - 5);
    ctx.moveTo(0 + padding, y);
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

  for (let j = 0; j <= columnsCount; j++) {
    const x = Math.floor(step * j);

    ctx.moveTo(x + padding, 0 + padding);
    ctx.lineTo(x + padding, viewHeight + padding);
  }

  ctx.stroke();
  ctx.closePath();
}

function drawXLineText(ctx, config) {
  const { viewHeight, viewWidth, columnsCount, padding, xCoords } = config;
  const step = viewWidth / columnsCount;

  ctx.save();
  ctx.beginPath();
  ctx.font = 'normal 20px Helvetica, sans-serif';
  ctx.fillStyle = '#fff';

  const coef = Math.round(xCoords.length / columnsCount) - 1;
  let j = 0;
  
  for (let k = 0; k < xCoords.length; k++) {
    const element = xCoords[k];

    if (k % coef === 0) {
      const x = Math.floor(step * j + padding);
      ctx.fillText(toDate(element), x - padding + 5, viewHeight + padding * 2 - 10);
      j++;
    }
  }

  ctx.stroke();
  ctx.closePath();
}

export { draw };
