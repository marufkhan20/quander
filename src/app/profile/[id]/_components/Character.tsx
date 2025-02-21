import { useDeleteCharacter, useUpdateCharacter } from "@/api/useCharacters";
import { Dialog } from "@/components/ui/dialog";
import ImageSkeleton from "@/components/ui/image";
import { cn } from "@/lib/utils";
import {
  Edit,
  EllipsisVertical,
  Eye,
  EyeOff,
  LoaderCircle,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  name: string;
  picture?: string | null;
  id: string;
  published: boolean;
  refetch: () => void;
  description: string;
}

const Character = ({
  isAuthor,
  name: dbName,
  picture: dbPicture,
  id,
  published,
  description: dbDescription,
  refetch,
}: IProps) => {
  const [openEditCharacter, setOpenEditCharacter] = useState(false);
  const [openMobileEditCharacter, setOpenMobileEditCharacter] = useState(false);

  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(dbName);
    setPicture(dbPicture || "");
    setDescription(dbDescription);
  }, [dbName, dbDescription, dbPicture]);

  const handleUpdate = (name: string, picture: string, description: string) => {
    setName(name);
    setPicture(picture);
    setDescription(description);
  };

  // update character
  const { mutate, isPending, isSuccess } = useUpdateCharacter();

  useEffect(() => {
    if (!isPending && isSuccess) {
      refetch();
      toast.success("Character updated successfully.");
    }
  }, [isSuccess, isPending, refetch]);

  // delete character
  const {
    mutate: deleteCharacter,
    isPending: isDeleteCharacter,
    isSuccess: isDeleteSuccess,
  } = useDeleteCharacter();

  useEffect(() => {
    if (!isDeleteCharacter && isDeleteSuccess) {
      refetch();
      toast.success("Character deleted successfully.");
    }
  }, [isDeleteSuccess, isDeleteCharacter, refetch]);
  return (
    <div className="p-5 relative pb-10 bg-white-2 rounded-[10px]">
      {picture ? (
        <img
          className="rounded-[10px] w-full object-cover"
          src={picture}
          alt={name}
        />
      ) : (
        <ImageSkeleton className="aspect-square rounded-[10px]" />
      )}

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-[20px] font-medium">{name}</h3>

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

                {published ? (
                  <DropdownMenuItem
                    className="cursor-pointer bg-transparent text-white hover:!bg-primary"
                    onClick={() =>
                      mutate({
                        json: {
                          published: false,
                        },
                        param: {
                          id: id,
                        },
                      })
                    }
                  >
                    <EyeOff /> <span>Hide from profile</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="cursor-pointer bg-transparent text-white hover:!bg-primary"
                    onClick={() =>
                      mutate({
                        json: {
                          published: true,
                        },
                        param: {
                          id: id,
                        },
                      })
                    }
                  >
                    <Eye /> <span>Show in profile</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="cursor-pointer bg-transparent text-red-700 hover:!bg-red-700 hover:!text-white"
                  onClick={() => deleteCharacter({ param: { id } })}
                >
                  <Trash /> <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <p className="mt-4 text-sm text-white/80">{description}</p>
      </div>

      <Dialog open={openEditCharacter} onOpenChange={setOpenEditCharacter}>
        <EditCharacter
          id={id}
          description={description}
          name={name}
          picture={picture || ""}
          setOpen={setOpenEditCharacter}
          published={published}
          handleUpdate={handleUpdate}
        />
      </Dialog>

      {/* mobile */}
      <MobileEditCharacter
        open={openMobileEditCharacter}
        setOpen={setOpenMobileEditCharacter}
        id={id}
        description={description}
        name={name}
        picture={picture || ""}
        published={published}
        handleUpdate={handleUpdate}
      />

      <div
        className={cn(
          "absolute inset-0 z-50 w-full h-full bg-black/50 flex items-center transition-all duration-300 justify-center",
          isPending || isDeleteCharacter
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <LoaderCircle className="animate-spin" />
      </div>
    </div>
  );
};

export default Character;
