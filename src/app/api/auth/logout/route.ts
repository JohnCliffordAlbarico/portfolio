import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (token) {
      await supabase.auth.signOut();
    }
    return NextResponse.json({ message: 'Logout successful' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}