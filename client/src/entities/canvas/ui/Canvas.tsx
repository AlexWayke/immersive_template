import { RefObject, useEffect, useRef, useState } from "react";
import "./style.scss";
import { observer } from "mobx-react-lite";
import CanvasState from "@app/store/canvasState.ts";
import toolState from "@app/store/toolState";
import Brush from "@shared/tools/Brush";
import canvasState from "@app/store/canvasState.ts";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Canvas = observer(() => {
  const canvasRef: RefObject<HTMLCanvasElement | null> = useRef(null);
  const modalInput: RefObject<HTMLInputElement | null> = useRef(null);
  const [modal, setModal] = useState(true);
  const params = useParams();

  const mouseDownHandler = () => {
    if (canvasRef.current) {
      canvasState.pushUndo(canvasRef.current);
    }
  };

  const connectionHandler = () => {
    if (modalInput?.current) {
      canvasState.setUserName(modalInput.current?.value);
    }
  };

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current?.getContext("2d");
    console.log("msg.figure", msg.figure);
    switch (figure.type) {
      case "brush":
        if (ctx) {
          Brush.draw(ctx, figure.x, figure.y);
        }
        break;
    }
  };

  useEffect(() => {
    CanvasState.setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvasState.userName) {
      const socket = new WebSocket("ws://localhost:5000/");

      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id ?? "");
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.userName,
            method: "connection",
          }),
        );
        setModal(false);
      };
      socket.onmessage = (e) => {
        console.log("check");
        const msg = JSON.parse(e.data);
        switch (msg.method) {
          case "connection":
            console.log(`Gjkmpjdfntkm ${msg.username} присоединился`);
            break;
          case "draw":
            drawHandler(msg);
            break;
        }
      };
    }
  }, [params.id, canvasState.userName]);

  return (
    <div className="canvas">
      <Modal show={modal}>
        <Modal.Header closeButton>
          <Modal.Title>Введите имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={modalInput} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHandler()}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
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
