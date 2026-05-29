import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      user_name,
      email,
      phone,
      billing_address,
      shipping_address,
      vin,
      membership_type,
    } = body;

    // Validate required fields
    if (!user_name || !email || !phone || !billing_address || !shipping_address || !membership_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (membership_type !== 'basic' && membership_type !== 'premium') {
      return NextResponse.json(
        { error: 'Invalid membership type' },
        { status: 400 }
      );
    }

    const supabaseAdmin = createServiceClient();

    // Insert into database
    const { data, error } = await supabaseAdmin
      .from('membership_requests')
      .insert([
        {
          user_name,
          email,
          phone,
          billing_address,
          shipping_address,
          vin,
          membership_type,
          status: 'pending',
        },
      ])
      .select();

    if (error) {
      console.error('Error inserting membership request:', error);
      return NextResponse.json(
        { error: 'Failed to process membership request' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Membership request created successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
