import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Whiteboard from "./components/white-board/Whiteboard";
import { RiMenuUnfoldLine } from "react-icons/ri";
import Whiteboard2 from "./components/white-board/Whiteboard2";
import useWhiteboard from "./hook/canvas-hook/useWhiteboard";
import Sidebar from "./components/sidebar/Sidebar";
import { LuBadgeInfo } from "react-icons/lu";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const App = () => {
  const whiteboard = useWhiteboard();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 888) setIsMobile(true);
      else setIsMobile(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="w-full h-screen bg-neutral-900 flex flex-col relative">
        <DevInfo />
        {/* <Sidebar loadCanvas={whiteboard.LoadLocalToCanvas} /> */}
        <Navbar
          downloadBoard={whiteboard.download}
          saveLocal={whiteboard.saveCanvasLocal}
          clearCanvas={whiteboard.clearBoard}
        />
        <div className="flex-1 flex justify-center items-center">
          <div className="text-orange-400 bg-orange-100/10 rounded-2xl border p-5 text-center">
            <p className="text-2xl font-semibold py-2">⚠️ Caution</p>
            <p className=" text-center">
              🚧 This Website is Under Construction!
            </p>
            <p className="mt-8 mb-3 p-4 text-green-500 border rounded-2xl">
              ✅ Please use full screen size
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        cursor: "url('/eraser.png') 8 8, auto",
      }}
      className="w-full h-screen bg-neutral-900 flex flex-col relative"
    >
      <DevInfo />
      <Sidebar
        loadCanvas={whiteboard.LoadLocalToCanvas}
        deleteCanvas={whiteboard.deleteCanvasFromLocal}
      />
      <Navbar
        downloadBoard={whiteboard.download}
        saveLocal={whiteboard.saveCanvasLocal}
        clearCanvas={whiteboard.clearBoard}
      />
      <div className="flex-1 my- flex gap-4 p-4 pt-2 transition-transform ease-in-out duration-500      ">
        {/* canvas  */}
        <div className="flex-1 transition-all duration-500 ease-in-out">
          <Whiteboard2 whiteboard={whiteboard} />
        </div>
      </div>
    </div>
  );
};

export default App;

const DevInfo = () => {
  const [info, setInfo] = useState(false);

  return (
    <div
      className="absolute bottom-6 right-6 z-30"
      onMouseEnter={() => setInfo(true)}
      onMouseLeave={() => setInfo(false)}
    >
      <div className="relative flex justify-center items-center bg-neutral-950 p-2 rounded-full cursor-pointer">
        {/* Info Badge */}
        <LuBadgeInfo className="text-2xl text-white" title="info" />

        {/* Tooltip */}
        <div
          className={`w-60
            absolute bottom-6 right-6 p-4 text-sm text-gray-300 bg-neutral-900
            rounded-2xl shadow-lg transform origin-bottom-right transition-all duration-500 ease-in-out
            ${
              info
                ? "opacity-100 scale-x-100 scale-y-100"
                : "opacity-0 scale-x-0 scale-y-0 pointer-events-none"
            }
          `}
        >
          <p className="font-semibold text-xl text-center pb-2">
            Thanks for Visiting!
          </p>
          <p className="text-center">
            Made with 💞 by <br />
            Mohammad Asif
          </p>
          <p className="text-center mt-2">Follow on</p>
          <ul className="flex gap-4 text-xl mt-2 justify-center">
            <a href="https://www.github.com/mohammadasif34">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/mohammadasif34">
              <FaLinkedin />
            </a>
            <a
              href="https://mohammadasif34-portfolio.netlify.app"
              target="_blank"
            >
              <FaGlobe />
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};
