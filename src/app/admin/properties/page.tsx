import Link from "next/link";
import { SAMPLE_PROPERTIES } from "@/lib/sample-data";

export default function AdminPropertiesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-2xl md:text-3xl text-primary">Properties</h1>
        <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-lg">
          Connect Supabase to add/edit properties
        </span>
      </div>

      <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Title</th>
                <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Type</th>
                <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Price</th>
                <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Location</th>
                <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Status</th>
                <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Actions</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_PROPERTIES.map((property) => (
                <tr key={property.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-headline text-primary text-sm">{property.title}</p>
                      <p className="text-xs text-on-surface-variant">{property.subtype}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-primary-fixed/20 text-primary px-2 py-1 rounded">{property.type}</span>
                  </td>
                  <td className="px-6 py-4 font-headline text-primary">
                    {property.price ? `\u20B9${property.price}` : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{property.city}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded ${property.is_active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                      {property.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/properties/${property.slug}`}
                      className="text-xs text-primary hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
