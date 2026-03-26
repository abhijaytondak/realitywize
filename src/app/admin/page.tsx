import Link from "next/link";
import { getAllProperties, getEnquiries } from "@/lib/supabase/queries";

export const revalidate = 0; // always fresh for admin

export default async function AdminDashboard() {
  const [properties, enquiries] = await Promise.all([
    getAllProperties(),
    getEnquiries(),
  ]);

  const activeProperties = properties.filter((p) => p.is_active).length;
  const featuredProperties = properties.filter((p) => p.is_featured).length;
  const newEnquiries = enquiries.filter((e) => e.status === "new").length;

  const stats = [
    { label: "Total Properties", value: properties.length, href: "/admin/properties", color: "bg-primary-fixed/30 text-primary" },
    { label: "Active Listings", value: activeProperties, href: "/admin/properties", color: "bg-green-50 text-green-700" },
    { label: "Featured", value: featuredProperties, href: "/admin/properties", color: "bg-amber-50 text-amber-700" },
    { label: "New Enquiries", value: newEnquiries, href: "/admin/enquiries", color: "bg-blue-50 text-blue-700" },
  ];

  return (
    <div>
      <h1 className="font-headline text-2xl md:text-3xl text-primary mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, href, color }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-xl p-6 border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-label uppercase tracking-wider text-on-surface-variant mb-2">{label}</p>
            <p className={`font-headline text-3xl rounded-lg inline-block px-3 py-1 ${color}`}>{value}</p>
          </Link>
        ))}
      </div>

      <h2 className="font-headline text-xl text-primary mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/properties" className="bg-white rounded-xl p-6 border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-fixed/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7z" /></svg>
          </div>
          <div>
            <p className="font-headline text-sm text-primary">Manage Properties</p>
            <p className="text-xs text-on-surface-variant">Add, edit, or remove listings</p>
          </div>
        </Link>
        <Link href="/admin/enquiries" className="bg-white rounded-xl p-6 border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
          </div>
          <div>
            <p className="font-headline text-sm text-primary">View Enquiries</p>
            <p className="text-xs text-on-surface-variant">{newEnquiries} new leads</p>
          </div>
        </Link>
        <Link href="/admin/settings" className="bg-white rounded-xl p-6 border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" /></svg>
          </div>
          <div>
            <p className="font-headline text-sm text-primary">Settings</p>
            <p className="text-xs text-on-surface-variant">Update contact info</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
