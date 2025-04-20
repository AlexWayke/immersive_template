import { useEffect, useRef } from "react";
import "./style.scss";
import { observer } from "mobx-react-lite";
import CanvasState from "@app/store/canvasState.ts";
import toolState from "@app/store/toolState";
import Brush from "@shared/tools/Brush";
import canvasState from "@app/store/canvasState.ts";

const Canvas = observer(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    CanvasState.setCanvas(canvasRef.current);
    if (canvasRef.current) {
      toolState.setTool(new Brush(canvasRef.current));
    }
  }, []);

  const mouseDownHandler = () => {
    if (canvasRef.current) {
      canvasState.pushUndo(canvasRef.current);
    }
  };

  return (
    <div className="canvas">
      <canvas
        onMouseDown={() => mouseDownHandler()}
        ref={canvasRef}
        width={600}
        height={400}
      ></canvas>
    </div>
  );
});

export default Canvas;
