"use client";

import { ShoppingBag, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const isLightPage = pathname === "/contact" || pathname === "/about" || pathname === "/portfolio" || pathname === "/cart" || pathname?.startsWith("/matches");

  const matches = [
    "BTFC vs Hashtag United 030126",
    "BTFC vs Carshalton 201225",
    "BTFC vs Wellington United 221125",
    "Broadbridge Heath vs BTFC 041025",
    "BTFC vs Hednesford 300925",
    "Hednesford vs BTFC",
    "BTFC vs Berkhamstead",
    "BTFC vs Ramsgate",
    "BTFC vs Barton Rovers 300825",
    "BTFC vs Cray Wanderers 230825",
    "BTFC vs Wingate & Finchley",
    "BTFC vs Aldershot Town",
    "BTFC vs Chatham Velocity Cup",
    "BTFC vs Folkestone Invicta 18th Apr 2025",
  ];

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
          
          {/* Dropdown for BTFC Matches */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-all duration-300 py-2">
              BTFC Matches
              <ChevronDown 
                size={16} 
                className={`mt-0.5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} 
              />
            </div>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[320px] bg-white text-black shadow-2xl rounded-xl overflow-hidden transition-all duration-300 origin-top transform ${
              isDropdownOpen ? "opacity-100 scale-100 translate-y-2 visibility-visible" : "opacity-0 scale-95 translate-y-0 pointer-events-none"
            }`}>
              <div className="max-h-[400px] overflow-y-auto py-3 custom-scrollbar">
                {matches.map((match, index) => (
                  <Link
                    key={index}
                    href={`/matches/${match.toLowerCase().replace(/ /g, "-")}`}
                    className="block px-6 py-3 text-[14px] hover:bg-black/5 transition-colors duration-200 border-b border-gray-50 last:border-0"
                  >
                    {match}
                  </Link>
                ))}
              </div>
            </div>
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
        <div className={`flex items-center gap-6 transition-colors duration-300 ${navTextColor}`}>
          <Link href="/cart" className="relative group p-1">
            <ShoppingBag
              size={24}
              className="cursor-pointer group-hover:scale-110 transition-transform duration-300"
            />
            {totalItems > 0 && (
              <span className={`absolute -top-1 -right-1 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ring-2 transition-colors ${
                isScrolled || !isLightPage ? "bg-white text-black ring-black/20" : "bg-black text-white ring-white"
              }`}>
                {totalItems}
              </span>
            )}
          </Link>
          <Menu className="md:hidden cursor-pointer" size={28} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
