import { cn } from "@/lib/utils";

interface IProps {
  status: "active" | "voting" | "close";
  selectedChallenge: boolean;
  date: string;
  setSelectedChallenge: (value: string) => void;
  id: string;
}

const ChallengeItem = ({
  status,
  date,
  selectedChallenge,
  setSelectedChallenge,
  id,
}: IProps) => {
  return (
    <div
      className={cn(
        "rounded-[10px] bg-white-2 min-h-[80px] flex flex-col items-center justify-center transition-all hover:bg-[#20211d] cursor-pointer hover:scale-105 text-white/80",
        selectedChallenge && "bg-[#20211d]"
      )}
      onClick={() => setSelectedChallenge(id)}
    >
      <h3 className="leading-[36px]">{date}</h3>
      {status === "voting" && (
        <div className="mt-1 flex items-center gap-1">
          <div className="size-[5px] rounded-full bg-primary" />
          <span className="text-xs">Voting ongoing</span>
        </div>
      )}

      {status === "active" && (
        <div className="mt-1 flex items-center gap-1">
          <div className="size-[5px] rounded-full bg-primary" />
          <span className="text-xs">Challenge Active</span>
        </div>
      )}
    </div>
  );
};

export default ChallengeItem;

export function ChallengeItemLoading() {
  return (
    <div className="rounded-[10px] bg-white/[0.02] min-h-[80px] flex flex-col items-center justify-center">
      {/* Date placeholder */}
      <div className="h-[36px] w-24 bg-white/[0.08] rounded-md animate-pulse" />

      {/* Status indicator placeholder */}
      <div className="mt-1 flex items-center gap-1">
        <div className="h-3 w-20 bg-white/[0.08] rounded-md animate-pulse" />
      </div>
    </div>
  );
}
