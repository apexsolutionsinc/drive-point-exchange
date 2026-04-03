import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '../../../../lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data.user) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 400 });
    }

    // Check if user is admin (you might want to add admin role checking here)
    // For now, we'll assume any authenticated user can access admin
    
    return NextResponse.json({ 
      success: true, 
      user: {
        id: data.user.id,
        email: data.user.email,
      }
    });
  } catch (error) {
    console.error('Password signin error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
