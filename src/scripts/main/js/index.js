import { draw } from './modules/canvasDraw';
import { CreateConfig } from './modules/CreateConfig';
import { mockData } from './modules/data';
import { setStyles } from './modules/utils';

init('#chart', { width: 600, height: 300 }, mockData);

function init(selector, params, data) {
  const canvas = document.querySelector(selector);
  const ctx = canvas.getContext('2d');
  const config = new CreateConfig(params);

  setStyles(canvas, config);

  draw(canvas, ctx, data);
}
