import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement | null = null;
  socket: WebSocket | null = null;
  sessionId: string | null = null;
  undoList: string[] | null = [];
  redoList: string[] | null = [];
  userName = "";

  constructor() {
    makeAutoObservable(this);
  }

  setUserName(name: string) {
    this.userName = name;
  }
  setSocket(socket: WebSocket) {
    this.socket = socket;
  }
  setSessionId(session: string) {
    this.sessionId = session;
  }

  setCanvas(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
  }

  pushUndo(data: HTMLCanvasElement) {
    if (this.undoList) {
      this.undoList.push(data.toDataURL());
    }
  }

  pushRedo(data: HTMLCanvasElement) {
    if (this.redoList) {
      this.redoList.push(data.toDataURL());
    }
  }

  undo() {
    const ctx = this.canvas?.getContext("2d");
    if (this.undoList && this.undoList.length > 0 && this.canvas) {
      const dataUrl = this.undoList.pop() ?? "";

      this.redoList?.push(this.canvas.toDataURL());

      const img = new Image();
      img.src = dataUrl ? dataUrl.toString() : "";
      img.onload = () => {
        if (this.canvas) {
          ctx?.clearRect(0, 0, this.canvas?.width, this.canvas.height);
          ctx?.drawImage(img, 0, 0, this.canvas?.width, this.canvas.height);
        }
      };
    } else {
      if (this.canvas) {
        ctx?.clearRect(0, 0, this.canvas?.width, this.canvas.height);
      }
    }
  }
  redo() {
    const ctx = this.canvas?.getContext("2d");
    if (this.redoList && this.redoList.length > 0 && this.canvas) {
      const dataUrl = this.redoList.pop();

      this.undoList?.push(this.canvas.toDataURL());

      const img = new Image();
      img.src = dataUrl ? dataUrl.toString() : "";
      img.onload = () => {
        if (this.canvas) {
          ctx?.clearRect(0, 0, this.canvas?.width, this.canvas.height);
          ctx?.drawImage(img, 0, 0, this.canvas?.width, this.canvas.height);
        }
      };
    }
  }
}

export default new CanvasState();
