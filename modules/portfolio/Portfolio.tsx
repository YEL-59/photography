"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link2, Mail, LayoutGrid, ArrowLeft, Download, Share2, Play, Heart, X as CloseIcon, Copy, MessageCircle, Facebook, Twitter, Pin, AtSign, MoreHorizontal, ShoppingCart, ShoppingBag, Trash2, Layers, Check, Tag, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart, CartItem } from "@/context/CartContext";
import Link from "next/link";

// Mock Data for API Readiness
const CATEGORIES = [
  { id: "all", label: "ALL" },
  { id: "sports", label: "SPORTS PHOTOGRAPHY" },
  { id: "street", label: "STREET" },
  { id: "travel", label: "TRAVEL" },
  { id: "architect", label: "ARCHITECT" },
];

const ALBUMS = [
  {
    id: 1,
    category: "sports",
    title: "VE DYNAMIK SUPER LEAGUE - ESSEX REBELS VS RICHMOND DOCKLANDS",
    date: "14TH DECEMBER, 2025",
    cover: "/images/hero.png",
    images: ["/images/hero.png", "/images/hero.png", "/images/hero.png", "/images/hero.png", "/images/hero.png", "/images/hero.png"],
  },
  {
    id: 2,
    category: "street",
    title: "VIBRANT STREETS - TOKYO NIGHTS",
    date: "20TH NOVEMBER, 2025",
    cover: "/images/street_portfolio_thumb.png",
    images: ["/images/street_portfolio_thumb.png", "/images/street_portfolio_thumb.png", "/images/street_portfolio_thumb.png", "/images/street_portfolio_thumb.png"],
  },
  {
    id: 3,
    category: "architect",
    title: "MINIMALIST STRUCTURES - COPENHAGEN",
    date: "05TH NOVEMBER, 2025",
    cover: "/images/architect_portfolio_thumb.png",
    images: ["/images/architect_portfolio_thumb.png", "/images/architect_portfolio_thumb.png", "/images/architect_portfolio_thumb.png"],
  },
  {
    id: 4,
    category: "travel",
    title: "AMALFI COAST EXPLORATION",
    date: "12TH OCTOBER, 2025",
    cover: "/images/hero.png", // Fallback
    images: ["/images/hero.png", "/images/hero.png"],
  },
];

// Modal Component
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-[500px] p-8 md:p-12 shadow-2xl animate-slide-up ring-1 ring-black/5">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
          <CloseIcon size={20} />
        </button>
        <h2 className="text-[20px] font-bold tracking-[0.1em] uppercase mb-8 text-black">{title}</h2>
        {children}
      </div>
    </div>
  );
};

const Tooltip = ({ children, text }: { children: React.ReactNode; text: string }) => {
  return (
    <div className="relative group/tooltip flex items-center justify-center">
      {children}
      <div className="absolute bottom-full mb-3 px-3 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[120] translate-y-2 group-hover/tooltip:translate-y-0">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-black" />
      </div>
    </div>
  );
};

// Cart Drawer Component
const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cart, removeFromCart, totalItems, totalPrice } = useCart();
  
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex justify-end animate-fade-in">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-[450px] h-full flex flex-col shadow-2xl animate-slide-left">
        <div className="p-8 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-[24px] font-bold tracking-tight uppercase">Your Cart ({totalItems})</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <CloseIcon size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <ShoppingBag size={48} className="text-gray-200" />
              <p className="text-gray-500 font-medium">Your cart is currently empty.</p>
              <button 
                onClick={onClose}
                className="text-[12px] font-bold uppercase tracking-widest underline underline-offset-4"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 animate-fade-in group">
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 overflow-hidden">
                  <Image src={item.url} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-[14px] font-bold uppercase tracking-tight mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-[12px] text-gray-400 font-medium tracking-widest uppercase">Digital Download</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold">£{item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 border-t border-gray-100 space-y-6 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-medium text-gray-500 uppercase tracking-widest">Subtotal</span>
              <span className="text-[20px] font-bold">£{totalPrice.toFixed(2)}</span>
            </div>
            
            {/* Agreement Checkbox */}
            <div className="flex items-start gap-3 my-2">
               <input 
                  type="checkbox" 
                  id="licensing-start"
                  className="mt-1 w-4 h-4 rounded-sm border-gray-300 text-black focus:ring-black accent-black"
                  onChange={(e) => {
                     const btn = document.getElementById('checkout-btn-drawer');
                     if(btn) {
                        if (e.target.checked) {
                           btn.removeAttribute('disabled');
                           btn.classList.remove('opacity-50', 'cursor-not-allowed');
                           btn.classList.add('hover:bg-black/90', 'hover:shadow-xl', 'active:scale-[0.98]');
                        } else {
                           btn.setAttribute('disabled', 'true');
                           btn.classList.add('opacity-50', 'cursor-not-allowed');
                           btn.classList.remove('hover:bg-black/90', 'hover:shadow-xl', 'active:scale-[0.98]');
                        }
                     }
                  }}
               />
               <label htmlFor="licensing-start" className="text-[11px] text-gray-500 leading-snug cursor-pointer select-none font-medium">
                  I agree to the <Link href="/licensing" className="underline text-black decoration-gray-400 underline-offset-2 hover:decoration-black" onClick={() => onClose()}>Licensing & Disclaimer</Link> terms.
               </label>
            </div>

            <p className="text-[12px] text-gray-400 font-medium leading-relaxed">
              Taxes and shipping calculated at checkout if applicable.
            </p>
            <button 
               id="checkout-btn-drawer"
               disabled
               className="w-full bg-black text-white py-5 text-[14px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg opacity-50 cursor-not-allowed"
            >
              Checkout (Stripe)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Photo Detail Modal Component
const PhotoDetailModal = ({ 
  photo, 
  isOpen, 
  onClose, 
  onAddToCart, 
  isInCart,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}: { 
  photo: any, 
  isOpen: boolean, 
  onClose: () => void, 
  onAddToCart: (item: any) => void, 
  isInCart: boolean,
  onNext: () => void,
  onPrev: () => void,
  hasNext: boolean,
  hasPrev: boolean
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onNext, onPrev, hasNext, hasPrev, onClose]);

  if (!isOpen || !photo) return null;
  
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 md:p-8 animate-fade-in">
       {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      {/* Content */}
      <div className="relative w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row animate-slide-up">
        {/* Mobile Close Button */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-50 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors md:hidden text-black"
        >
            <CloseIcon size={24} />
        </button>

        {/* Image Section */}
        <div 
          className="w-full md:w-2/3 h-[50vh] md:h-auto bg-gray-50 relative flex items-center justify-center group overflow-hidden cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
            {/* Navigation Buttons */}
            {hasPrev && (
              <button 
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-black transition-all shadow-lg opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 duration-300"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            
            {hasNext && (
              <button 
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-black transition-all shadow-lg opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 duration-300"
              >
                <ChevronRight size={24} />
              </button>
            )}

            <Image 
                src={photo.url} 
                alt={photo.title} 
                fill 
                className="object-contain p-4 md:p-12 transition-transform duration-300" 
            />
             {/* Gradient Vignette for Focus Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.4)_100%)] z-0 pointer-events-none" />
            
             {/* Watermark */}
            <div className="absolute inset-x-0 inset-y-0 z-10 flex flex-col items-center justify-center opacity-60 select-none pointer-events-none scale-100 md:scale-110">
                <span className="text-[8rem] md:text-[12rem] font-serif leading-none tracking-tight text-white/40 drop-shadow-2xl">SM</span>
                <span className="text-lg md:text-3xl font-light tracking-[0.4em] text-white/50 uppercase mt-[-1rem] md:mt-[-2rem] mb-16 drop-shadow-xl font-sans">PHOTOGRAPHY</span>
                 <div className="w-[40%] h-[1px] bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
                 <span className="text-white/30 text-[8px] md:text-xs tracking-[0.2em] mt-2 uppercase font-medium">© SM Photography Limited</span>
            </div>
            
            {/* View Fullscreen Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-full group-hover:-translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest z-20 pointer-events-none">
                Click to Enlarge
            </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/3 bg-white p-8 md:p-12 flex flex-col overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold uppercase tracking-tight leading-tight">{photo.title}</h2>
                 <button onClick={onClose} className="rounded-full hover:bg-gray-100 p-2 transition-colors hidden md:block">
                   <CloseIcon size={24} className="text-gray-400 hover:text-black" />
                 </button>
            </div>
            
             <div className="flex items-center gap-3 mb-8">
                 <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-widest rounded-sm text-gray-600">
                    <Tag size={12} /> Digital
                 </span>
                 <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-[10px] font-bold uppercase tracking-widest rounded-sm text-green-700">
                    <Check size={12} /> Available
                 </span>
             </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Premium high-resolution digital photography. Perfect for editorial use, prints, or digital displays. Includes full commercial license options.
            </p>

             <div className="mt-auto space-y-6">
                 <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                     <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Price</span>
                     <span className="text-3xl font-bold">£{photo.price?.toFixed(2)}</span>
                 </div>

                 <button 
                     onClick={() => onAddToCart(photo)}
                     className={`w-full py-5 text-[14px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] ${
                         isInCart 
                         ? "bg-green-600 text-white hover:bg-green-700"
                         : "bg-black text-white hover:bg-black/90"
                     }`}
                 >
                     {isInCart ? (
                         <> <Check size={18} /> In Cart </>
                     ) : (
                         <> <ShoppingBag size={18} /> Add to Cart </>
                     )}
                 </button>
                 
                 <div className="grid grid-cols-2 gap-4">
                     <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 text-[11px] font-bold uppercase tracking-widest hover:border-black transition-colors">
                        <Heart size={16} /> Favorite
                     </button>
                      <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 text-[11px] font-bold uppercase tracking-widest hover:border-black transition-colors">
                        <Share2 size={16} /> Share
                     </button>
                 </div>
             </div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div 
            className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-sm flex items-center justify-center cursor-zoom-out animate-fade-in"
            onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
            }}
        >
            <div className="relative w-full h-full p-4 md:p-10 flex items-center justify-center">
                 <Image 
                    src={photo.url} 
                    alt={photo.title} 
                    fill 
                    className="object-contain select-none" 
                    quality={100}
                    priority
                 />
                 
                 {/* Zoomed Watermark */}
                 <div className="absolute inset-x-0 inset-y-0 z-10 flex flex-col items-center justify-center opacity-50 select-none pointer-events-none scale-125">
                    <span className="text-[12rem] md:text-[20rem] font-serif leading-none tracking-tight text-white/30 drop-shadow-2xl">SM</span>
                    <span className="text-2xl md:text-5xl font-light tracking-[0.5em] text-white/40 uppercase mt-[-1.5rem] md:mt-[-3rem] mb-24 drop-shadow-xl">PHOTOGRAPHY</span>
                     <div className="w-[45%] h-[1.5px] bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
                 </div>
                 
                 <button 
                    className="absolute top-6 right-6 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors text-black"
                    onClick={() => setIsZoomed(false)}
                 >
                    <CloseIcon size={24} />
                 </button>
            </div>
        </div>
      )}
    </div>
  );
};

const Portfolio = () => {
  const [view, setView] = useState<"grid" | "album">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAlbum, setSelectedAlbum] = useState<typeof ALBUMS[0] | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Modal States
  const [activeModal, setActiveModal] = useState<null | "favorites" | "share" | "download" | "cart" | "buy-all">(null);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const { cart, addToCart, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate 40 dummy images for the selected album
  const DUMMY_GALLERY = Array.from({ length: 40 }).map((_, i) => ({
    id: `photo-${selectedAlbum?.id || 0}-${i}`,
    url: `https://picsum.photos/seed/${(selectedAlbum?.id || 0) * 100 + i}/800/1200`,
    title: `${selectedAlbum?.title || "Photo"} #${i + 1}`,
    price: 4.00
  }));

  const filteredAlbums = selectedCategory === "all" 
    ? ALBUMS 
    : ALBUMS.filter(album => album.category === selectedCategory);

  const handleAlbumClick = (album: typeof ALBUMS[0]) => {
    setSelectedAlbum(album);
    setView("album");
    setVisibleCount(6);
    // Add album param to URL so Navbar can detect album view
    const url = new URL(window.location.href);
    url.searchParams.set("album", album.id.toString());
    window.history.pushState({}, "", url.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setView("grid");
    setSelectedAlbum(null);
    // Remove album param from URL
    const url = new URL(window.location.href);
    url.searchParams.delete("album");
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    if (view !== "album") return;
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        if (visibleCount < DUMMY_GALLERY.length) {
          setVisibleCount((prev) => Math.min(prev + 6, DUMMY_GALLERY.length));
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [view, visibleCount, DUMMY_GALLERY.length]);

  if (view === "album" && selectedAlbum) {
    return (
      <div className="min-h-screen bg-white text-black">
        <CartDrawer isOpen={activeModal === "cart"} onClose={() => setActiveModal(null)} />
        <PhotoDetailModal 
            photo={selectedPhoto} 
            isOpen={!!selectedPhoto} 
            onClose={() => setSelectedPhoto(null)} 
            onAddToCart={(item) => !cart.some(i => i.id === item.id) && addToCart(item)}
            isInCart={cart.some(i => i.id === selectedPhoto?.id)}
            onNext={() => {
              const currentIndex = DUMMY_GALLERY.findIndex(p => p.id === selectedPhoto?.id);
              if (currentIndex < DUMMY_GALLERY.length - 1) {
                setSelectedPhoto(DUMMY_GALLERY[currentIndex + 1]);
              }
            }}
            onPrev={() => {
               const currentIndex = DUMMY_GALLERY.findIndex(p => p.id === selectedPhoto?.id);
               if (currentIndex > 0) {
                 setSelectedPhoto(DUMMY_GALLERY[currentIndex - 1]);
               }
            }}
            hasNext={selectedPhoto ? DUMMY_GALLERY.findIndex(p => p.id === selectedPhoto.id) < DUMMY_GALLERY.length - 1 : false}
            hasPrev={selectedPhoto ? DUMMY_GALLERY.findIndex(p => p.id === selectedPhoto.id) > 0 : false}
        />
        
        {/* Album Hero */}
        <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden group">
          <Image
            src={selectedAlbum.cover}
            alt={selectedAlbum.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 flex flex-col md:row items-end justify-between gap-8 text-white">
            <div className="flex flex-col gap-4 max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight uppercase">
                {selectedAlbum.title}
              </h1>
              <p className="text-sm md:text-base font-medium opacity-80 uppercase tracking-widest">
                {selectedAlbum.date}
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveModal("cart")}
                className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded-sm text-[12px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl"
              >
                <ShoppingBag size={18} />
                View Cart ({totalItems})
              </button>
            </div>
          </div>

          <div className="absolute top-8 left-8 flex items-center gap-4 text-white z-20">
             <button 
              onClick={handleBack}
              className="flex items-center gap-2 bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 px-4 rounded-full transition-all text-sm font-medium border border-white/10"
             >
                <ArrowLeft size={18} />
                Back
             </button>
          </div>
        </div>

        {/* Gallery Grid Header */}
        <div className="max-w-[1440px] mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div className="flex flex-col">
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-1">{selectedAlbum.title}</h2>
                    <p className="text-[10px] text-gray-500 font-medium">SM PHOTOGRAPHY LIMITED</p>
                </div>
                <div className="flex items-center gap-6 text-gray-400">
                    <Tooltip text="Buy All Photos">
                      <div 
                        className="cursor-pointer hover:text-black transition-colors p-1" 
                        onClick={() => setActiveModal("buy-all")}
                      >
                        <Layers size={20} />
                      </div>
                    </Tooltip>
                    <Tooltip text="View Cart">
                      <div className="relative cursor-pointer group hover:text-black transition-colors" onClick={() => setActiveModal("cart")}>
                        <ShoppingBag size={20} />
                        {totalItems > 0 && (
                          <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {totalItems}
                          </span>
                        )}
                      </div>
                    </Tooltip>
                    <Tooltip text="Download All">
                      <Download size={18} className="cursor-pointer hover:text-black" onClick={() => setActiveModal("download")} />
                    </Tooltip>
                    <Tooltip text="Share Gallery">
                      <Share2 size={18} className="cursor-pointer hover:text-black" onClick={() => setActiveModal("share")} />
                    </Tooltip>
                    <Tooltip text="Slideshow">
                      <Play size={18} className="cursor-pointer hover:text-black" />
                    </Tooltip>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                {DUMMY_GALLERY.slice(0, visibleCount).map((img, index) => {
                  const isInCart = cart.some(i => i.id === img.id);
                  return (
                    <div 
                      key={img.id} 
                      className="relative aspect-[3/4] overflow-hidden group bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedPhoto(img)}
                    >
                        <Image
                            src={img.url}
                            alt={img.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        {/* Watermark Overlay */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-[5]" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-50 group-hover:opacity-70 transition-all duration-300 z-10">
                            <span className="text-7xl md:text-8xl font-serif font-black text-white/90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">SM</span>
                            <span className="text-[10px] md:text-xs tracking-[0.3em] text-white font-bold uppercase mt-[-8px] drop-shadow-md">PHOTOGRAPHY</span>
                        </div>
                        {/* Status Badge */}
                        {isInCart && (
                          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 animate-fade-in shadow-lg">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            In Cart
                          </div>
                        )}
                        {/* Interactive Icons on Hover */}
                        <div className="absolute bottom-6 right-6 flex items-center gap-5 text-white translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                             <Tooltip text={isInCart ? "In Cart" : "Add to Cart"}>
                               <div 
                                 className={`hover:scale-125 transition-all p-2 rounded-full ${isInCart ? 'bg-black/40' : 'hover:bg-black/20'}`}
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   if (!isInCart) addToCart({ id: img.id, url: img.url, title: img.title, price: img.price });
                                 }}
                               >
                                  <ShoppingCart size={20} className={isInCart ? "text-green-400" : ""} />
                               </div>
                             </Tooltip>
                             <Tooltip text="Favorite">
                               <div className="hover:scale-125 transition-all p-2 rounded-full hover:bg-black/20" onClick={() => setActiveModal("favorites")}>
                                  <Heart size={20} className="fill-transparent hover:fill-white" />
                               </div>
                             </Tooltip>
                             <Tooltip text="Share Image">
                               <div className="hover:scale-125 transition-all p-2 rounded-full hover:bg-black/20" onClick={() => setActiveModal("share")}>
                                  <Share2 size={20} />
                               </div>
                             </Tooltip>
                        </div>
                    </div>
                  );
                })}
            </div>

            {/* Loading Indicator */}
            {visibleCount < DUMMY_GALLERY.length && (
              <div className="flex justify-center mt-16 pb-20">
                  <div className="flex gap-1 items-center text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/20 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-black/20 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-black/20 animate-bounce [animation-delay:0.4s]"></span>
                      <span className="ml-2">Loading More Images</span>
                  </div>
              </div>
            )}
        </div>

        {/* MODALS */}
        <Modal isOpen={activeModal === "favorites"} onClose={() => setActiveModal(null)} title="Favorites">
          <div className="flex flex-col gap-6">
            <p className="text-[15px] text-gray-700 leading-relaxed font-normal">
              Save your favorite photos and revisit them at anytime using your email address. You can share this list with your photographer, family and friends.
            </p>
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full border border-gray-300 p-4 text-[15px] focus:border-black outline-none transition-all placeholder:text-gray-300"
            />
            <div className="flex items-center justify-between mt-2">
              <button className="text-[13px] text-gray-400 hover:text-black transition-colors border-b border-transparent hover:border-gray-400 pb-0.5">
                Why do you need my email?
              </button>
              <button className="bg-[#2d2d2d] text-white px-10 py-4 text-[13px] font-bold tracking-widest uppercase hover:bg-black transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={activeModal === "share"} onClose={() => setActiveModal(null)} title="Share">
          <div className="flex flex-col gap-10">
            <div className="flex">
              <div className="flex-1 bg-[#f5f5f5] p-4 text-[14px] text-gray-600 font-medium truncate border border-r-0 border-gray-100">
                {mounted ? window.location.href : ""}
              </div>
              <button 
                onClick={() => {
                  if (typeof window !== "undefined") {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="bg-[#2d2d2d] text-white px-8 flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase hover:bg-black transition-colors"
              >
                <Copy size={16} />
                Copy
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-y-10">
               {[
                 { icon: <MessageCircle />, label: "Messenger" },
                 { icon: <Play className="rotate-90" />, label: "WhatsApp" },
                 { icon: <Facebook />, label: "Facebook" },
                 { icon: <Mail />, label: "Email" },
                 { icon: <Twitter />, label: "X (Twitter)" },
                 { icon: <Pin />, label: "Pinterest" },
                 { icon: <AtSign />, label: "Threads" },
                 { icon: <MoreHorizontal />, label: "More" },
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center group-hover:bg-black transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium tracking-tight whitespace-nowrap">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </Modal>

        <Modal isOpen={activeModal === "buy-all"} onClose={() => setActiveModal(null)} title="Buy All Images">
          <div className="flex flex-col gap-8">
            <div className="p-6 bg-gray-50 rounded-sm border border-gray-100">
              <h3 className="text-[14px] font-bold uppercase tracking-tight mb-2">{selectedAlbum.title}</h3>
              <p className="text-[12px] text-gray-500 font-medium tracking-wide leading-relaxed">
                Purchase all images from this album as a single bundle. You'll receive high-resolution digital downloads for every photo in this collection.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-[13px] font-medium text-gray-500 uppercase tracking-widest">Total Images</span>
                <span className="text-[14px] font-bold">40 Photos</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[13px] font-medium text-gray-500 uppercase tracking-widest">Bundle Price</span>
                <div className="flex flex-col items-end">
                  <span className="text-[24px] font-bold">£15.00</span>
                  <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Saving over 90%</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                addToCart({ 
                  id: `bundle-${selectedAlbum.id}`, 
                  url: selectedAlbum.cover, 
                  title: `FULL ALBUM: ${selectedAlbum.title}`, 
                  price: 15.00 
                });
                setActiveModal("cart");
              }}
              className="w-full bg-black text-white py-5 text-[14px] font-bold uppercase tracking-[0.2em] hover:bg-black/90 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <Check size={18} />
              Confirm & Checkout
            </button>
            <p className="text-[10px] text-gray-400 text-center font-medium uppercase tracking-[0.1em]">
              Secure payment via Stripe
            </p>
          </div>
        </Modal>

      </div>
    );
  }

  return (
    <section className="bg-white min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-6 mb-16 text-center animate-fade-in">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-xl border-4 border-white hover:rotate-10 :rotate-0 transition-all duration-300">
            <Image
              src="/images/about.webp" // Using the photographer portrait
              alt="Profile"
              fill
              className="object-cover "
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-gray-900 leading-none">
              SM PHOTOGRAPHY LIMITED
            </h1>
          </div>
          <div className="flex flex-col items-center gap-3 mt-2 text-sm md:text-base font-medium text-gray-500">
            <div className="flex items-center gap-3 hover:text-black cursor-pointer transition-colors">
              <Link2 size={16} />
              <span>sm-photography.com</span>
            </div>
            <div className="flex items-center gap-3 hover:text-black cursor-pointer transition-colors">
              <Mail size={16} />
              <span>contact@sm-photog.co</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="w-full flex justify-center mb-20 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-8 md:gap-12 whitespace-nowrap px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-[12px] font-bold tracking-[0.1em] transition-all duration-300 relative py-2 ${
                  selectedCategory === cat.id ? "text-black" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {cat.label}
                {selectedCategory === cat.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black animate-scale-in"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Album Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 w-full animate-slide-up">
          {filteredAlbums.map((album) => (
            <div
              key={album.id}
              className="group cursor-pointer flex flex-col gap-6"
              onClick={() => handleAlbumClick(album)}
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-gray-100 rounded-[2px]">
                <Image
                  src={album.cover}
                  alt={album.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-2 items-center text-center px-4">
                <h3 className="text-[13px] md:text-[14px] font-bold tracking-tight uppercase leading-snug group-hover:opacity-70 transition-opacity">
                  {album.title}
                </h3>
                <span className="text-[10px] md:text-[11px] font-medium text-gray-400 tracking-[0.05em]">
                  {album.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default Portfolio;