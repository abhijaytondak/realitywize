"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDENix6kyl3cuiaOqboPVrV8ceyGbru_NgZQ28DbkHZGPr_r6vjAqGwjt-dIRFQvfxtYCai9qTaVlYkyMyQ-5oZUSjdt1u7CNSI6gEeI2SHmkKKGO7ZHVunKJH7RSiCigF-lvrytskbKb2KYKWQMkZzzb1K_a4WIVo2EM_SdTAtqbtJh-crazNX3E61jYc5CsQ2CwGg13cSalf9NufOeXDdzduNd1fd_FoHMus7feud1Ahc3ZzGUfGIrlOiK-ACw3kTkn0PKTbOcfFo",
    alt: "Formula Racing Track on Yamuna Expressway",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCczT_f7-34sa69IctHVblIBM5BQpqgq1pUn2a2Q_C5jQ9lkxPpVBwD_NNZ77kD9IXxzo3Ph9jY8e3oM94mUW82MDvKlJ_giAdOGjGJbWwEY82ByzdThYABHjgZ8CM1gIovbio5Me1j6i8Q4Y9ouUIdBtBLow3OKgT9VECPaavWndtTLbhp2HhsVDAqVu6r2kOVnKhzL7LLvRX_khm70a2ZlmT_ETRfvl_JN0oS2vG5bHHcvW8eNkSixE1rC7e76YqvmNvuJO0LYk35",
    alt: "Noida International Airport (Jewar Airport)",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPMck7ip76QWbLtRNn4H9v6T_Ccu-J4ltSzPrv5LswPVH0BG7LpJf84yDmTRMIu775aDPjKJjxZtrAdvGeceYtVMoJiq1WMNz60Q7fykhRktQn48y4nbGHzl_U8g8u0qYcTR0gUmTly8rGOAjtQ_xHCkR7PcfOpwVuD-SAUizRONq0P89uEnbZBhh4wJptW86q5y5Qm80w9XiB1jX-e0YX1Hw_X_g01lov2UaDbIIknohRjUOTkaEPH9yBRucTf_UumkTxCZiUG5J6",
    alt: "Buddha International Circuit, Greater Noida",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="absolute inset-0">
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
          />
        </div>
      ))}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40 z-10" />

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
