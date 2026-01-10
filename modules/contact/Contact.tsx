"use client";

import Image from "next/image";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-white min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
        
        {/* Left Column: Form and Info */}
        <div className="flex flex-col gap-12 max-w-[540px]">
          <div className="flex flex-col gap-6">
            <h1 className="text-[48px] md:text-[64px] font-medium tracking-tight text-black leading-tight">
              Contact Us
            </h1>
            <p className="text-[15px] md:text-[16px] text-gray-800 font-light leading-relaxed">
              Please contact me with any enquiries you may have
            </p>
            <a 
              href="mailto:stephen@mold.me.uk" 
              className="text-[15px] md:text-[16px] text-black font-medium underline underline-offset-4 decoration-1 hover:text-gray-600 transition-colors"
            >
              stephen@mold.me.uk
            </a>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-12 mt-4 text-[#1a1a1a]">
            {/* Name Fields */}
            <div className="flex flex-col gap-6">
              <label className="text-[17px] font-medium">
                Name <span className="text-gray-400 font-normal ml-1">(required)</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                <div className="flex flex-col gap-3">
                  <span className="text-[14px] font-medium text-gray-800">First Name</span>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-400 py-2 focus:border-black outline-none transition-all duration-300 bg-transparent"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[14px] font-medium text-gray-800">Last Name</span>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-400 py-2 focus:border-black outline-none transition-all duration-300 bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-3">
              <label className="text-[17px] font-medium">
                Email <span className="text-gray-400 font-normal ml-1">(required)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-400 py-2 focus:border-black outline-none transition-all duration-300 bg-transparent"
              />
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-3">
              <label className="text-[17px] font-medium">
                Message <span className="text-gray-400 font-normal ml-1">(required)</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={1}
                className="w-full border-b border-gray-400 py-2 focus:border-black outline-none transition-all duration-300 resize-none bg-transparent min-h-[45px]"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit"
                className="px-14 py-4 border border-black rounded-full text-[14px] font-semibold text-black hover:bg-black hover:text-white transition-all duration-500 uppercase tracking-[0.15em] leading-none"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Hero Image with Overlay */}
        <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[800px] overflow-hidden group">
          <Image
            src="/images/contact_hero.png"
            alt="Contact SM Photography"
            fill
            className="object-cover grayscale-[0.2] group-hover:scale-105 transition-transform duration-1000"
            sizes="(max-w-1024px) 100vw, 50vw"
            priority
          />
          {/* Text Overlay */}
          <div className="absolute inset-x-0 top-12 flex justify-center px-4">
            <h2 className="text-[40px] md:text-[68px] font-extrabold text-black uppercase tracking-tighter leading-none text-center select-none MixBlendDifference">
              CONTACT US
            </h2>
          </div>
        </div>

      </div>

      <style jsx>{`
        .MixBlendDifference {
           mix-blend-mode: color-burn; /* Adjusting for clear visibility against the image */
           opacity: 0.9;
        }
      `}</style>
    </section>
  );
};

export default Contact;