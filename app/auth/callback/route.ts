import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '../../../lib/supabase';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') || '/admin';

  const supabase = await createServerSupabaseClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(new URL(`/auth/admin/login?error=${encodeURIComponent(error.message)}`, url.origin));
    }
    return NextResponse.redirect(new URL(next, url.origin));
  }
  
  return NextResponse.redirect(new URL('/auth/admin/login', url.origin));
}
