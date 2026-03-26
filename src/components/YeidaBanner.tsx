import Image from "next/image";

export default function YeidaBanner() {
  return (
    <section className="relative py-20 md:py-28 px-8 overflow-hidden bg-gradient-to-br from-[#062014] via-[#173124] to-[#1a3a28]">
      {/* Decorative glows */}
      <div className="absolute top-[-100px] right-[-50px] w-[400px] h-[400px] rounded-full bg-primary-fixed/5 blur-[120px]" />
      <div className="absolute bottom-[-80px] left-[-60px] w-[400px] h-[400px] rounded-full bg-primary-fixed/3 blur-[120px]" />

      <div className="relative max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Left: Logo & Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-5 mb-8">
              <Image
                src="/yieda-logo.png"
                alt="YEIDA Logo"
                width={112}
                height={112}
                className="h-20 md:h-28 w-auto drop-shadow-lg"
              />
              <div>
                <p className="font-label uppercase tracking-[0.2em] text-[10px] md:text-xs text-primary-fixed-dim mb-1">
                  Yamuna Expressway
                </p>
                <p className="font-label uppercase tracking-[0.2em] text-[10px] md:text-xs text-primary-fixed-dim">
                  Industrial Development Authority
                </p>
              </div>
            </div>

            <h2 className="font-headline text-4xl md:text-6xl text-white leading-tight mb-6">
              The Future <span className="text-primary-fixed-dim">is Here</span>
            </h2>

            <div className="w-16 h-[2px] bg-gradient-to-r from-primary-fixed-dim to-transparent mb-6 mx-auto md:mx-0" />

            <p className="text-primary-fixed/80 text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0 mb-8">
              India&apos;s most ambitious expressway corridor connecting Greater Noida to Agra — unlocking unprecedented growth in real estate, infrastructure, and industrial development.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="/properties"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-md font-label uppercase tracking-[0.15em] text-xs hover:bg-white/20 transition-all inline-flex items-center gap-2"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                View Properties
              </a>
              <a
                href="/about"
                className="bg-primary-fixed-dim/20 backdrop-blur-md text-primary-fixed border border-primary-fixed/20 px-8 py-3 rounded-md font-label uppercase tracking-[0.15em] text-xs hover:bg-primary-fixed-dim/30 transition-all inline-flex items-center gap-2"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                Learn More
              </a>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="w-full md:w-auto">
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 text-center">
                <p className="font-headline text-3xl md:text-4xl text-white mb-1">
                  165<span className="text-primary-fixed-dim text-xl">km</span>
                </p>
                <p className="text-primary-fixed/60 text-xs font-label uppercase tracking-widest">Expressway Length</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 text-center">
                <p className="font-headline text-3xl md:text-4xl text-white mb-1">6</p>
                <p className="text-primary-fixed/60 text-xs font-label uppercase tracking-widest">Lane Expressway</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 text-center">
                <p className="font-headline text-3xl md:text-4xl text-white mb-1">
                  5<span className="text-primary-fixed-dim text-xl">+</span>
                </p>
                <p className="text-primary-fixed/60 text-xs font-label uppercase tracking-widest">Mega Projects</p>
              </div>
            </div>

            <div className="mt-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-fixed-dim flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <div>
                  <p className="text-white text-sm font-medium mb-1">Key Landmarks</p>
                  <p className="text-primary-fixed/60 text-xs leading-relaxed">
                    Noida International Airport (Jewar) &bull; Buddha Circuit &bull; Formula 1 Track &bull; Film City &bull; Night Safari
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
