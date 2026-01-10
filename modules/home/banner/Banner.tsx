import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image using Next.js Image */}
      <div className="absolute inset-0 z-0 scale-105 animate-slow-zoom">
        <Image
          src="/images/hero.jpg"
          alt="SM Photography Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 flex flex-col items-center gap-2 md:gap-4">
        <h1 className="text-[40px] md:text-[84px] font-semibold tracking-tight leading-tight mb-2 selection:bg-white selection:text-black">
          SM Photography
        </h1>
        <p className="text-[14px] md:text-[22px] font-medium tracking-[0.1em] md:tracking-[0.25em] opacity-90 max-w-[90%] md:max-w-none">
          Capturing Sport, Architecture, Street & Travel
        </p>

        <div className="mt-8 md:mt-12">
          <Link href="/portfolio"><button className="px-10 md:px-16 py-3 md:py-4 border-[1.5px] border-white/50 rounded-full text-[13px] md:text-[15px] font-semibold hover:bg-white hover:text-black transition-all duration-700 backdrop-blur-[2px] tracking-[0.15em] uppercase group">
            <span className="group-hover:scale-110 transition-transform inline-block">
              Portfolio
            </span>
          </button></Link>
          
        </div>
      </div>

      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
    </section>
  );
};

export default Banner;
