import React from "react";

import ToolsContainer from "./ToolsContainer";

const Whiteboard2 = ({ whiteboard }) => {
  const { canvasRef, isDraw, isErase, draw, startDraw, stopDraw, zoom } =
    whiteboard;

  return (
    <div className=" border h-full border-neutral-700 rounded-2xl bg-neutral-800 text-white relative">
      <ToolsContainer whiteboard={whiteboard} />
      <canvas
        className={`w-f ull h-full border rounded-xl ${
          isErase
            ? "cursor-not-allowed"
            : isDraw
            ? "cursor-crosshair"
            : "default"
        }`}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "0 0",
        }}
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        // onMouseLeave={stopDraw}
      ></canvas>
    </div>
  );
};

export default Whiteboard2;
