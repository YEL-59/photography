"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, ArrowLeft, ShoppingBag, CreditCard } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-100 pb-12">
          <div className="flex flex-col gap-4">
            <Link 
              href="/portfolio" 
              className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Portfolio
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">Your Selection</h1>
          </div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-[0.2em]">
            {totalItems} {totalItems === 1 ? 'Item' : 'Items'} in bag
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-8 animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center">
              <ShoppingBag size={40} className="text-gray-200" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold uppercase tracking-tight">Your cart is empty</h2>
              <p className="text-gray-400 max-w-sm mx-auto">
                Discover our curated photography collections and select your favorite pieces to add them here.
              </p>
            </div>
            <Link 
              href="/portfolio" 
              className="bg-black text-white px-12 py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-black/90 transition-all shadow-xl"
            >
              Browse Portfolio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 animate-slide-up">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-10">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-8 pb-10 border-b border-gray-50 group hover:border-gray-200 transition-colors">
                  <div className="relative w-full sm:w-48 aspect-[3/4] bg-gray-50 overflow-hidden ring-1 ring-black/5">
                    <Image 
                      src={item.url} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold uppercase tracking-tight leading-tight">{item.title}</h3>
                        <span className="text-xl font-bold">£{item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">Digital Download • High Resolution</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-8">
                      <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-green-500">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Available Immediately
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors group/btn"
                      >
                        <Trash2 size={18} />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-gray-50 p-8 md:p-12 sticky top-32 ring-1 ring-black/[0.03]">
                <h2 className="text-[18px] font-bold uppercase tracking-[0.1em] mb-10 pb-6 border-b border-gray-200">Order Summary</h2>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-center text-gray-500">
                    <span className="text-[13px] font-medium uppercase tracking-widest">Subtotal</span>
                    <span className="text-[15px] font-bold text-black">£{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500">
                    <span className="text-[13px] font-medium uppercase tracking-widest">Digital Tax (0%)</span>
                    <span className="text-[15px] font-bold text-black">£0.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-12 pt-6 border-t border-gray-200">
                  <span className="text-[15px] font-bold uppercase tracking-[0.2em]">Total</span>
                  <span className="text-3xl font-bold">£{totalPrice.toFixed(2)}</span>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-black text-white py-5 flex items-center justify-center gap-3 text-[14px] font-bold uppercase tracking-[0.2em] hover:bg-black/90 transition-all shadow-lg active:scale-[0.98]">
                    <CreditCard size={18} />
                    Pay with Stripe
                  </button>
                  <p className="text-[11px] text-center text-gray-400 leading-relaxed max-w-[250px] mx-auto">
                    Secure checkout powered by Stripe. All major cards accepted.
                  </p>
                </div>

                {/* Benefits */}
                <div className="mt-12 space-y-6 pt-10 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-sm ring-1 ring-black/5">
                      <ArrowLeft size={14} className="rotate-180" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Instant Download</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-sm ring-1 ring-black/5">
                      <ArrowLeft size={14} className="rotate-180" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Full Commercial License</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CartPage;
