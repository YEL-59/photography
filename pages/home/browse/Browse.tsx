const Browse = () => {
  return (
    <section className="bg-black text-white py-24 md:py-32 flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-[40px] md:text-[64px] font-medium tracking-tight">
          Browse BTFC Matches
        </h2>
        <p className="text-[16px] md:text-[20px] text-gray-400 font-light tracking-wide">
          Download full match galleries
        </p>
        <div className="pt-6">
          <button className="px-10 py-3 border border-white/40 rounded-full text-[14px] font-medium hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest">
            BTFC Matches
          </button>
        </div>
      </div>
    </section>
  );
};

export default Browse;