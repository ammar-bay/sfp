import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-[#4F45E4] backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span className="text-white text-2xl">SFP.</span>
          </Link>

          <MobileNav />

          <div className="hidden items-center space-x-4 sm:flex">
            <Link
              className={buttonVariants({
                size: "sm",
                className:
                  "bg-white !text-[#4F45E4] font-semibold hover:bg-white",
              })}
              href="/order"
            >
              Get started <ArrowRight className="ml-1.5 h-5 w-5" />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
