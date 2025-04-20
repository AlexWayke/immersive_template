import Tool from "./Tool";

export default class Rect extends Tool {
  mouseDown: boolean = false;
  startY: number = 0;
  startX: number = 0;
  saved: string | null = null;
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
      this.startX = e.pageX - (e.target as HTMLElement).offsetLeft;
      this.startY = e.pageY - (e.target as HTMLElement).offsetTop;
      this.saved = this.canvas?.toDataURL() || null;
    }
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const currentX = e.pageX - (e.target as HTMLElement).offsetLeft;
      const currentY = e.pageY - (e.target as HTMLElement).offsetTop;
      const width = currentX - this.startX;
      const height = currentY - this.startY;
      this.draw(this.startX, this.startY, width, height);
    }
  }

  draw(x: number, y: number, w: number, h: number) {
    if (this.ctx) {
      const img = new Image();
      img.src = this.saved ? this.saved : "";
      img.onload = () => {
        this.ctx?.clearRect(
          0,
          0,
          this.canvas?.width || 0,
          this.canvas?.height || 0,
        );
        this.ctx?.drawImage(
          img,
          0,
          0,
          this.canvas?.width || 0,
          this.canvas?.height || 0,
        );
        this.ctx?.beginPath();
        this.ctx?.rect(x, y, w, h);
        this.ctx?.fill();
        this.ctx?.stroke();
      };
    }
  }
}
