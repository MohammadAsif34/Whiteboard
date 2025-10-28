import React, { useEffect, useRef, useState } from "react";

const useWhiteboard = (initialColor = "#ffffff", initialLineWidth = 1) => {
  //   const [tool, setTool] = useState("");

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDraw, setIsDraw] = useState(false);
  const [isErase, setIsErase] = useState(false);
  const [color, setColor] = useState(initialColor);
  const [lineWidth, setLineWidth] = useState(initialLineWidth);
  const [zoom, setZoom] = useState(1); // 1 => 100%

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Get device pixel ratio
      const dpr = window.devicePixelRatio || 1;

      // Set canvas width/height in pixels
      canvas.width = window.innerWidth * 0.98 * dpr;
      canvas.height = window.innerHeight * 0.87 * dpr;

      // Scale context to match display size
      context.scale(dpr, dpr);

      // Set CSS width/height for display
      canvas.style.width = `${window.innerWidth * 0.98}px`;
      canvas.style.height = `${window.innerHeight * 0.87}px`;

      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = color;
      const adjustedWidth = Math.max(lineWidth - 100, 1); // never less than 1px
      context.lineWidth = adjustedWidth;
      context.fillStyle = "#e91e63";
      context.shadowColor = "white";
      context.shadowBlur = 1; // subtle blur helps smooth edges
      contextRef.current = context;
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  //   start draw on mouse up
  const startDraw = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDraw(true);
  };

  //   trigger draw on isDraw = true
  const draw = (e) => {
    if (!isDraw) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const context = contextRef.current;
    if (isErase) {
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = lineWidth + 10;
    } else {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
    }
    // contextRef.current.strokeStyle = isErase ? "#262626" : color;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  //   stop drawing in on mouse down
  const stopDraw = () => {
    contextRef.current.closePath();
    setIsDraw(false);
  };

  //   clear canvas
  const clearBoard = () => {
    if (!contextRef.current) return;
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    console.log("color : ", color);
    console.log("line width : ", lineWidth);
  }, [color, lineWidth]);

  //   start erasing
  const eraseStart = () => {
    // setIsDraw(false);
    setIsErase(true);
    // stopDraw();
  };

  //   start drawing
  const drawStart = () => {
    setIsErase(false);
    // setIsDraw(true);
  };

  //   set pen color
  const setBrushColor = (color) => {
    setColor(color);
    stopDraw();
  };

  //   set pen width
  const setBrushWidth = (width) => setLineWidth(Number(width));

  // download canvas as .png
  const download = (filename, type) => {
    const canvas = canvasRef.current;
    console.log("start downloading.......");
    if (isCanvasBlank(canvas)) {
      alert("Canvas is empty");
      return;
    }
    const link = document.createElement("a");
    if (type == "png") {
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL(`image/png`);
      link.click();
    }
    console.log("download complete.");
  };

  //   checking canvas is empty or not
  const isCanvasBlank = (canvas) => {
    const ctx = canvas.getContext("2d");
    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    return !pixelData.some((channel) => channel != 0);
  };

  //   save canvas in localstorage
  const saveCanvasLocal = (filename = "Untitled") => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isCanvasBlank(canvas)) {
      alert("Canvas is empty");
      return;
    }

    const dataURL = canvas.toDataURL("image/png");

    // Snapshot object with metadata
    const snapshot = {
      filename,
      dataURL,
      width: canvasRef.current.width,
      height: canvasRef.current.height,
      brushColor: contextRef.current?.strokeStyle || "#000000",
      brushWidth: contextRef.current?.lineWidth || 1,
      updatedAt: new Date().toLocaleString(),
    };

    // Get existing whiteboard data
    const stored = JSON.parse(localStorage.getItem("whiteboard"));
    let whiteboardData;

    if (stored && stored.sheet && Array.isArray(stored.sheet)) {
      whiteboardData = stored;

      // Check if filename exists
      const existingIndex = whiteboardData.sheet.findIndex(
        (s) => s.filename === filename
      );

      if (existingIndex !== -1) {
        // Update existing snapshot
        whiteboardData.sheet[existingIndex] = snapshot;
      } else {
        // Add new snapshot
        whiteboardData.sheet.push(snapshot);
      }
    } else {
      // No data yet → create new
      whiteboardData = [snapshot];
    }

    // Save back to localStorage
    localStorage.setItem("whiteboard", JSON.stringify(whiteboardData));
  };

  //   load canvas from localstorage
  const LoadLocalToCanvas = (canvasData) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = canvasData.dataURL;
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width * 0.8, canvas.height * 0.8);
    };
  };

  const deleteCanvasFromLocal = (filename) => {
    const data = JSON.parse(localStorage.getItem("whiteboard"));
    if (Array.isArray(data)) {
      const updated = data.filter((item) => item.filename !== filename);
      localStorage.setItem("whiteboard", JSON.stringify(updated));
      console.log("deleted");
    } else {
      console.error("Something went wrong");
    }
  };

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const resetZoom = () => setZoom(1);

  return {
    canvasRef,
    color,
    lineWidth,
    isErase,
    isDraw,
    zoom,
    startDraw,
    draw,
    stopDraw,
    setBrushColor,
    setBrushWidth,
    eraseStart,
    drawStart,
    clearBoard,
    download,
    saveCanvasLocal,
    LoadLocalToCanvas,
    deleteCanvasFromLocal,
    zoomIn,
    zoomOut,
    resetZoom,
  };
};

export default useWhiteboard;
