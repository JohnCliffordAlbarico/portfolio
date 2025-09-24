import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// GET - Fetch all projects
export async function GET() {
  try {
    const { data: projects, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, tech, status, progress, github, live, icon, statusIcon } = body;

    // Validate required fields
    if (!title || !description || !tech || !status || progress === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, tech, status, progress' },
        { status: 400 }
      );
    }

    // Validate progress is between 0 and 100
    if (progress < 0 || progress > 100) {
      return NextResponse.json(
        { error: 'Progress must be between 0 and 100' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['Completed', 'In Development', 'Planned'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Status must be one of: Completed, In Development, Planned' },
        { status: 400 }
      );
    }

    const { data: project, error } = await supabaseAdmin
      .from('projects')
      .insert([{
        title,
        description,
        tech: Array.isArray(tech) ? tech : [tech],
        status,
        progress,
        github: github || '#',
        live: live || '#',
        icon: icon || 'Globe',
        statusIcon: statusIcon || 'CheckCircle'
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update an existing project
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, tech, status, progress, github, live, icon, statusIcon } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Validate progress if provided
    if (progress !== undefined && (progress < 0 || progress > 100)) {
      return NextResponse.json(
        { error: 'Progress must be between 0 and 100' },
        { status: 400 }
      );
    }

    // Validate status if provided
    const validStatuses = ['Completed', 'In Development', 'Planned'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Status must be one of: Completed, In Development, Planned' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (tech !== undefined) updateData.tech = Array.isArray(tech) ? tech : [tech];
    if (status !== undefined) updateData.status = status;
    if (progress !== undefined) updateData.progress = progress;
    if (github !== undefined) updateData.github = github;
    if (live !== undefined) updateData.live = live;
    if (icon !== undefined) updateData.icon = icon;
    if (statusIcon !== undefined) updateData.statusIcon = statusIcon;
    updateData.updated_at = new Date().toISOString();

    const { data: project, error } = await supabaseAdmin
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete a project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
