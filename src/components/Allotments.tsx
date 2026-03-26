import Link from "next/link";

interface AllotmentItem {
  title: string;
  size: string;
  description: string;
  type: string;
}

export default function Allotments({ items }: { items: AllotmentItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-[#062014] via-[#173124] to-[#1a3a28] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-primary-fixed/5 blur-[150px]" />

      <div className="relative max-w-screen-2xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span className="font-label uppercase tracking-[0.15em] text-primary-fixed-dim text-sm">Investment Opportunities</span>
          <h2 className="font-headline text-4xl md:text-5xl text-white mt-3">Allotments</h2>
          <p className="text-primary-fixed/70 text-sm mt-3 max-w-lg mx-auto">
            Premium township and industrial plot allotments along the Yamuna Expressway corridor, ideal for builders and developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="bg-primary-fixed-dim/20 text-primary-fixed-dim text-[10px] uppercase tracking-wider px-3 py-1.5 rounded font-label font-semibold">
                  {item.type}
                </span>
                <svg className="w-6 h-6 text-primary-fixed/40 group-hover:text-primary-fixed-dim transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>

              <h3 className="font-headline text-2xl md:text-3xl text-white mb-2">{item.title}</h3>
              <p className="font-headline text-xl text-primary-fixed-dim mb-4">{item.size}</p>
              <p className="text-primary-fixed/60 text-sm leading-relaxed mb-6">{item.description}</p>

              <Link
                href={`/properties?type=${item.type === "Township" ? "Residential" : "Industrial"}`}
                className="inline-flex items-center gap-2 text-primary-fixed text-xs font-label uppercase tracking-wider hover:text-white transition-colors"
              >
                Explore Options
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#inquiry"
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-md font-label uppercase tracking-[0.15em] text-xs hover:bg-white/20 transition-all inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            Inquire About Allotments
          </Link>
        </div>
      </div>
    </section>
  );
}
