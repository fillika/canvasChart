import { CreateConfig } from './modules/CreateConfig';
import { setStyles } from './modules/utils';

const config = new CreateConfig({ width: 600, height: 300 });
init('#chart');

function init(selector) {
  const canvas = document.querySelector(selector);
  const ctx = canvas.getContext('2d');

  setStyles(canvas, config);
}
