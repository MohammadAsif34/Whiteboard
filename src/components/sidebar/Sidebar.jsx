import React, { useEffect, useState } from "react";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";

const Sidebar = ({ loadCanvas, deleteCanvas }) => {
  const [isSisebar, setIsSidebar] = useState(false);
  return (
    <div className="w-fit h-fit text-white absolute top-22 left-0  z-20 transition-all  duration-500 ease-in-out">
      <div
        title="Menu"
        className="border border-neutral-500 border-l-0 bg-neutral-950 p-2 rounded-r-2xl cursor-default transition-all duration-500 ease-in-out"
      >
        <div
          className={` w-full text-2xl flex items-center gap-4 transition-transform duration-500 ease-in-out cursor-pointer`}
          onClick={() => setIsSidebar((p) => !p)}
        >
          <span
            className={`${
              isSisebar && "rotate-180 translate-x-50"
            } transition-all duration-500 ease-in-out`}
          >
            <RiMenuUnfoldLine />
          </span>
          {/* {isSisebar && <span className="text-xl">Menu</span>} */}
        </div>
        <div
          className={`${
            isSisebar ? "w-60 h-[75vh]" : "w-0 h-0"
          }  transition-all duration-500 ease-in-out `}
        >
          {isSisebar && (
            <SavedFile loadCanvas={loadCanvas} deleteCanvas={deleteCanvas} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const SavedFile = ({ loadCanvas, deleteCanvas }) => {
  const [sheets, setSheets] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const [isVisible, setVisisble] = useState(false);

  useEffect(() => {
    const whiteboard = JSON.parse(localStorage.getItem("whiteboard"));
    if (whiteboard) setSheets(whiteboard);

    const timer = setTimeout(() => setVisisble(true), 100);
    return () => clearTimeout(timer);
  }, [refresh]);

  const handhleDeleteFile = (filename) => {
    const check = window.confirm("Are you sure to delete ? '" + filename + "'");
    if (!check) return;
    deleteCanvas(filename);
    setRefresh((p) => !p);
  };

  return (
    <>
      <div
        className={`h-full px-2 py-2 mt-2 border-t border-gray-500  transition-opacity duration-700 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } `}
      >
        <h1 className="text-sm text-gray-300">Sheets</h1>
        {sheets ? (
          <ul className="h-[95%] px-2 py-1 text-sm text-gray-400 flex flex-col gap-y-4 overflow-y-auto scroll-custom ">
            {sheets?.map((sh, idx) => (
              <li
                key={idx}
                onClick={() => loadCanvas(sh)}
                className="group flex justify-between"
              >
                {idx + 1 + ". " + sh.filename}
                <button
                  className="hidden  group-hover:inline-block px-1 py-0.5 rounded-2xl hover:bg-neutral-700 cursor-pointer"
                  onClick={() => handhleDeleteFile(sh.filename)}
                >
                  <MdClose />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-4 text-center text-xs text-gray-500">
            opps!! <br />
            WhiteBoard Sheets <br /> not found!
          </div>
        )}
      </div>
    </>
  );
};
