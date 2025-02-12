import { cn } from "@/lib/utils";

interface IProps {
  activeVoting?: boolean;
  activeChallenge?: boolean;
}

const ChallengeItem = ({ activeChallenge, activeVoting }: IProps) => {
  return (
    <div
      className={cn(
        "rounded-[10px] bg-white-2 min-h-[70px] flex flex-col items-center justify-center transition-all hover:bg-[#20211d] cursor-pointer hover:scale-105 text-white/80"
      )}
    >
      <h3 className="leading-[36px]">February 11</h3>
      {(activeChallenge || activeVoting) && (
        <div className="mt-1 flex items-center gap-1">
          <div className="size-[5px] rounded-full bg-primary" />
          <span className="text-xs">
            {activeChallenge ? "Challenge active" : "Voting ongoing"}
          </span>
        </div>
      )}
    </div>
  );
};

export default ChallengeItem;
