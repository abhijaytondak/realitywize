import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="font-headline text-6xl text-primary mb-4">404</h1>
        <h2 className="font-headline text-2xl text-primary mb-4">Page Not Found</h2>
        <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-on-primary px-8 py-3 rounded-md font-label uppercase tracking-[0.15em] text-xs hover:bg-primary-container transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/properties"
            className="border border-primary text-primary px-8 py-3 rounded-md font-label uppercase tracking-[0.15em] text-xs hover:bg-primary hover:text-on-primary transition-all"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
