// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }


    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error || !data.user) {
      return NextResponse.json({ error: error?.message || 'Invalid credentials' }, { status: 401 })
    }

    const user = data.user

    const { data: roleData, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (roleError && roleError.code !== 'PGRST116') {
      return NextResponse.json({ error: roleError.message }, { status: 500 })
    }

    if (!roleData) {
      const { error: insertError } = await supabaseAdmin
        .from('user_roles')
        .insert({ user_id: user.id, role: 'user' })

      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }
    }

    return NextResponse.json({
      message: 'Login successful',
      user,
      role: roleData?.role || 'user',
      session: data.session,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
