"use client";

import { ShoppingBag, ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Logo from "@/assets/images/logo.webp";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Dropdown stay-open logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered) {
      setIsDropdownOpen(true);
    } else {
      timer = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  const navTextColor = isScrolled || !isLightPage ? "text-white" : "text-black";
  const logoInvert = isScrolled || !isLightPage ? "invert brightness-0 grayscale" : "";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-lg py-4 shadow-sm" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src={Logo} 
              alt="SM Photography" 
              width={70} 
              height={70} 
              className={`object-contain transition-all duration-300 ${logoInvert} opacity-90 hover:opacity-100`} 
            />
          </Link>
        </div>

        {/* Desktop Links */}
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
            className="relative flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-all duration-300 py-2 ${isDropdownOpen ? "opacity-70" : ""}`}>
              BTFC Matches
              <ChevronDown 
                size={16} 
                className={`mt-0.5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} 
              />
            </div>
            
            {/* Dropdown Menu */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 w-[320px] bg-white/95 backdrop-blur-md text-black shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden border border-black/5 transition-all duration-300 origin-top transform ${
                isDropdownOpen ? "opacity-100 scale-100 translate-y-3 pointer-events-auto" : "opacity-0 scale-95 translate-y-0 pointer-events-none"
              }`}
            >
              <div className="max-h-[400px] overflow-y-auto py-4 px-2 custom-scrollbar text-left">
                <div className="px-4 py-2 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Recent Matches
                </div>
                {matches.map((match, index) => (
                  <Link
                    key={index}
                    href={`/matches/${match.toLowerCase().replace(/ /g, "-")}`}
                    className="flex flex-col px-4 py-2.5 rounded-lg hover:bg-black/5 transition-all duration-200 group/item"
                    onClick={() => setIsHovered(false)}
                  >
                    <span className="text-[14px] font-medium leading-tight group-hover/item:translate-x-1 transition-transform duration-200">
                      {match.split(" ").slice(0, -1).join(" ")}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                      {match.split(" ").pop()}
                    </span>
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

          {/* Mobile Menu Trigger via Sheet */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <div className="p-2 -mr-2 cursor-pointer group active:scale-95 transition-transform">
                  <div className="w-7 h-[2px] bg-current mb-1.5 transition-all duration-300 group-hover:w-full"></div>
                  <div className="w-5 h-[2px] bg-current mb-1.5 transition-all duration-300 group-hover:w-full ml-auto"></div>
                  <div className="w-7 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></div>
                </div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-[400px] bg-white border-l-0 p-0 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto px-8 pt-20 pb-10">
                  <div className="mb-12">
                     <Image src={Logo} alt="Logo" width={100} height={80} className="grayscale" />
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <Link 
                        key={link.href} 
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-[32px] font-bold tracking-tight transition-all duration-300 hover:text-gray-400 ${pathname === link.href ? "text-black" : "text-gray-300"}`}
                      >
                        {link.name}
                      </Link>
                    ))}

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="matches" className="border-b-0">
                        <AccordionTrigger className={`py-0 hover:no-underline text-[32px] font-bold tracking-tight transition-all duration-300 ${pathname?.startsWith("/matches") ? "text-black" : "text-gray-300"}`}>
                          Matches
                        </AccordionTrigger>
                        <AccordionContent className="pt-6 pb-2">
                          <div className="flex flex-col gap-4 pl-4 border-l-2 border-gray-100">
                            {matches.map((match, index) => (
                              <Link
                                key={index}
                                href={`/matches/${match.toLowerCase().replace(/ /g, "-")}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between group py-1"
                              >
                                <div className="flex flex-col">
                                  <span className="text-[16px] font-semibold text-gray-800 line-clamp-1">{match.split(" ").slice(0, -1).join(" ")}</span>
                                  <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{match.split(" ").pop()}</span>
                                </div>
                                <ArrowRight size={16} className="text-gray-300 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>

                <div className="p-8 bg-gray-50 border-t border-gray-100">
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Sm Photography Limited</p>
                    <p className="text-[12px] font-medium text-gray-500">© 2026. All rights reserved.</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
