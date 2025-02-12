import { Facebook, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-5 sm:px-10 md:px-14 lg:px-20 mt-10 pt-5 sm:pt-10 md:pt-14 lg:pt-20 bg-black overflow-hidden">
      <div className="flex justify-between gap-5 flex-wrap pb-12 border-b border-white/30 z-10 flex-col-reverse lg:flex-row">
        <div>
          <h2 className="text-[28px] leading-[35px] md:text-[36px] md:leading-[45px] font-medium">
            Enable Humanity
            <br />
            To Bring Their Ideas To Life
          </h2>
          <div className="flex items-center gap-5 mt-8">
            <div className="size-12 rounded-full bg-white/10 flex items-center justify-center transition-all hover:bg-primary hover:text-black cursor-pointer hover:scale-105">
              <Facebook />
            </div>
            <div className="size-12 rounded-full bg-white/10 flex items-center justify-center transition-all hover:bg-primary hover:text-black cursor-pointer hover:scale-105">
              <Twitter />
            </div>
            <div className="size-12 rounded-full bg-white/10 flex items-center justify-center transition-all hover:bg-primary hover:text-black cursor-pointer hover:scale-105">
              <Youtube />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-primary" />
            <p>Quick links</p>
          </div>

          <div className="mt-5 flex items-center flex-wrap gap-5">
            <Link
              className="py-3 px-5 bg-white/10 rounded-lg transition-all hover:bg-primary hover:text-black"
              href="#"
            >
              Home
            </Link>
            <Link
              className="py-3 px-5 bg-white/10 rounded-lg transition-all hover:bg-primary hover:text-black"
              href="#"
            >
              About Us
            </Link>
            <Link
              className="py-3 px-5 bg-white/10 rounded-lg transition-all hover:bg-primary hover:text-black"
              href="#"
            >
              Contact Us
            </Link>
            <Link
              className="py-3 px-5 bg-white/10 rounded-lg transition-all hover:bg-primary hover:text-black"
              href="#"
            >
              Tutorial
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-5 flex-wrap text-sm sm:text-base md:text-lg z-10">
        <p>&copy; 2025 AITube. All rights reserved.</p>

        <div>
          <Link href="#">Privacy Policy</Link>
        </div>
      </div>

      <h2 className="text-[20vw] lg:text-[25vw] text-center text-white/10 logo font-semibold -mt-[10%] select-none -mb-[15%] -z-20">
        quander
      </h2>
    </footer>
  );
};

export default Footer;
