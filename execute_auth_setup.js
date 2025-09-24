const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Create Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupAuthentication() {
  try {
    console.log('Setting up authentication for cliffordalbarico20@gmail.com...');
    
    // First, let's create the user account with Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
      email: 'cliffordalbarico20@gmail.com',
      password: 'cliffordalbarico2025',
      email_confirm: true
    });

    if (signUpError && !signUpError.message.includes('already registered')) {
      console.error('Error creating user:', signUpError);
      return;
    }

    if (signUpData.user) {
      console.log('User created successfully:', signUpData.user.email);
    } else {
      console.log('User might already exist, proceeding with role assignment...');
    }

    // Now assign admin role
    const { data: userData, error: userError } = await supabase
      .from('auth.users')
      .select('id')
      .eq('email', 'cliffordalbarico20@gmail.com')
      .single();

    if (userError) {
      console.error('Error finding user:', userError);
      return;
    }

    // Insert or update user role
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .upsert({
        user_id: userData.id,
        role: 'admin'
      });

    if (roleError) {
      console.error('Error assigning admin role:', roleError);
      return;
    }

    console.log('✅ Authentication setup completed successfully!');
    console.log('Email: cliffordalbarico20@gmail.com');
    console.log('Password: cliffordalbarico2025');
    console.log('Role: admin');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the setup
setupAuthentication().then(() => {
  console.log('Setup process completed.');
  process.exit(0);
}).catch((error) => {
  console.error('Setup failed:', error);
  process.exit(1);
});
