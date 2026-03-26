"use client";

interface TopPickItem {
  title: string;
  url: string; // YouTube Shorts / Reels embed URL
}

export default function TopPicks({ items }: { items: TopPickItem[] }) {
  if (!items || items.length === 0) return null;

  // Convert YouTube URLs to embed URLs
  function getEmbedUrl(url: string) {
    // Handle youtube.com/shorts/ID
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;

    // Handle youtu.be/ID
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

    // Handle youtube.com/watch?v=ID
    const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

    // Handle already-embed URLs or Instagram reels
    return url;
  }

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span className="font-label uppercase tracking-[0.15em] text-secondary text-sm">Trending</span>
          <h2 className="font-headline text-4xl md:text-5xl text-primary mt-3">Top Picks</h2>
          <p className="text-on-surface-variant text-sm mt-3 max-w-md mx-auto">
            Watch our latest property tours, market insights, and Yamuna Expressway highlights
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, i) => (
            <div key={i} className="card-lift rounded-xl overflow-hidden shadow-sm border border-outline-variant/20 bg-white">
              <div className="relative aspect-[9/16]">
                <iframe
                  src={getEmbedUrl(item.url)}
                  title={item.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              {item.title && (
                <div className="p-3">
                  <p className="text-xs font-label text-primary line-clamp-2">{item.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
