export class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {
    this.radius = radius;
    this.vx = speed;
    this.vy = speed;

    const diameter = this.radius * 2;
    this.x = this.radius + (Math.random() * (stageWidth - diameter));
    this.y = this.radius + (Math.random() * (stageHeight - diameter));
  }

  draw(ctx, stageWidth, stageHeight, blocks) {
    this.x += this.vx;
    this.y += this.vy;

    this.bounceWindow(stageWidth, stageHeight);
    this.bounceBlock(blocks);

    ctx.fillStyle = '#66545e';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    if (this.x == minX || this.x == maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y == minY || this.y == maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }

    // When the window is resized and the ball goes outside of the window
    // Set the ball's movement in the opposite direction it went off
    if (this.x < minX || this.x > maxX) {
      this.vx = Math.abs(this.vx) * (maxX - this.x) / Math.abs(maxX - this.x);
      this.x += this.vx;
    } else if (this.y < minY || this.y > maxY) {
      this.vy = Math.abs(this.vy) * (maxY - this.y) / Math.abs(maxY - this.y);
      this.y += this.vy;
    }
  }

  bounceBlock(blocks) {
    blocks.forEach(block => {
      const minX = block.x - this.radius;
      const maxX = block.maxX + this.radius;
      const minY = block.y - this.radius;
      const maxY = block.maxY + this.radius;
  
      if (this.x >= minX && this.x <= maxX && this.y >= minY && this.y <= maxY) {
        const minXDir = Math.min(Math.abs(minX - this.x), Math.abs(this.x - maxX));
        const minYDir = Math.min(Math.abs(minY - this.y), Math.abs(this.y - maxY));
        const min = Math.min(minXDir, minYDir);
  
        if (min == minXDir) {
          this.vx *= -1;
          this.x += this.vx;
        } else if (min == minYDir) {
          this.vy *= -1;
          this.y += this.vy;
        }
      }
    });
  }
}