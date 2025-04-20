import toolState from "@app/store/toolState";
import "./style.scss";
import canvasState from "@app/store/canvasState";
import Brush from "@shared/tools/Brush";
import Rect from "@shared/tools/Rect";
import Circle from "@shared/tools/Circle";
import Eraser from "@shared/tools/Eraser";
import Line from "@shared/tools/Line";
import { ChangeEvent } from "react";

function Toolbar() {
  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    toolState.setStrokeColor(e.target.value);
  };

  return (
    <div className="toolbar">
      <button
        className="toolbar__btn"
        onClick={() =>
          toolState.setTool(
            new Brush(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionId,
            ),
          )
        }
      >
        Pen
      </button>
      <button
        className="toolbar__btn"
        onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
      >
        Rect
      </button>
      <button
        className="toolbar__btn"
        onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
      >
        Circle
      </button>
      <button
        className="toolbar__btn"
        onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
      >
        Eraser
      </button>
      <button
        className="toolbar__btn"
        onClick={() => toolState.setTool(new Line(canvasState.canvas))}
      >
        Line
      </button>
      <input onChange={(e) => changeColor(e)} type="color" />
      <button
        className="toolbar__btn toolbar__btn--push-left"
        onClick={() => canvasState.undo()}
      >
        Undo
      </button>
      <button className="toolbar__btn" onClick={() => canvasState.redo()}>
        Redo
      </button>
      <button className="toolbar__btn">Save</button>
    </div>
  );
}

export default Toolbar;
