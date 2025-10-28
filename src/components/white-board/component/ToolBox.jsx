export const ToolBox = ({ children }) => {
  return (
    <>
      <div className="px-4 py-2 rounded-xl bg-neutral-700 absolute left-16 -translate-x-1/2 top-1/2 flex items-center gap-4 rotate-270">
        {children}
      </div>
    </>
  );
};
