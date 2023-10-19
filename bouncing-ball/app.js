import {
  Ball
} from './ball.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
    
    this.ball = new Ball(this.stageWidth, this.stageHeight, 40, 10);

    this.draw();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }

  draw() {
    this.ball.draw(this.ctx);
  }
}

window.onload = () => {
  new App();
}