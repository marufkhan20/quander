/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useUpdateProfile } from "@/api/useProfile";
import CustomButton from "@/components/ui/custom-button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import ImageSkeleton from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { LucideLoader2, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  name: string;
  profilePic: string;
  description: string;
  setOpen: (value: boolean) => void;
  handleUpdate: (name: string, profilePic: string, description: string) => void;
}

const EditProfile = ({
  name,
  profilePic,
  handleUpdate,
  description,
  setOpen,
}: IProps) => {
  return (
    <DialogContent className="hidden lg:block bg-[#0d0d0d] border-none max-w-[550px] rounded-xl px-[30px]">
      <DialogTitle />
      <EditProfileContent
        name={name}
        setOpen={setOpen}
        profilePic={profilePic}
        description={description}
        handleUpdate={handleUpdate}
      />
    </DialogContent>
  );
};

interface ContentIProps extends IProps {
  className?: string;
}

const EditProfileContent = ({
  className,
  setOpen,
  description: oldDescription,
  handleUpdate,
  name,
  profilePic,
}: ContentIProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setDescription(oldDescription);
    setImage(profilePic);

    const parts = name.trim().split(" ");
    const firstName = parts[0]; // Always the first word
    const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";

    setFirstName(firstName);
    setLastName(lastName);
  }, [name, profilePic, oldDescription]);

  // upload profile picture
  const captureImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUploading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileType = file.type;

      // Get presigned URL
      const res = await fetch(`/api/get-presigned-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name, // Fixed issue
          contentType: fileType,
          folder: "users",
        }),
      });

      if (!res.ok) throw new Error("Failed to get pre-signed URL");

      const { presignedUrl, finalUrl } = await res.json();

      // Upload file to S3
      const uploadRes = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": fileType },
      });

      if (!uploadRes.ok) throw new Error("Failed to upload image to S3");

      // Set uploaded image URL
      setImage(finalUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageUploading(false);
    }
  };

  // update profile api
  const {
    mutate,
    isPending: isLoading,
    isSuccess,
    isError,
  } = useUpdateProfile();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Profile updated successfully.");
      handleUpdate(firstName + " " + lastName, image, description);
      setOpen(false);
    }

    if (!isLoading && isError) {
      toast.error("Server error occurred while updating profile.");
    }
  }, [isLoading, isSuccess, isError]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      json: {
        firstName,
        lastName,
        description,
        image,
      },
      param: {
        id: id as string,
      },
    });
  };
  return (
    <div className={cn(className)} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg sm:text-[22px] font-semibold">Edit Profile</h2>
        <X
          onClick={() => setOpen && setOpen(false)}
          className="block lg:hidden size-[22px] cursor-pointer"
        />
      </div>

      <div className="mt-9 lg:w-[340px] mx-auto flex items-center gap-4">
        <div className="relative">
          {image ? (
            <img
              className="size-[140px] rounded-[10px] object-cover"
              src={image || "/images/profile-img.avif"}
              alt="profile"
            />
          ) : (
            <ImageSkeleton className="size-[140px] rounded-[10px]" />
          )}
          <div
            className={`absolute transition-all duration-300 ${
              imageUploading ? "opacity-100 visible" : "opacity-0 invisible"
            } flex items-center justify-center inset-0 w-full h-full rounded-[10px] bg-gray-300`}
          >
            <LucideLoader2 className="transition-all animate-spin text-xl" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label className="py-2 w-full sm:px-10 border border-white/20 text-sm text-white/80 inline-block outline-none rounded-[9px] transition-all hover:bg-primary hover:border-primary cursor-pointer hover:text-black">
            Upload Picture
            <input
              type="file"
              onChange={captureImage}
              name=""
              id=""
              className="hidden"
              disabled={imageUploading}
            />
          </label>
          <button
            className="py-2 w-full sm:px-10 border border-white/20 text-sm text-white/80 inline-block outline-none rounded-[9px] transition-all hover:bg-red-800 hover:border-red-800 hover:text-white"
            disabled={imageUploading}
            onClick={() => setImage("")}
          >
            Delete Picture
          </button>
        </div>
      </div>

      <div className="mt-9">
        <form onSubmit={submitHandler} className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="first-name"
                className="uppercase text-white/30 font-medium text-sm"
              >
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="bg-white/5 outline-none p-[14px] rounded-lg text-lg font-medium"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="last-name"
                className="uppercase text-white/30 font-medium text-sm"
              >
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="last-name"
                placeholder="Last name"
                className="bg-white/5 outline-none p-[14px] rounded-lg text-lg font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="Description"
              className="uppercase text-white/30 font-medium text-sm"
            >
              Description
            </label>
            <textarea
              id="Description"
              placeholder="Enter your profile description"
              className="bg-white/5 outline-none p-[14px] rounded-lg text-lg font-medium min-h-[150px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex w-full justify-center items-center">
            <CustomButton type="submit" loading={isLoading}>
              Save Changes
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

interface MobileIProps extends IProps {
  open: boolean;
}

export const MobileEditProfile = ({
  open,
  name,
  profilePic,
  handleUpdate,
  description,
  setOpen,
}: MobileIProps) => {
  return (
    <div
      className={cn(
        "lg:hidden fixed z-50 inset-0 h-full w-full bg-black/40 flex items-end transition-all duration-300 opacity-0 invisible",
        open && "opacity-100 visible"
      )}
      onClick={() => setOpen(false)}
    >
      <EditProfileContent
        className={cn(
          "bg-[#212121] w-full p-[30px] rounded-tl-[10px] rounded-tr-[10px] transition-all duration-300 translate-y-[100%]",
          open && "translate-y-0"
        )}
        name={name}
        setOpen={setOpen}
        profilePic={profilePic}
        description={description}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default EditProfile;
