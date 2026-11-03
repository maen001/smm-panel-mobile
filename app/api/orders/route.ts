import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Configuration Error: Database credentials missing on host." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();
    
    const { targetLink, quantity, serviceType, transactionReference } = body;

    // 🔍 SMART DEBUGGING LAYER: Pinpoint exactly what is missing
    const missingFields = [];
    if (!targetLink) missingFields.push("targetLink");
    if (!quantity) missingFields.push("quantity");
    if (!transactionReference) missingFields.push("transactionReference");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Validation Failure: Missing fields [${missingFields.join(", ")}]. Received keys: ${Object.keys(body).join(", ")}` },
        { status: 400 }
      );
    }

    const cleanQuantity = parseInt(quantity, 10);
    const baseRatePerThousand = 180.00;
    const computedTotalPrice = (cleanQuantity / 1000) * baseRatePerThousand;

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
      return NextResponse.json({ error: `Database Reject: ${dbError.message}` }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });

  } catch (globalCatch: any) {
    return NextResponse.json(
      { error: "Fatal transmission collapse handling server logic.", details: globalCatch?.message },
      { status: 500 }
    );
  }
}
