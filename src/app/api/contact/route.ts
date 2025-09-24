import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// GET - Fetch all contact information
export async function GET() {
  try {
    const { data: contact, error } = await supabaseAdmin
      .from('contact')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching contact:', error);
      return NextResponse.json({ error: 'Failed to fetch contact' }, { status: 500 });
    }

    return NextResponse.json({ contact });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new contact entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { icon, label, value, href, type } = body;

    // Validate required fields
    if (!icon || !label || !value || !href) {
      return NextResponse.json(
        { error: 'Missing required fields: icon, label, value, href' },
        { status: 400 }
      );
    }

    // Validate type if provided
    const validTypes = ['contact', 'social'];
    if (type && !validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "contact" or "social"' },
        { status: 400 }
      );
    }

    const { data: contactEntry, error } = await supabaseAdmin
      .from('contact')
      .insert([{ icon, label, value, href, type: type || 'contact' }])
      .select()
      .single();

    if (error) {
      console.error('Error creating contact:', error);
      return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
    }

    return NextResponse.json({ contact: contactEntry }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update an existing contact entry
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, icon, label, value, href, type } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });
    }

    // Validate type if provided
    const validTypes = ['contact', 'social'];
    if (type && !validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "contact" or "social"' },
        { status: 400 }
      );
    }

    const updateData: Partial<{
      icon: string;
      label: string;
      value: string;
      href: string;
      type: string;
      updated_at: string;
    }> = {};
    if (icon !== undefined) updateData.icon = icon;
    if (label !== undefined) updateData.label = label;
    if (value !== undefined) updateData.value = value;
    if (href !== undefined) updateData.href = href;
    if (type !== undefined) updateData.type = type;
    updateData.updated_at = new Date().toISOString();

    const { data: contactEntry, error } = await supabaseAdmin
      .from('contact')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating contact:', error);
      return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
    }

    if (!contactEntry) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ contact: contactEntry });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete a contact entry
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('contact')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting contact:', error);
      return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
