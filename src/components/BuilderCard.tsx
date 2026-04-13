import Image from "next/image";
import Link from "next/link";

interface BuilderProject {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  investment_range: string;
  min_entry_amount: string | null;
  collaboration_type: string;
  location: string;
  project_type: string;
  image_url: string;
  is_featured: boolean;
}

interface BuilderCardProps {
  project: BuilderProject;
}

export default function BuilderCard({ project }: BuilderCardProps) {
  return (
    <Link
      href={`/builders/${project.slug}`}
      className="block bg-white rounded-xl border border-outline-variant/20 shadow-sm card-lift overflow-hidden group"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {project.is_featured && (
          <span className="absolute top-3 left-3 bg-primary text-on-primary text-[10px] font-label uppercase tracking-widest px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-headline text-lg text-on-surface-variant leading-snug">
          {project.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span>{project.location}</span>
        </div>

        {/* Investment range badge */}
        <div>
          <span className="inline-block bg-primary-fixed/30 text-primary rounded-full px-3 py-1 text-xs font-label">
            {project.investment_range}
          </span>
        </div>

        {/* Min entry */}
        {project.min_entry_amount && (
          <p className="text-sm text-on-surface-variant">
            Entry from <span className="font-medium text-primary">{project.min_entry_amount}</span>
          </p>
        )}

        {/* Collaboration type */}
        <p className="text-xs text-on-surface-variant">{project.collaboration_type}</p>

        {/* Description */}
        <p className="text-sm text-on-surface-variant line-clamp-2">
          {project.short_description}
        </p>

        {/* View Details link */}
        <span className="inline-flex items-center gap-1 text-primary font-label uppercase tracking-wider text-xs mt-2">
          View Details
          <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
