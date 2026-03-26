"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-headline text-3xl text-primary mb-2">Admin Login</h1>
          <p className="text-sm text-on-surface-variant">Sign in to manage your properties</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-outline-variant/20 shadow-sm space-y-6">
          {error && (
            <div className="bg-error-container text-on-error-container text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-label text-on-surface-variant mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-outline-variant/30 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-label text-on-surface-variant mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-outline-variant/30 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
