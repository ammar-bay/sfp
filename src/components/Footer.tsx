import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className="h-14 inset-x-0 bottom-0 z-30 w-full border-t border-gray-200 bg-[#4F45E4]  backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold text-white">
            <span className="text-white text-2xl">SFP.</span>
          </Link>

          <div className="items-center space-x-2 flex sm:space-x-4 text-white">
            <Link href="/">Terms of Service</Link>
            <Link href="/">Privacy</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
