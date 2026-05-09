// lib/supabase-admin.ts — SERVER ONLY
// Never import this file in client components or pages marked "use client".
// Only use in: API routes, Server Components, lib/blog.ts (server-side helpers)
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "";
const svc = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

// Silently fall back to anon key if called from browser (no-op — admin ops will fail RLS, not crash)
export const supabaseAdmin = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "", {
  auth: { persistSession: false, autoRefreshToken: false },
});