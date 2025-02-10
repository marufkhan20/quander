import { DialogContent, DialogTitle } from "./ui/dialog";

const AuthModal = () => {
  return (
    <DialogContent className="bg-[#0d0d0d] border-none max-w-[570px] rounded-xl px-[100px]">
      <DialogTitle />
      <h2 className="font-semibold text-[78px] leading-[93px] logo text-center my-5 tracking-tighter">
        quander
      </h2>

      <div className="mt-10 text-center">
        <h3 className="text-[23px] font-semibold tracking-tighter mb-3">
          Sign in to your account
        </h3>
        <p>Link your Google account access all features.</p>
        <button className="w-full py-[14px] px-5 text-center bg-primary text-black font-semibold text-lg rounded-xl transition-all hover:scale-105 mt-7">
          Continue with Google
        </button>

        <p className="text-center text-xs mt-20 mb-5">
          By continuing, you accept our Privacy Policy and Term of Use
        </p>
      </div>
    </DialogContent>
  );
};

export default AuthModal;
