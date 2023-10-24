export class Block {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
  }

  resize(width) {
    this.width = width;
    this.maxX = this.x + this.width;
  }

  draw(ctx) {
    ctx.fillStyle = '#aa6f73';
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}