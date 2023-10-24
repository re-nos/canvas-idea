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

    this.isDown = false;
    document.addEventListener('pointerdown', this.onDown.bind(this), false);
    document.addEventListener('pointermove', this.onMove.bind(this), false);
    document.addEventListener('pointerup', this.onUp.bind(this), false);
    
    this.ball = new Ball(this.stageWidth, this.stageHeight, 40, 2);

    this.blockOffsetX = 0;
    this.blocks = []

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
    });
  }

  onDown(e) {
    this.isDown = true;
    this.blockOffsetX = e.clientX;
    this.blocks.push(new Block(e.clientX, e.clientY, 0, 40));
  }

  onMove(e) {
    if (this.isDown) {
      const moveX = e.clientX - this.blockOffsetX;
      this.blocks[this.blocks.length -1].resize(moveX);
      console.log(this.blocks[this.blocks.length -1]);
    }
  }
  
  onUp(e) {
    this.isDown = false;
  }
}

window.onload = () => {
  new App();
}