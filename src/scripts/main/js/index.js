import { draw } from './modules/canvasDraw';
import { CreateConfig } from './modules/CreateConfig';
import { tgData } from './modules/data';
import { setStyles } from './modules/utils';

const canvas = document.getElementById('chart')
const config = {
  width: canvas.parentElement.getBoundingClientRect().width,
  height: canvas.parentElement.getBoundingClientRect().height,
  rowsCount: 5,
  columnsCount: 10,
  padding: 35,
};


const data = parseData(tgData);

init(canvas, config, data);

function init(canvas, params, data) {
  const ctx = canvas.getContext('2d');

  set(params);

  window.addEventListener('resize', function (e) {
    params.width = canvas.parentElement.getBoundingClientRect().width;
    params.height = canvas.parentElement.getBoundingClientRect().height,
    set(config);
  });

  function set(params) {
    const config = new CreateConfig(params);
    ctx.clearRect(0, 0, config.width, config.height);

    setStyles(canvas, config);

    draw(ctx, data, config);
  }
}

function parseData(data) {
  const { columns, types, names, colors } = data;
  const result = {
    yLines: [],
    xLines: [],
  };

  columns.forEach((element, i) => {
    const [type, ...rest] = element;

    if (types[type] === 'line') {
      result.yLines.push({
        color: colors[type],
        coords: rest.map((num, idx) => [idx, num]),
      });
    }

    if (types[type] === 'x') {
      result.xLines = rest;
    }
  });

  return result;
}
