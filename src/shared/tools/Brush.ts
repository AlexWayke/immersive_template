import Tool from "./Tool";

export default class Brush extends Tool {
  mouseDown: boolean = false;
  constructor(canvas: HTMLCanvasElement | null) {
    super(canvas);
    this.listen();
  }

  listen() {
    if (this.canvas) {
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
      this.canvas.onmousedown = this.mouseDownHandler.bind(this);
      this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }
  }

  mouseUpHandler() {
    this.mouseDown = false;
  }

  mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true;
    if (this.ctx) {
      this.ctx.beginPath();
      if (e.target) {
        this.ctx.moveTo(
          e.pageX - (e.target as HTMLElement).offsetLeft,
          e.pageY - (e.target as HTMLElement).offsetTop,
        );
      }
    }
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      this.draw(
        e.pageX - (e.target as HTMLElement).offsetLeft,
        e.pageY - (e.target as HTMLElement).offsetTop,
      );
    }
  }

  draw(x: number, y: number) {
    if (this.ctx) {
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }
}
