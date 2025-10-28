import { IoIosUndo } from "react-icons/io";
export const UndoDo = () => {
  return (
    <>
      <div className=" px-2 py-2  absolute -bottom-20 left-0 rounded-md bg-neutral-900 flex flex-col gap-1 items-center justify-center">
        <button className="px-0.5 py-0.5 rounded-md hover:bg-neutral-700 cursor-pointer">
          <IoIosUndo />
        </button>
        <button className="px-0.5 py-0.5  scale-x-[-1] rounded-md hover:bg-neutral-700 cursor-pointer ">
          <IoIosUndo />
        </button>
      </div>
    </>
  );
};
