import { Dialog } from "@/components/ui/dialog";
import { Edit, EllipsisVertical, EyeOff, Trash } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import EditCharacter, { MobileEditCharacter } from "./EditCharacter";

/* eslint-disable @next/next/no-img-element */
interface IProps {
  isAuthor?: boolean;
}

const Character = ({ isAuthor }: IProps) => {
  const [openEditCharacter, setOpenEditCharacter] = useState(false);
  const [openMobileEditCharacter, setOpenMobileEditCharacter] = useState(false);
  return (
    <div className="p-5 pb-10 bg-white-2 rounded-[10px]">
      <img
        className="rounded-[10px] w-full object-cover"
        src="/images/character.avif"
        alt="character"
      />
      <div className="mt-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-[20px] font-medium">Ziggy Zoom</h3>

          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <button className="size-6 flex items-center justify-center bg-black/70 rounded-md cursor-pointer z-40 transition-all hover:bg-primary/70 hover:text-black">
                  <EllipsisVertical className="size-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-5 bg-black/80 backdrop-blur-[20px] border-none rounded-[10px] flex flex-col gap-3">
                <DropdownMenuItem
                  onClick={() => setOpenEditCharacter(true)}
                  className="hidden lg:flex items-center cursor-pointer bg-transparent text-white hover:!bg-primary"
                >
                  <Edit /> <span>Edit character</span>
                </DropdownMenuItem>

                {/* mobile */}
                <DropdownMenuItem
                  onClick={() => setOpenMobileEditCharacter(true)}
                  className="flex items-center lg:hidden cursor-pointer bg-transparent text-white hover:!bg-primary"
                >
                  <Edit /> <span>Edit character</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer bg-transparent text-white hover:!bg-primary">
                  <EyeOff /> <span>Hide from profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer bg-transparent text-red-700 hover:!bg-red-700 hover:!text-white">
                  <Trash /> <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <p className="mt-4 text-sm text-white/80">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
          consectetur?
        </p>
      </div>

      <Dialog open={openEditCharacter} onOpenChange={setOpenEditCharacter}>
        <EditCharacter />
      </Dialog>

      {/* mobile */}
      <MobileEditCharacter
        open={openMobileEditCharacter}
        setOpen={setOpenMobileEditCharacter}
      />
    </div>
  );
};

export default Character;
