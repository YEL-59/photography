"use client";

import React from "react";
import { ShieldCheck, Copyright, FileText, UserCheck, Scale, AlertCircle } from "lucide-react";

const Licensing = () => {
  const POLICY_ITEMS = [
    {
      icon: <UserCheck size={28} />,
      title: "Non-Exclusive License",
      description: "When you purchase an image, you are acquiring a non-exclusive license. This means other customers may also purchase and use the same image. The image is not removed from the marketplace after your purchase."
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Personal Use Only",
      description: "The purchased license allows for personal use only. Commercial redistribution, resale, or use in products for sale is strictly prohibited unless explicitly authorized in a separate commercial agreement."
    },
    {
      icon: <Copyright size={28} />,
      title: "Copyright Retention",
      description: "Full copyright and intellectual property rights remain with the photographer at all times. Purchasing an image allows you to use it, but it does not transfer ownership of the original work."
    },
    {
      icon: <FileText size={28} />,
      title: "Ownership Transfer",
      description: "Transfer of ownership or full exclusive rights can only occur through a bespoke written agreement. If you require exclusive rights, please contact us directly to arrange a custom contract."
    }
  ];

  return (
    <section className="bg-white min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-6 mb-20 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-2">
            <Scale size={32} className="text-black" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-[0.2em] uppercase text-gray-900 leading-tight">
            Licensing & Disclaimer
          </h1>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl leading-relaxed tracking-wide">
            We believe in transparency. Below are the terms governing the purchase and use of images from our marketplace.
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 w-full mb-20 animate-slide-up">
          {POLICY_ITEMS.map((item, index) => (
            <div key={index} className="flex flex-col gap-6 p-8 bg-gray-50/50 hover:bg-gray-50 transition-colors rounded-sm border border-gray-100 group">
              <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 shadow-sm text-gray-900 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-[14px] font-bold uppercase tracking-widest text-black">
                  {item.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-7 font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Disclaimer */}
        <div className="w-full bg-black text-white p-10 md:p-12 text-center flex flex-col items-center gap-6 animate-slide-up [animation-delay:0.2s]">
          <AlertCircle size={32} className="text-white/80" />
          <div className="flex flex-col gap-4 max-w-2xl">
            <h4 className="text-[16px] font-bold uppercase tracking-widest">
              Important Legal Notice
            </h4>
            <p className="text-[13px] text-gray-400 leading-relaxed font-medium tracking-wide">
              All images on this site are watermarked for protection. The watermark is removed only upon purchase of a license. Unauthorized use of watermarked images is a violation of copyright law.
            </p>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default Licensing;
