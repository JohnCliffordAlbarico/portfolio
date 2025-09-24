import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// GET - Fetch all experience entries
export async function GET() {
  try {
    const { data: experience, error } = await supabaseAdmin
      .from('experience')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching experience:', error);
      return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
    }

    return NextResponse.json({ experience });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new experience entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, organization, period, description, type } = body;

    // Validate required fields
    if (!title || !organization || !period || !description || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: title, organization, period, description, type' },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = ['education', 'experience'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "education" or "experience"' },
        { status: 400 }
      );
    }

    const { data: experienceEntry, error } = await supabaseAdmin
      .from('experience')
      .insert([{ title, organization, period, description, type }])
      .select()
      .single();

    if (error) {
      console.error('Error creating experience:', error);
      return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
    }

    return NextResponse.json({ experience: experienceEntry }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update an existing experience entry
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, organization, period, description, type } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 });
    }

    // Validate type if provided
    const validTypes = ['education', 'experience'];
    if (type && !validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "education" or "experience"' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (organization !== undefined) updateData.organization = organization;
    if (period !== undefined) updateData.period = period;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    updateData.updated_at = new Date().toISOString();

    const { data: experienceEntry, error } = await supabaseAdmin
      .from('experience')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating experience:', error);
      return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
    }

    if (!experienceEntry) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    return NextResponse.json({ experience: experienceEntry });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete an experience entry
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Experience ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('experience')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting experience:', error);
      return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
