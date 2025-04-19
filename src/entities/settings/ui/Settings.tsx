import { useId } from "react";
import "./style.scss";
import toolState from "@app/store/toolState";

function Settings() {
  const inputId = useId();
  const colorId = useId();

  return (
    <div className="settings">
      <label htmlFor={inputId}>Толщина линии</label>
      <input
        onChange={(e) => toolState.setLineWidth(Number(e.target.value))}
        type="number"
        id={inputId}
        defaultValue={1}
        min={1}
        max={50}
      />
      <label htmlFor={colorId}>Толщина линии</label>
      <input
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
        id={colorId}
        type="color"
      />
    </div>
  );
}

export default Settings;
