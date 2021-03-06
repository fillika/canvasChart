function setStyles(canvas, config) {
  const { width, height, innerWidth, innerHeight } = config;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

function getMinMax(data) {
  let min, max;

  for (const [_, y] of data) {
    if (typeof min !== 'number') min = y;
    if (typeof max !== 'number') max = y;

    if (min > y) min = y;
    if (max < y) max = y;
  }

  return [min, max];
}

function toDate(timestamp) {
  const shortMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(timestamp);
  return `${shortMonth[date.getMonth()]} ${date.getDate()}`;
}

export { setStyles, getMinMax, toDate };
