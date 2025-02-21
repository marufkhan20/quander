/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";
import { DialogContent, DialogTitle } from "./ui/dialog";

const AuthModal = () => {
  return (
    <DialogContent className="hidden lg:max-w-[600px] bg-transparent bg-[#0d0d0d] lg:block border-none">
      <DialogTitle />
      <AuthModalContent />
    </DialogContent>
  );
};

const AuthModalContent = ({
  className,
  setOpen,
}: {
  className?: string;
  setOpen?: (value: boolean) => void;
}) => {
  return (
    <div
      className={cn("w-full rounded-xl px-5 sm:px-[100px] relative", className)}
      onClick={(e) => e.stopPropagation()}
    >
      <X
        onClick={() => setOpen && setOpen(false)}
        className="absolute size-[30px] cursor-pointer right-5 top-5 block lg:hidden"
      />
      <h2 className="font-semibold text-[50px] sm:text-[78px] leading-[93px] logo text-center my-[100px] sm:my-5 tracking-tighter">
        quander
      </h2>

      <div className="mt-10 text-center">
        <h3 className="text-[23px] font-semibold tracking-tighter mb-3">
          Sign in to your account
        </h3>
        <p>Link your Google account access all features.</p>
        <button
          className="w-full py-[14px] px-5 text-center bg-primary text-black font-semibold text-lg rounded-xl transition-all hover:scale-105 mt-7 flex items-center justify-center gap-[14px]"
          onClick={() => signIn("google")}
        >
          <img src="/images/icons/google.svg" className="size-5" alt="google" />
          Continue with Google
        </button>

        <p className="text-center text-xs mt-20 mb-5">
          By continuing, you accept our Privacy Policy and Term of Use
        </p>
      </div>
    </div>
  );
};

export const AuthModalMobile = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <div
      className={cn(
        "fixed bg-black/40 flex lg:hidden items-end inset-0 w-screen h-full z-50 opacity-0 invisible transition-all duration-300",
        open && "opacity-100 visible"
      )}
      onClick={() => setOpen(false)}
    >
      <AuthModalContent
        className={cn(
          "transition-all duration-300 bg-[#0d0d0d] translate-y-[100%]",
          open && "translate-y-0"
        )}
        setOpen={setOpen}
      />
    </div>
  );
};

export default AuthModal;
