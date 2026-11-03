import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize the secure high-privilege backend service client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  try {
    // 1. Verify environment initialization state
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Configuration Error: Database credentials missing on host." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();
    
    // Extract input fields matching your checkout screen state
    const { targetLink, quantity, serviceType, transactionReference } = body;

    // 2. Defensive baseline validation
    if (!targetLink || !quantity || !transactionReference) {
      return NextResponse.json(
        { error: "Validation Failure: Omitted required tracking lines." },
        { status: 400 }
      );
    }

    // 3. Server-side price estimation logic to prevent client manipulation (KSh 180 per 1000)
    const baseRatePerThousand = 180.00;
    const computedPrice = (Number(quantity) / 1000) * baseRatePerThousand;

    // 4. Submit directly to Supabase Storage Engine bypass
    const { data, error: dbError } = await supabase
      .from('orders')
      .insert([
        {
          target_link: targetLink,
          quantity: parseInt(quantity, 10),
          total_price: computedPrice,
          transaction_reference: transactionReference,
          status: 'pending_payment'
        }
      ])
      .select();

    if (dbError) {
      return NextResponse.json(
        { error: `Database Reject: ${dbError.message}`, hint: dbError.hint },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });

  } catch (globalCatch: any) {
    return NextResponse.json(
      { error: "Fatal transmission collapse handling server logic.", details: globalCatch?.message },
      { status: 500 }
    );
  }
}
