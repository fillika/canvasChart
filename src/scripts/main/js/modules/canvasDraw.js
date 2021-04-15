function draw(canvas, ctx, data) {
  drawLine(ctx, data);

  // TODO Рисовать тут линии и прочее

  // draw vertical lines asisY

  // draw asisX
}

function drawLine(ctx, data) {
  ctx.beginPath();
  ctx.strokeStyle = 'red';
  
  for (const [x, y] of data) {
    ctx.lineTo(x, y);
  }

  ctx.stroke();
  ctx.closePath();
}

export { draw };
