import React, { useState } from "react";
import { AiOutlineClear, AiOutlineCloudUpload } from "react-icons/ai";
import Whiteboard from "../white-board/Whiteboard";

const Navbar = ({ downloadBoard, saveLocal, clearCanvas }) => {
  //   const { download } = useWhiteboard();
  const [filename, setFilename] = useState("Untitled");
  const [isExport, setIsExport] = useState(false);

  const OnSave = (type) => {
    console.log("Saved as ", type);
    downloadBoard(filename, "png");
    setIsExport(false);
  };
  return (
    <div className="h-16 text-white px-8 py-2 flex justify-between items-center ">
      <div
        className="flex items-center gap-4 select-none"
        onClick={() => window.location.replace("http://localhost:5173")}
      >
        <div className="w-12 h-10">
          <img src="/l.svg" alt="" className="w-4/5 h-4/5 mx-auto mt-1" />
        </div>
        <p className="font-serif tracking-widest font-thin text-xl">
          White Board
        </p>
      </div>

      <div className="relative flex items-center gap-8 max-md:hidden">
        <div>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="w-30h-6 px-2 text-gray-500 border border-gray-500 rounded-sm"
          />
        </div>
        <button
          className="text-gray-500 px-4 py-1  rounded-full cursor-pointer hover:bg-neutral-800 transition-all duration-300 ease-in-out"
          //   onClick={() => setIsExport((p) => !p)}
        >
          <span
            className="flex items-center gap-2"
            onClick={() => saveLocal(filename)}
          >
            <AiOutlineCloudUpload />
            save
          </span>
        </button>
        <button
          className="text-gray-500 px-4 py-1  rounded-full cursor-pointer hover:bg-neutral-800 transition-all duration-300 ease-in-out"
          //   onClick={() => setIsExport((p) => !p)}
        >
          <span
            className="flex items-center gap-2"
            onClick={() => clearCanvas()}
          >
            <AiOutlineClear />
            clear
          </span>
        </button>
        <button
          className="bg-blue-500 px-4 py-1 rounded-md cursor-pointer"
          onClick={() => setIsExport((p) => !p)}
        >
          Export
          {isExport && <ExportOpt OnSave={OnSave} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;

const ExportOpt = ({ OnSave }) => {
  return (
    <>
      <div className="bg-neutral-700 rounded-md text-sm text-gray-400 absolute top-10 right-0 p-1 text-nowrap z-50">
        <ul className="flex flex-col">
          <li
            className="px-4  py-1 rounded-sm cursor-pointer hover:bg-neutral-800"
            onClick={() => OnSave("png")}
          >
            Save as .png
          </li>
          <li
            className="px-4  py-1 rounded-sm cursor-pointer hover:bg-neutral-800"
            onClick={() => OnSave("jpg")}
          >
            Save as .jpg
          </li>
        </ul>
      </div>
    </>
  );
};
