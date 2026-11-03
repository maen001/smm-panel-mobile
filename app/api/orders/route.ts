import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  try {
    // 1. Verify environment operational variables are mounted
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Configuration Error: Database credentials missing on host." },
        { status: 500 }
      );
    }

    // Instantiating high-privilege administrative client wrapper
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();
    
    const { targetLink, quantity, serviceType, transactionReference } = body;

    // 2. Validate property structures strictly
    if (!targetLink || !quantity || !transactionReference) {
      return NextResponse.json(
        { error: "Validation Failure: Omitted required tracking lines." },
        { status: 400 }
      );
    }

    // 3. Clean value types to map database restrictions safely
    const cleanQuantity = parseInt(quantity, 10);
    if (isNaN(cleanQuantity) || cleanQuantity <= 0) {
      return NextResponse.json(
        { error: "Validation Failure: Quantity value must be a valid positive integer." },
        { status: 400 }
      );
    }

    // Server-side fixed settlement math mapping (KSh 180 / 1000)
    const baseRatePerThousand = 180.00;
    const computedTotalPrice = (cleanQuantity / 1000) * baseRatePerThousand;

    // 4. Save directly into Supabase Orders Table
    const { data, error: dbError } = await supabase
      .from('orders')
      .insert([
        {
          target_link: targetLink,
          quantity: cleanQuantity,
          total_price: computedTotalPrice,
          transaction_reference: transactionReference,
          status: 'pending_payment'
        }
      ])
      .select();

    if (dbError) {
      return NextResponse.json(
        { error: `Database Reject: ${dbError.message}` },
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
