import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import {
  FaCircle,
  FaEraser,
  FaPaintBrush,
  FaPen,
  FaRegSquare,
  FaShapes,
  FaSquare,
} from "react-icons/fa";
import { LuPenLine, LuTriangle } from "react-icons/lu";

const Whiteboard = () => {
  const [tool, setTool] = useState("");

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDraw, setIsDraw] = useState(false);
  const [isErase, setIsErase] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [lineWidth, setLineWidth] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.92;
    // canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.88;
    // canvas.width = canvas.clientWidth;
    // canvas.height = canvas.clientHeight;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;
  }, []);

  const startDraw = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDraw(true);
  };

  const draw = (e) => {
    if (!isDraw) return;
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.strokeStyle = isErase ? "#000000" : color;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDraw = () => {
    contextRef.current.closePath();
    setIsDraw(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleTool = (tool) => {
    setTool(tool);
    console.log("tool pick : ", tool);
  };

  useEffect(() => {
    console.log("color : ", color);
    console.log("line width : ", lineWidth);
  }, [color, lineWidth]);

  return (
    <div className=" border border-neutral-500 rounded-2xl p-1 bg-neutral-800 text-white relative">
      <canvas
        className="border p-1  rounded-xl"
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
      ></canvas>
      <div className="px-4 py-3 rounded-xl bg-neutral-900 absolute bottom-3 left-[50%] -translate-x-[50%] flex items-center gap-8">
        <button
          className="cursor-pointer relative"
          onClick={() => handleTool(tool == "color" ? "" : "color")}
        >
          <FaSquare />
          {tool == "color" && (
            <ToolBox>
              <span
                className="text-red-500"
                onClick={() => setColor("#fb2c36")}
              >
                <FaSquare />
              </span>
              <span
                className="text-green-500"
                onClick={() => setColor("#00c951")}
              >
                <FaSquare />
              </span>
              <span className="text-black" onClick={() => setColor("#000000")}>
                <FaSquare />
              </span>
              <span className="text-white" onClick={() => setColor("#ffffff")}>
                <FaSquare />
              </span>
            </ToolBox>
          )}
        </button>
        <button
          className="cursor-pointer relative"
          onClick={() => handleTool(tool == "size" ? "" : "size")}
        >
          <LuPenLine />
          {tool == "size" && (
            <ToolBox>
              <span className="" onClick={() => setLineWidth(10)}>
                <FaCircle />
              </span>
              <span className="text-[11px]" onClick={() => setLineWidth(3)}>
                <FaCircle />
              </span>
              <span className="text-[8px]" onClick={() => setLineWidth(1)}>
                <FaCircle />
              </span>
            </ToolBox>
          )}
        </button>
        <button
          className="cursor-pointer relative"
          onClick={() => handleTool(tool == "pen" ? "" : "pen")}
        >
          <FaPen />
          {tool == "pen" && (
            <ToolBox>
              <FaPen />
              <FaPaintBrush />
            </ToolBox>
          )}
        </button>
        <button
          className="cursor-pointer relative"
          onClick={() => handleTool(tool == "erase" ? "" : "erase")}
        >
          <FaEraser />
          {tool == "erase" && (
            <ToolBox>
              <FaEraser />
              <div className="text-sm">
                <FaEraser />
              </div>
              <div className="text-xs">
                <FaEraser />
              </div>
            </ToolBox>
          )}
        </button>
        {/* <button
          className="cursor-pointer"
          onClick={() => handleTool("pen")}
          ></button> */}
        <div>|</div>
        <button
          className="cursor-pointer relative"
          onClick={() => handleTool(tool == "shape" ? "" : "shape")}
        >
          <FaShapes />
          {tool == "shape" && (
            <ToolBox>
              <FaRegSquare />
              <LuTriangle />
              <div className="-rotate-45">
                <AiOutlineMinus />
              </div>
            </ToolBox>
          )}
        </button>
      </div>
    </div>
  );
};

export default Whiteboard;

const ToolBox = ({ children }) => {
  return (
    <>
      <div className="px-4 py-2 rounded-xl bg-neutral-700 absolute left-1/2 -translate-x-1/2 bottom-10 flex items-center gap-4">
        {children}
      </div>
    </>
  );
};
