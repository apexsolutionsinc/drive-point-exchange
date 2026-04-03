import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '../../../../lib/supabase';

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Load auto loan leads
    const { data: autoData, error: autoError } = await supabase
      .from('auto_loan_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (autoError) {
      console.error('Auto leads error:', autoError);
      return NextResponse.json({ error: 'Failed to load auto leads' }, { status: 500 });
    }

    // Load home loan leads
    const { data: homeData, error: homeError } = await supabase
      .from('home_loan_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (homeError) {
      console.error('Home leads error:', homeError);
      return NextResponse.json({ error: 'Failed to load home leads' }, { status: 500 });
    }

    // Load contact leads
    const { data: contactData, error: contactError } = await supabase
      .from('contact_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (contactError) {
      console.error('Contact leads error:', contactError);
      return NextResponse.json({ error: 'Failed to load contact leads' }, { status: 500 });
    }

    return NextResponse.json({
      autoLeads: autoData || [],
      homeLeads: homeData || [],
      contactLeads: contactData || []
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
