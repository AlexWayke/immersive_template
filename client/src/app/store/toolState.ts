import Brush from "@shared/tools/Brush";
import Circle from "@shared/tools/Circle";
import Rect from "@shared/tools/Rect";
import { makeAutoObservable } from "mobx";

interface Tool {
  tool: Brush | Rect | Circle | null;
}

class ToolState {
  tool: Tool["tool"] = null;
  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Tool["tool"]) {
    this.tool = tool;
  }

  setFillColor(color: string) {
    if (this.tool) this.tool.fillColor = color;
  }
  setStrokeColor(color: string) {
    if (this.tool) this.tool.strokeColor = color;
  }

  setLineWidth(width: number) {
    if (this.tool) this.tool.lineWidth = width;
  }
}

export default new ToolState();
