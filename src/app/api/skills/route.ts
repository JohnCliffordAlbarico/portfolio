import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// GET - Fetch all skills
export async function GET() {
  try {
    const { data: skills, error } = await supabaseAdmin
      .from('skills')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching skills:', error);
      return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
    }

    return NextResponse.json({ skills });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new skill
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, level, category, icon } = body;

    // Validate required fields
    if (!name || !level || !category || !icon) {
      return NextResponse.json(
        { error: 'Missing required fields: name, level, category, icon' },
        { status: 400 }
      );
    }

    // Validate level is between 0 and 100
    if (level < 0 || level > 100) {
      return NextResponse.json(
        { error: 'Level must be between 0 and 100' },
        { status: 400 }
      );
    }

    const { data: skill, error } = await supabaseAdmin
      .from('skills')
      .insert([{ name, level, category, icon }])
      .select()
      .single();

    if (error) {
      console.error('Error creating skill:', error);
      return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
    }

    return NextResponse.json({ skill }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update an existing skill
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, level, category, icon } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
    }

    // Validate level if provided
    if (level !== undefined && (level < 0 || level > 100)) {
      return NextResponse.json(
        { error: 'Level must be between 0 and 100' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (level !== undefined) updateData.level = level;
    if (category !== undefined) updateData.category = category;
    if (icon !== undefined) updateData.icon = icon;
    updateData.updated_at = new Date().toISOString();

    const { data: skill, error } = await supabaseAdmin
      .from('skills')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating skill:', error);
      return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
    }

    if (!skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json({ skill });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete a skill
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting skill:', error);
      return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
