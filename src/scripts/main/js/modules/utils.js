function setStyles(canvas, config) {
  const { width, height, innerWidth, innerHeight } = config;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

export { setStyles };
