import { FaMinus, FaPlus } from "react-icons/fa";

export const Zoom = ({ whiteboard }) => {
  const { zoomIn, zoomOut, resetZoom, zoom } = whiteboard;
  return (
    <>
      <div className="z-10 px-2 py-2 absolute bottom-2 left-3 rounded-md bg-neutral-900 flex gap-1 items-center justify-center">
        <button
          className="px-0.5 py-0.5 rounded-md hover:bg-neutral-700 cursor-pointer"
          onClick={zoomIn}
        >
          <FaPlus />
        </button>
        <button
          className="px-2 py-0.5 text-xs rounded-md  "
          onClick={resetZoom}
        >
          {/* <BiReset /> */}
          {zoom * 100} %
        </button>
        <button
          className="px-0.5 py-0.5  scale-x-[-1] rounded-md hover:bg-neutral-700 cursor-pointer "
          onClick={zoomOut}
        >
          <FaMinus />
        </button>
      </div>
    </>
  );
};
