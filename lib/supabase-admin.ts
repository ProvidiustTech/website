// lib/supabase-admin.ts — SERVER ONLY
// Never import this file in client components or pages marked "use client".
// Only use in: API routes, Server Components, lib/blog.ts (server-side helpers)
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const svc = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_KEY ?? "";
let supabaseAdminClient: any = null;

function createSupabaseAdminClient() {
  if (!url || !svc) {
    throw new Error(
      "Missing Supabase configuration: SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY/SUPABASE_SERVICE_KEY are required"
    );
  }

  return createClient(url, svc, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getSupabaseAdmin() {
  if (!supabaseAdminClient) {
    supabaseAdminClient = createSupabaseAdminClient();
  }
  return supabaseAdminClient;
}