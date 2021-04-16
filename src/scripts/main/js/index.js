import { draw } from './modules/canvasDraw';
import { CreateConfig } from './modules/CreateConfig';
import { tgData } from './modules/data';
import { setStyles } from './modules/utils';

const config = {
  width: 600,
  height: 250,
  rowsCount: 5,
  padding: 15,
};

const data = parseData(tgData);

init('#chart', config, data);

function init(selector, params, data) {
  const canvas = document.querySelector(selector);
  const ctx = canvas.getContext('2d');
  const config = new CreateConfig(params);

  setStyles(canvas, config);

  draw(ctx, data, config);
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
