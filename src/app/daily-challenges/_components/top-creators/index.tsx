import Creator from "./Creator";

const TopCreators = () => {
  return (
    <div className="p-5 bg-white-2 rounded-[10px]">
      <h2 className="text-white/60 font-semibold text-lg">
        Top Creators Today
      </h2>

      <div className="mt-[20px] flex flex-col gap-[10px] divide-y-[1px] divide-white/5">
        <Creator position={1} />
        <Creator position={2} />
        <Creator position={3} />
        <Creator position={4} />
      </div>
    </div>
  );
};

export default TopCreators;
