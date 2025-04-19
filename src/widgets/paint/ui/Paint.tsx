import Toolbar from "@entities/toolbar";
import Canvas from "@entities/canvas";
import Settings from "@entities/settings";

import "./style.scss";

const Paint = () => {
  return (
    <div className="paint">
      <Toolbar />
      <Settings />
      <Canvas />
    </div>
  );
};

export default Paint;
