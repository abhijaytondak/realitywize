import Link from "next/link";
import Image from "next/image";
import { Property } from "@/lib/types";

export default function PropertyCard({ property }: { property: Property }) {
  const primaryImage = property.images.find((i) => i.is_primary) || property.images[0];

  return (
    <Link href={`/properties/${property.slug}`} className="group block">
      <div className="card-lift bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/20">
        {/* Image */}
        <div className="img-zoom relative aspect-[4/3]">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt_text}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={70}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-surface-container flex items-center justify-center">
              <svg className="w-12 h-12 text-outline" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
          )}
          {/* Tags */}
          {property.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex gap-1.5">
              {property.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-primary/90 text-on-primary text-[10px] uppercase tracking-wider px-2.5 py-1 rounded font-label font-semibold backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {/* Transaction type badge */}
          <span className="absolute top-3 right-3 bg-secondary/90 text-on-secondary text-[10px] uppercase tracking-wider px-2.5 py-1 rounded font-label font-semibold backdrop-blur-sm">
            {property.transaction_type}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-headline text-lg text-primary group-hover:text-primary-container transition-colors line-clamp-1">
              {property.title}
            </h3>
          </div>

          {property.subtitle && (
            <p className="text-on-surface-variant text-xs mb-2 line-clamp-1">{property.subtitle}</p>
          )}

          <div className="flex items-center gap-1 text-on-surface-variant text-xs mb-3">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="line-clamp-1">{property.address}</span>
          </div>

          {/* Attributes row */}
          <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-4">
            {property.type && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7z" />
                </svg>
                {property.subtype}
              </span>
            )}
            {property.area && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 11.01L3 11v2h18v-2zM3 16h12v2H3v-2zM21 6H3v2.01L21 8V6z" />
                </svg>
                {property.area.toLocaleString()} {property.area_type}
              </span>
            )}
            {property.bedrooms && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V7H1v10h2v-3h18v3h2V11c0-2.21-1.79-4-4-4z" />
                </svg>
                {property.bedrooms} BHK
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
            <span className="font-headline text-xl text-primary">
              {property.price ? `\u20B9${property.price}` : "Price on Request"}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-secondary font-label font-semibold">
              View Details &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
