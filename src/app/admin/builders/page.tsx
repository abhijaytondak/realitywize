"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BuilderProject {
  id: string;
  slug: string;
  title: string;
  investment_range: string;
  location: string;
  collaboration_type: string;
  project_type: string;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
}

export default function AdminBuildersPage() {
  const [projects, setProjects] = useState<BuilderProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/builders")
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function toggleActive(id: string, is_active: boolean) {
    const res = await fetch(`/api/builders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active }),
    });
    if (res.ok) {
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, is_active } : p)));
    }
  }

  async function toggleFeatured(id: string, is_featured: boolean) {
    const res = await fetch(`/api/builders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_featured }),
    });
    if (res.ok) {
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, is_featured } : p)));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this builder project?")) return;
    const res = await fetch(`/api/builders/${id}`, { method: "DELETE" });
    if (res.ok) setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-2xl md:text-3xl text-primary">Builder Projects</h1>
        <Link
          href="/admin/builders/new"
          className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all"
        >
          + New Project
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-on-surface-variant">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-12 text-center">
          <svg className="w-16 h-16 text-outline mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
          </svg>
          <h3 className="font-headline text-xl text-primary mb-2">No Builder Projects</h3>
          <p className="text-sm text-on-surface-variant mb-4">Create your first collaboration project for builders and investors.</p>
          <Link href="/admin/builders/new" className="text-primary font-label uppercase tracking-wider text-xs hover:underline">
            + Create Project
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-headline text-primary">{project.title}</h3>
                    {project.is_featured && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 uppercase tracking-wider font-label">Featured</span>
                    )}
                    {!project.is_active && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-red-50 text-red-700 uppercase tracking-wider font-label">Inactive</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                    <span>{project.investment_range}</span>
                    <span>{project.location}</span>
                    <span>{project.collaboration_type}</span>
                    <span>{new Date(project.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(project.id, !project.is_active)}
                    className={`text-xs px-3 py-1.5 rounded border ${project.is_active ? "border-green-200 text-green-700 bg-green-50" : "border-gray-200 text-gray-500 bg-gray-50"}`}
                  >
                    {project.is_active ? "Active" : "Inactive"}
                  </button>
                  <button
                    onClick={() => toggleFeatured(project.id, !project.is_featured)}
                    className={`text-xs px-3 py-1.5 rounded border ${project.is_featured ? "border-amber-200 text-amber-700 bg-amber-50" : "border-gray-200 text-gray-500 bg-gray-50"}`}
                  >
                    {project.is_featured ? "Featured" : "Not Featured"}
                  </button>
                  <Link
                    href={`/admin/builders/${project.id}`}
                    className="text-xs text-primary hover:underline px-2 py-1"
                  >
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(project.id)} className="text-xs text-error hover:underline px-2 py-1">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
