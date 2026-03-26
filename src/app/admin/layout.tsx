"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" },
  { href: "/admin/properties", label: "Properties", icon: "M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7z" },
  { href: "/admin/enquiries", label: "Enquiries", icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
  { href: "/admin/settings", label: "Settings", icon: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-surface-container-low">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col bg-white border-r border-outline-variant/20 min-h-screen">
          <div className="p-6 border-b border-outline-variant/20">
            <h2 className="font-headline text-xl text-primary">Admin Panel</h2>
            <p className="text-xs text-on-surface-variant mt-1">RealtyWize Management</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {NAV_ITEMS.map(({ href, label, icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-primary-fixed/30 text-primary font-semibold"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={icon} />
                  </svg>
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-outline-variant/20 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-error hover:text-error/80 transition-colors w-full"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
              </svg>
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-outline-variant/20 z-50 flex justify-around py-2">
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] ${
                  isActive ? "text-primary font-semibold" : "text-on-surface-variant"
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={icon} />
                </svg>
                {label}
              </Link>
            );
          })}
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 pb-20 md:pb-8">{children}</main>
      </div>
    </div>
  );
}
