import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize the secure connection to your Supabase instance using environment configuration keys
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { platform, service, quantity, targetLink, paymentRef, totalCost } = body;

    // Structural input validation rule
    if (!targetLink || !paymentRef || !quantity) {
      return NextResponse.json({ error: 'Missing critical link or transfer reference parameters.' }, { status: 400 });
    }

    // Insert payload parameters straight into your database order queue
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          target_link: targetLink,
          platform: platform,
          service_type: service,
          quantity: parseInt(quantity),
          total_price: parseFloat(totalCost),
          transaction_reference: paymentRef,
          status: 'pending_payment'
        }
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, order: data[0] }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
