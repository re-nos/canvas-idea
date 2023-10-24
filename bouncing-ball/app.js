import {
  Ball
} from './ball.js';

import {
  Block
} from './block.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
    
    this.ball = new Ball(this.stageWidth, this.stageHeight, 40, 5);

    this.blocks = []
    const blockNum = Math.random() * 10;
    for (let i = 0; i < blockNum; i++) {
      const blockX = Math.random() * this.stageWidth;
      const blockY = Math.random() * this.stageHeight;
      const blockWidth = Math.random() * 500 + 100;
      const blockHeight = 40;
      
      this.blocks.push(new Block(blockX, blockY, blockWidth, blockHeight));
    }

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.blocks);
    this.blocks.forEach(block => {
      block.draw(this.ctx);
    })
  }
}

window.onload = () => {
  new App();
}