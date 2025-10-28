export const ToolRange = ({ size, setBrushWidth }) => {
  return (
    <>
      <div className="px- py-0.5 rounded-xl bg-neutral-700 absolute left-16 -translate-x-1/2  flex items-center gap-4 rotate-270">
        <span className="rotate-90 translate-x-5 text-sm">{size}</span>
        <input
          type="range"
          min={1}
          max={10}
          value={size}
          onChange={(e) => setBrushWidth(e.target.value)}
          className="h-5 scale-75 text-blue-500"
        />
      </div>
    </>
  );
};
