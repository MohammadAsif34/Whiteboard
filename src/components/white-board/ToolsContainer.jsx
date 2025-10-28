import React, { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import {
  FaEraser,
  FaPen,
  FaRegSquare,
  FaShapes,
  FaSquare,
} from "react-icons/fa";

import { PiNotePencilFill } from "react-icons/pi";
import { ToolBox } from "./component/ToolBox";
import { ToolRange } from "./component/ToolRange";
import { UndoDo } from "./component/UndoDo";

const ToolsContainer = ({ whiteboard }) => {
  const [tool, setTool] = useState("");

  const {
    color,
    isErase,
    drawStart,
    eraseStart,
    lineWidth,
    setBrushWidth,
    setBrushColor,
  } = whiteboard;

  return (
    <>
      <div className="px-2 py-4 z-10 rounded-md text-xl bg-neutral-900 absolute top-1/2 left-3 -translate-y-1/2 flex flex-col items-center gap-4">
        {/* canvas pen color  */}
        <button
          className="cursor-pointer relative p-1 hover:bg-neutral-700 rounded-md transition-all duration-500 ease-in-out"
          onClick={() => setTool(tool == "color" ? "" : "color")}
        >
          <FaSquare style={{ color: color }} />
          {tool == "color" && (
            <ToolBox>
              <span
                className="text-red-500"
                onClick={() => setBrushColor("#fb2c36")}
              >
                <FaSquare />
              </span>
              <span
                className="text-green-500"
                onClick={() => setBrushColor("#00c951")}
              >
                <FaSquare />
              </span>
              <span
                className="text-yellow-500"
                onClick={() => setBrushColor("#f0b100")}
              >
                <FaSquare />
              </span>
              <span
                className="text-white"
                onClick={() => setBrushColor("#ffffff")}
              >
                <FaSquare />
              </span>
            </ToolBox>
          )}
        </button>

        {/* Canvas pen style  */}
        <button
          className={`cursor-pointer relative p-1 ${
            !isErase && "bg-neutral-700"
          } hover:bg-neutral-700 rounded-md transition-all duration-500 ease-in-out`}
          onClick={() => {
            drawStart();
            setTool(tool == "pen" ? "" : "pen");
          }}
        >
          <FaPen />
        </button>

        {/* Erase canvas  */}
        <button
          className={`cursor-pointer relative p-1 ${
            isErase && "bg-neutral-700"
          } hover:bg-neutral-700 rounded-md transition-all duration-500 ease-in-out`}
          onClick={() => eraseStart()}
        >
          <FaEraser />
        </button>

        {/* resize brush width  */}
        <button
          title="resize brush"
          className="cursor-pointer p-1 hover:bg-neutral-700 rounded-md transition-all duration-500 ease-in-out"
          onClick={() => setTool(tool == "resize" ? "" : "resize")}
        >
          <PiNotePencilFill title="resize brush" />
          {tool == "resize" && (
            <ToolRange size={lineWidth} setBrushWidth={setBrushWidth} />
          )}
        </button>

        <div className="border w-full -my-1 border-gray-500 rounded-full "></div>

        {/* shape  */}
        <button
          className="cursor-pointer relative p-1 hover:bg-neutral-700 rounded-md transition-all duration-500 ease-in-out"
          onClick={() => setTool(tool == "shape" ? "" : "shape")}
        >
          <FaShapes title="Shapes" />
          {tool == "shape" && (
            <ToolBox>
              <FaRegSquare className="tooltip" data-tooltip="asif" />
              <LuTriangle title="triangle" />
              <div className="-rotate-45">
                <AiOutlineMinus title="line" />
              </div>
            </ToolBox>
          )}
        </button>
        <UndoDo />
      </div>
      {/* <Zoom whiteboard={whiteboard} /> */}
    </>
  );
};
export default ToolsContainer;
