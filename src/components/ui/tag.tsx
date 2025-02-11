import { cn } from "@/lib/utils";

interface IProps {
  tag: string;
  selectedTag: string;
  setSelectedTag: (value: string) => void;
}

const Tag = ({ tag, selectedTag, setSelectedTag }: IProps) => {
  return (
    <div
      className="flex items-center gap-[10px] px-3 py-4 bg-white/5 rounded-md cursor-pointer"
      onClick={() => setSelectedTag(tag)}
    >
      <div
        className={cn(
          "size-3 rounded-full border",
          selectedTag === tag && "bg-primary border-primary"
        )}
      />
      {tag}
    </div>
  );
};

export default Tag;
