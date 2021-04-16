class CreateConfig {
  constructor({ width, height, rowsCount, columnsCount, padding }) {
    this.dpi = 2;
    this.yMin = 0;
    this.yMax = 0;
    this.yRatio = 1;
    this.width = width - padding;
    this.height = height - padding;
    this.padding = padding;
    this.innerWidth = this.width * this.dpi;
    this.innerHeight = this.height * this.dpi;
    this.viewWidth = this.innerWidth - this.padding;
    this.viewHeight = this.innerHeight - this.padding * 2;
    this.rowsCount = rowsCount;
    this.columnsCount = columnsCount;
    this.xCoords = [];
  }
}

export { CreateConfig };
