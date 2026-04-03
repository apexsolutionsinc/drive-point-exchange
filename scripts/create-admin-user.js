#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Admin User Creation Utility
 * 
 * This script helps create admin users for testing the password authentication.
 * Run this script to create admin users in your Supabase Auth system.
 * 
 * Usage:
 * 1. Set up your environment variables in .env.local
 * 2. Run: node scripts/create-admin-user.js
 * 3. Follow the prompts to create admin users
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nPlease check your .env.local file and try again.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser(email, password) {
  try {
    console.log(`\n🔄 Creating admin user: ${email}`);
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm the email
      user_metadata: {
        role: 'admin',
        created_by: 'admin-creation-script'
      }
    });

    if (error) {
      console.error(`❌ Error creating user: ${error.message}`);
      return false;
    }

    console.log(`✅ Admin user created successfully!`);
    console.log(`   User ID: ${data.user.id}`);
    console.log(`   Email: ${data.user.email}`);
    console.log(`   Confirmed: ${data.user.email_confirmed_at ? 'Yes' : 'No'}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Unexpected error: ${error.message}`);
    return false;
  }
}

async function listAdminUsers() {
  try {
    console.log('\n📋 Current admin users:');
    
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error(`❌ Error listing users: ${error.message}`);
      return;
    }

    const adminUsers = data.users.filter(user => 
      user.user_metadata?.role === 'admin' || 
      user.email?.includes('admin') ||
      user.email?.includes('@apexautosolutions.com')
    );

    if (adminUsers.length === 0) {
      console.log('   No admin users found.');
    } else {
      adminUsers.forEach(user => {
        console.log(`   - ${user.email} (ID: ${user.id})`);
        console.log(`     Created: ${new Date(user.created_at).toLocaleDateString()}`);
        console.log(`     Confirmed: ${user.email_confirmed_at ? 'Yes' : 'No'}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error(`❌ Unexpected error: ${error.message}`);
  }
}

async function main() {
  console.log('🔐 Apex Auto Solutions - Admin User Creation Utility');
  console.log('==================================================');
  
  // List existing admin users
  await listAdminUsers();
  
  // Get user input
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

  try {
    const email = await question('\n📧 Enter admin email address: ');
    
    if (!email || !email.includes('@')) {
      console.log('❌ Please enter a valid email address.');
      rl.close();
      return;
    }

    const password = await question('🔑 Enter password (min 6 characters): ');
    
    if (!password || password.length < 6) {
      console.log('❌ Password must be at least 6 characters long.');
      rl.close();
      return;
    }

    const confirmPassword = await question('🔑 Confirm password: ');
    
    if (password !== confirmPassword) {
      console.log('❌ Passwords do not match.');
      rl.close();
      return;
    }

    const success = await createAdminUser(email, password);
    
    if (success) {
      console.log('\n🎉 Admin user created successfully!');
      console.log('\n📝 Next steps:');
      console.log('   1. Go to /auth/admin/login');
      console.log('   2. Select "Password" authentication method');
      console.log('   3. Enter the email and password you just created');
      console.log('   4. You should be redirected to the admin dashboard');
    }

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  } finally {
    rl.close();
  }
}

// Handle command line arguments
if (process.argv.length > 2) {
  const command = process.argv[2];
  
  if (command === 'list') {
    listAdminUsers();
  } else if (command === 'create' && process.argv.length >= 5) {
    const email = process.argv[3];
    const password = process.argv[4];
    createAdminUser(email, password);
  } else {
    console.log('Usage:');
    console.log('  node scripts/create-admin-user.js           # Interactive mode');
    console.log('  node scripts/create-admin-user.js list     # List admin users');
    console.log('  node scripts/create-admin-user.js create <email> <password>');
  }
} else {
  main();
}
