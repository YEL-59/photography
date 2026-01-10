import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#f8f8f8] text-black py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[28px] md:text-[32px] font-medium tracking-tight uppercase">
            SM Photography
          </h2>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-4 md:items-center">
          <div className="text-left md:text-center">
            <h3 className="text-[18px] md:text-[20px] font-medium mb-3">Location</h3>
            <div className="text-gray-600 text-[14px] leading-relaxed">
              <p>Billericay</p>
              <p>Essex, UK</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4 md:items-end">
          <div className="text-left md:text-right">
            <h3 className="text-[18px] md:text-[20px] font-medium mb-3">Contact</h3>
            <div className="text-gray-600 text-[14px] leading-relaxed">
              <p className="hover:text-black transition-colors cursor-pointer">
                stephen@mold.me.uk
              </p>
              <p>07714303658</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bottom (Optional addition for completeness) */}
      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-gray-200">
        <p className="text-gray-400 text-[12px] uppercase tracking-widest text-center md:text-left">
          © {new Date().getFullYear()} SM PHOTOGRAPHY. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
