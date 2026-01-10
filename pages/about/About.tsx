import Image from "next/image";
import Link from "next/link";
import Img from "@/assets/images/about.webp"

const About = () => {
  return (
    <section className="bg-[#f2f2f2] min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          <h1 className="text-[48px] md:text-[64px] font-medium tracking-tight text-black leading-tight">
            About
          </h1>
          
          <div className="flex flex-col gap-6 text-[15px] md:text-[16px] text-gray-800 font-light leading-relaxed max-w-[640px]">
            <p>
              Welcome to Stephen Mold Photography! With a passion for capturing the world through a lens, I am an experienced amateur photographer specializing in sports, architectural, street, and travel photography. My journey began with a simple love for photography, which has since evolved into a dedicated pursuit of capturing the essence of special moments and structures.
            </p>

            <p>
              <strong className="font-bold text-black">Sports Photography:</strong> From the adrenaline of a last-minute goal to the grace of a perfect dive, I strive to freeze the most exhilarating moments in sports. My work aims to convey the intensity and emotion of athletes in action. Billericay Town Football Club have linked to this site as part of their match gallery{" "}
              <Link 
                href="https://www.billericaytownfc.co.uk" 
                target="_blank" 
                className="text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-1 transition-colors"
                rel="noopener noreferrer"
              >
                https://www.billericaytownfc.co.uk
              </Link>.
            </p>

            <p>
              <strong className="font-bold text-black">Architectural Photography:</strong> Buildings are amazing, and I am here to record them through my camera. Whether it&apos;s the intricate details of a historic monument or the sleek lines of modern architecture, I capture the beauty and uniqueness of structures from around the world.
            </p>

            <p>
              <strong className="font-bold text-black">Street Photography:</strong> The streets are alive with stories waiting to be told. My street photography captures candid moments, vibrant cultures, and the everyday life that often goes unnoticed. Each photograph is a glimpse into the soul of a city.
            </p>

            <p>
              <strong className="font-bold text-black">Travel Photography:</strong> Traveling opens up a world of endless possibilities. Through my travel photography, I aim to share the breathtaking landscapes, diverse cultures, and unforgettable experiences that make each journey special. Every photo is a window into a different part of the world.
            </p>

            <p>
              Join me as I continue to explore and capture the beauty of our world, one photograph at a time.
            </p>
          </div>
        </div>

        {/* Right Column: Portrait Image */}
        <div className="relative w-full aspect-square lg:aspect-auto lg:h-[800px] order-1 lg:order-2">
          <Image
            src={Img}
            alt="Stephen Mold - Photographer"
            fill
            className="object-cover grayscale"
            sizes="(max-w-1024px) 100vw, 50vw"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default About;
