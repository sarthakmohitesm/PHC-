import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { AdminModel, verifyPassword } from '@/lib/models/Admin';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB and look up admin credentials from the database
    const db = await connectDB();
    if (db) {
      const admin = await AdminModel.findOne({ username });
      if (admin && verifyPassword(password, admin.passwordHash)) {
        return NextResponse.json({
          success: true,
          message: 'Admin authentication successful',
          token: 'phcl_admin_token_2026_verified',
          admin: {
            username: admin.username,
            role: admin.role
          }
        });
      }
    }

    return NextResponse.json(
      { success: false, message: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
