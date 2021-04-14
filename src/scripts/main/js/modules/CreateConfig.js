class CreateConfig {
  constructor(params) {
    this.dpi = 2;
    this.width = params.width;
    this.height = params.height;
    this.innerWidth = this.width * this.dpi;
    this.innerHeight = this.height * this.dpi;
  }
}

export { CreateConfig };
