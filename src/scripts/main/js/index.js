import { draw } from './modules/canvasDraw';
import { CreateConfig } from './modules/CreateConfig';
import { mockData } from './modules/data';
import { setStyles } from './modules/utils';

const config = {
  width: 600,
  height: 250,
  rowsCount: 5,
  padding: 15,
};

init('#chart', config, mockData);

function init(selector, params, data) {
  const canvas = document.querySelector(selector);
  const ctx = canvas.getContext('2d');
  const config = new CreateConfig(params);

  setStyles(canvas, config);

  draw(ctx, data, config);
}
