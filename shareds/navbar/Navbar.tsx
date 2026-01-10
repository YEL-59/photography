"use client";

import { ShoppingBag, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isLightPage = pathname === "/contact" || pathname === "/about";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navTextColor = isScrolled || !isLightPage ? "text-white" : "text-black";
  const logoInvert = isScrolled || !isLightPage ? "invert brightness-0 grayscale" : "";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-black/60 backdrop-blur-lg py-4 shadow-sm" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="SM Photography" 
              width={48} 
              height={48} 
              className={`object-contain transition-all duration-300 ${logoInvert} opacity-90 hover:opacity-100`} 
            />
          </Link>
        </div>

        {/* Links */}
        <div className={`hidden md:flex items-center gap-12 font-medium text-[16px] tracking-wide transition-colors duration-300 ${navTextColor}`}>
          <Link
            href="/"
            className="relative transition-all duration-300 hover:opacity-70"
          >
            Home
            {pathname === "/" && (
              <span className={`absolute -bottom-1 left-0 w-full h-[1.5px] ${isScrolled || !isLightPage ? "bg-white" : "bg-black"}`}></span>
            )}
          </Link>
          <div className="flex items-center gap-1.5 cursor-pointer group hover:opacity-70 transition-all duration-300">
            BTFC Matches
            <ChevronDown size={16} className="mt-0.5" />
          </div>
          <Link href="/portfolio" className="hover:opacity-70 transition-all duration-300">
            Portfolio
          </Link>
          <Link href="/about" className="hover:opacity-70 transition-all duration-300">
            About
          </Link>
          <Link href="/contact" className="hover:opacity-70 transition-all duration-300">
            Contact
          </Link>
        </div>

        {/* Action & Mobile Menu */}
        <div className={`flex items-center gap-6 text-xl transition-colors duration-300 ${navTextColor}`}>
          <ShoppingBag
            size={24}
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
          />
          <Menu className="md:hidden cursor-pointer" size={28} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
