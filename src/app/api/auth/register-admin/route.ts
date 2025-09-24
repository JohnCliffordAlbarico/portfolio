import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// This endpoint should be used ONLY ONCE to create your admin account
// After creating your admin account, you should disable or remove this endpoint for security
export async function POST(request: NextRequest) {
  try {
    const { email, password, adminSecret } = await request.json();

    // Add a secret key to prevent unauthorized admin creation
    // You should set this in your environment variables
    const ADMIN_CREATION_SECRET = process.env.ADMIN_CREATION_SECRET || 'your-super-secret-admin-key';
    
    if (adminSecret !== ADMIN_CREATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized admin creation attempt' }, { status: 403 });
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Create user with Supabase Admin
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
    });

    if (authError || !authData.user) {
      return NextResponse.json({ error: authError?.message || 'Failed to create user' }, { status: 400 });
    }

    // Assign admin role
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: authData.user.id,
        role: 'admin'
      });

    if (roleError) {
      // If role assignment fails, we should clean up the created user
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json({ error: 'Failed to assign admin role' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Admin account created successfully',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        role: 'admin'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Admin registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Optional: Add a GET endpoint to check if any admin exists
export async function GET() {
  try {
    const { data: adminExists, error } = await supabaseAdmin
      .from('user_roles')
      .select('id')
      .eq('role', 'admin')
      .limit(1);

    if (error) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ 
      hasAdmin: adminExists && adminExists.length > 0,
      message: adminExists && adminExists.length > 0 
        ? 'Admin account already exists' 
        : 'No admin account found'
    });

  } catch (error) {
    console.error('Admin check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
